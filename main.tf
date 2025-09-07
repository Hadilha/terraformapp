terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.110.0"
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 3.0"
    }
  }
}

provider "azurerm" {
  features {}
}

locals {
  resource_group_name = "res-grp"
  location            = "North Europe"
}

# Resource Group
module "resource_group" {
  source              = "./modules/resource_group"
  resource_group_name = local.resource_group_name
  location            = local.location
}

# Monitoring
module "monitoring" {
  source              = "./modules/monitoring"
  resource_group_name = module.resource_group.resource_group_name
  location            = module.resource_group.location
  depends_on          = [module.resource_group]
}

# Database
module "database" {
  source              = "./modules/database"
  resource_group_name = module.resource_group.resource_group_name
  location            = module.resource_group.location
  depends_on          = [module.resource_group]
}

# Container (Angular + Flask)
module "container" {
  source              = "./modules/container"
  resource_group_name = module.resource_group.resource_group_name
  location            = module.resource_group.location
  flask_image_name    = var.flask_image_name
  angular_image_name  = var.angular_image_name
  app_insights_key    = module.monitoring.app_insights_instrumentation_key
  depends_on          = [module.resource_group, module.monitoring]
}

output "angular_web_app_url" {
  value = "https://${module.container.angular_app_hostname}"
}

output "flask_web_app_url" {
  value = "https://${module.container.flask_app_hostname}"
}

output "sql_connection_string" {
  value     = module.database.connection_string
  sensitive = true
}

output "acr_login_server" {
  value = module.container.acr_login_server
}

output "acr_username" {
  value = module.container.acr_username
}

output "acr_password" {
  value     = module.container.acr_password
  sensitive = true
}
