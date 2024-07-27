package services

import (
	"context"
	"fmt"
	"time"
	"users-service/internal/auth"
	"users-service/internal/datasource"
	"users-service/internal/pb"
)

func (s *Server) Login(ctx context.Context, req *pb.LoginRequest) (*pb.LoginResponse, error) {
	existingUser, err := datasource.DB.GetUserByPhone(ctx, req.GetPhone())
	if err != nil {
		return nil, fmt.Errorf("user not found: %v", err)
	}

	err = auth.CompareHash(existingUser.Password, req.GetPassword())
	if err != nil {
		return nil, err
	}

	user := &pb.User{
		Id:    datasource.UUIDToString(existingUser.ID),
		Name:  existingUser.Name,
		Phone: existingUser.Phone,
	}

	token, err := auth.CreateJWT(
		time.Hour,
		user,
		auth.NewPermission(existingUser.SignedFor),
	)
	if err != nil {
		return nil, err
	}

	return &pb.LoginResponse{User: user, Token: token}, nil
}
