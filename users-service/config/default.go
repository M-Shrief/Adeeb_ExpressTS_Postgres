package config

import "os"

var (
	PORT             = os.Getenv("PORT")
	JWT_PRIVATE_FILE = os.Getenv("JWT_PRIVATE_FILE")
)
