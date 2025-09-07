resource "random_string" "suffix" {
  length  = 4
  upper   = false
  special = false
}

resource "azurerm_container_registry" "app_registry" {
  name                = "appregistry${random_string.suffix.result}"  # remove hyphen
  resource_group_name = var.resource_group_name
  location            = var.location
  sku                 = "Basic"
  admin_enabled       = true
}

resource "azurerm_service_plan" "app_plan" {
  name                = "appserviceplan-${random_string.suffix.result}"
  location            = var.location
  resource_group_name = var.resource_group_name
  os_type             = "Linux"
  sku_name            = "B1"
}

# Angular App
resource "azurerm_linux_web_app" "angular_app" {
  name                = "${var.angular_image_name}-${random_string.suffix.result}"
  location            = var.location
  resource_group_name = var.resource_group_name
  service_plan_id     = azurerm_service_plan.app_plan.id

  site_config {
    always_on = true
    application_stack {
      docker_image_name   = "${var.angular_image_name}:latest"
      docker_registry_url = "https://${azurerm_container_registry.app_registry.login_server}"
    }
  }

  app_settings = {
    "DOCKER_REGISTRY_SERVER_URL"      = "https://${azurerm_container_registry.app_registry.login_server}"
    "DOCKER_REGISTRY_SERVER_USERNAME" = azurerm_container_registry.app_registry.admin_username
    "DOCKER_REGISTRY_SERVER_PASSWORD" = azurerm_container_registry.app_registry.admin_password
    "WEBSITES_PORT"                   = "80"
    "APPINSIGHTS_INSTRUMENTATIONKEY"  = var.app_insights_key
  }
}

# Flask App
resource "azurerm_linux_web_app" "flask_app" {
  name                = "${var.flask_image_name}-${random_string.suffix.result}"
  location            = var.location
  resource_group_name = var.resource_group_name
  service_plan_id     = azurerm_service_plan.app_plan.id

  site_config {
    always_on = true
    application_stack {
      docker_image_name   = "${var.flask_image_name}:latest"
      docker_registry_url = "https://${azurerm_container_registry.app_registry.login_server}"
    }
  }

  app_settings = {
    "DOCKER_REGISTRY_SERVER_URL"      = "https://${azurerm_container_registry.app_registry.login_server}"
    "DOCKER_REGISTRY_SERVER_USERNAME" = azurerm_container_registry.app_registry.admin_username
    "DOCKER_REGISTRY_SERVER_PASSWORD" = azurerm_container_registry.app_registry.admin_password
    "WEBSITES_PORT"                   = "5000"
    "APPINSIGHTS_INSTRUMENTATIONKEY"  = var.app_insights_key
  }
}
