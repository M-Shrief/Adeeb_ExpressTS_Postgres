package auth

import (
	"fmt"
	"log"
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

func ValidateToken(token string, onlyAuthorizedFor []string) error {
	publicKey, err := os.ReadFile(config.JWT_PUBLIC_FILE)
	if err != nil {
		return fmt.Errorf("couldn't read secret: %v", err)
	}

	key, err := jwt.ParseRSAPublicKeyFromPEM(publicKey)
	if err != nil {
		return fmt.Errorf("parse private key error: %v", err)
	}

	parsedToken, err := jwt.Parse(token, func(t *jwt.Token) (interface{}, error) {
		if _, ok := t.Method.(*jwt.SigningMethodRSA); !ok {
			return nil, fmt.Errorf("unexpected method: %s", t.Header["alg"])
		}
		return key, nil
	})

	if err != nil {
		return fmt.Errorf("parse error: %v", err)
	}

	claims, ok := parsedToken.Claims.(jwt.MapClaims)
	if !ok || !parsedToken.Valid {
		return fmt.Errorf("invalid token")
	} else if exp := claims["exp"].(float64); int64(exp) < time.Now().Unix() { // you can check claims type in claims.StandardClaims
		return fmt.Errorf("error: token expired")
	}

	// permissions in not interface{}, it's []interface{}. So we need get it, then loop on it and add it item by item.
	permissionsInterface := claims["permissions"].([]interface{})
	permissions := make([]string, len(permissionsInterface))
	for i, v := range permissionsInterface {
		permissions[i] = v.(string)
	}
	if len(onlyAuthorizedFor) > 0 {
		isAuthorized := isAuthorized(onlyAuthorizedFor, permissions)
		if !isAuthorized {
			log.Println("not authorized")
			return fmt.Errorf("not authorized")
		}
	}

	return nil
}
