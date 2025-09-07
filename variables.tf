variable "flask_image_name" {
  description = "Name for our Flask Docker image"
  default     = "flask-app"
  type        = string
}

variable "angular_image_name" {
  description = "Name for our Angular Docker image"
  default     = "angular-app"
  type        = string
}
