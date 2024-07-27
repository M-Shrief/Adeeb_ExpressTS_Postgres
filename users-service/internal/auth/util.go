package auth

import (
	"context"

	"golang.org/x/exp/slices"
	"google.golang.org/grpc/metadata"
)

// Extract JWT Authentication and Authorization Token from metadata
func GetAuthToken(ctx context.Context) string {
	var token string
	md, ok := metadata.FromIncomingContext(ctx)
	if !ok {
		return ""
	}
	values := md.Get("Authorization")
	if len(values) > 0 {
		token = values[0]
	}
	// token sliced, so that we remove 'Bearer '
	return token[7:]
}

func isAuthorized(onlyAuthorizedFor, permissions []string) bool {
	var isAuthorized bool
	for _, permission := range permissions {
		isAuthorized = slices.Contains(onlyAuthorizedFor, permission) || false
	}
	return isAuthorized
}
