output "connection_string" {
  value     = "Server=tcp:${azurerm_mssql_server.sql_server.fully_qualified_domain_name},1433;Initial Catalog=${azurerm_mssql_database.app_db.name};Persist Security Info=False;User ID=${azurerm_mssql_server.sql_server.administrator_login};Password=${random_password.sql_password.result};MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;"
  sensitive = true
}
