package auth

import (
	"fmt"
	"os"
	"time"
	"users-service/config"

	"github.com/golang-jwt/jwt"
)

func CreateToken(ttl time.Duration, content interface{}, permissions []string) (string, error) {
	privateKey, err := os.ReadFile(config.JWT_PRIVATE_FILE)
	if err != nil {
		return "", fmt.Errorf("couldn't read secret: %v", err)
	}

	key, err := jwt.ParseRSAPrivateKeyFromPEM(privateKey)
	if err != nil {
		return "", fmt.Errorf("parse private key error: %w", err)
	}

	now := time.Now().UTC()

	claims := make(jwt.MapClaims)
	claims["user"] = content            // Our custom data.
	claims["exp"] = now.Add(ttl).Unix() // The expiration time after which the token must be disregarded.
	claims["iat"] = now.Unix()          // The time at which the token was issued.
	claims["permissions"] = permissions
	token, err := jwt.NewWithClaims(jwt.SigningMethodRS256, claims).SignedString(key)
	if err != nil {
		return "", fmt.Errorf("create token error: %w", err)
	}

	return token, nil
}

func NewPermission(signedFor string) []string {
	switch signedFor {
	case "adeeb":
		return []string{"partner:read", "partner:write"}
	default:
		return []string{"user:read"}
	}
}
