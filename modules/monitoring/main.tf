resource "azurerm_application_insights" "app_insights" {
  name                = "my-app-insights"
  location            = var.location
  resource_group_name = var.resource_group_name
  application_type    = "web"
  workspace_id        = var.workspace_id  # pass the workspace ID if needed
}

resource "random_string" "suffix" {
  length  = 4
  upper   = false
  special = false
}
