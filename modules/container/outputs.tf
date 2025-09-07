output "angular_app_hostname" {
  value = azurerm_linux_web_app.angular_app.default_hostname
}

output "flask_app_hostname" {
  value = azurerm_linux_web_app.flask_app.default_hostname
}

output "acr_login_server" {
  value = azurerm_container_registry.app_registry.login_server
}

output "acr_username" {
  value = azurerm_container_registry.app_registry.admin_username
}

output "acr_password" {
  value     = azurerm_container_registry.app_registry.admin_password
  sensitive = true
}
