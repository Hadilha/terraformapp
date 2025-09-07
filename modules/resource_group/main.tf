resource "azurerm_resource_group" "app_group" {
  name     = var.resource_group_name
  location = var.location
}
  