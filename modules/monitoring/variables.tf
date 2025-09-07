variable "resource_group_name" {
  description = "The name of our resource group"
  type        = string
}

variable "location" {
  description = "Where our resources will be located"
  type        = string
}
variable "workspace_id" {
  description = "Optional Log Analytics Workspace ID"
  type        = string
  default     = null
}
