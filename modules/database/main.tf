resource "random_string" "unique_suffix" {
  length  = 8
  special = false
  upper   = false
}

resource "random_password" "sql_password" {
  length  = 16
  special = true
}

# SQL Server
resource "azurerm_mssql_server" "sql_server" {
  name                         = "my-sql-server-${random_string.unique_suffix.result}"
  resource_group_name          = var.resource_group_name
  location                     = var.location
  version                      = "12.0"
  administrator_login          = "sqladmin"
  administrator_login_password = random_password.sql_password.result
}

resource "azurerm_mssql_database" "app_db" {
  name      = "myappdb"
  server_id = azurerm_mssql_server.sql_server.id
  sku_name  = "S0"
}

resource "azurerm_mssql_firewall_rule" "allow_azure" {
  name             = "AllowAzureServices"
  server_id        = azurerm_mssql_server.sql_server.id
  start_ip_address = "0.0.0.0"
  end_ip_address   = "0.0.0.0"
}
