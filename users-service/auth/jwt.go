package auth

import (
	"fmt"
	"os"
	"time"
	"users-service/config"
	"users-service/datasource"
	"users-service/pb"

	"github.com/golang-jwt/jwt"
)

func CreateJWT(ttl time.Duration, user *pb.User, permissions []string) (string, error) {
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
	claims["user"] = user               // Our custom data.
	claims["exp"] = now.Add(ttl).Unix() // The expiration time after which the token must be disregarded.
	claims["iat"] = now.Unix()          // The time at which the token was issued.
	claims["permissions"] = permissions
	token, err := jwt.NewWithClaims(jwt.SigningMethodRS256, claims).SignedString(key)
	if err != nil {
		return "", fmt.Errorf("create token error: %w", err)
	}

	return token, nil
}

func NewPermission(signedFor []datasource.SignedFor) []string {
	var permission []string
	for _, service := range signedFor {
		switch service {
		case datasource.SignedForManagement:
			permission = append(permission, fmt.Sprintf("%v:read", datasource.SignedForManagement), fmt.Sprintf("%v:write", datasource.SignedForManagement))
		case datasource.SignedForDBA:
			permission = append(permission, fmt.Sprintf("%v:read", datasource.SignedForDBA), fmt.Sprintf("%v:write", datasource.SignedForDBA))
		case datasource.SignedForAnalytics:
			permission = append(permission, fmt.Sprintf("%v:read", datasource.SignedForAnalytics), fmt.Sprintf("%v:write", datasource.SignedForAnalytics))
		case datasource.SignedForAdeeb:
			permission = append(permission, fmt.Sprintf("%v:read", datasource.SignedForAdeeb), fmt.Sprintf("%v:write", datasource.SignedForAdeeb))
		default:
			return []string{}
		}
	}
	return permission
}
