package config

import "os"

// General
var (
	PORT = os.Getenv("PORT")
)

// Secretes
var (
	JWT_PRIVATE_FILE = os.Getenv("JWT_PRIVATE_FILE")
)
