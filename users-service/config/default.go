package config

import "os"

// General
var (
	PORT = os.Getenv("PORT")
)

// Database
var (
	DB_HOST     = os.Getenv("DB_HOST")
	DB_PORT     = os.Getenv("DB_PORT")
	DB_USER     = os.Getenv("DB_USER")
	DB_NAME     = os.Getenv("DB_NAME")
	DB_PASSWORD = os.Getenv("DB_PASSWORD")
)

// Secretes
var (
	JWT_PRIVATE_FILE = os.Getenv("JWT_PRIVATE_FILE")
)
