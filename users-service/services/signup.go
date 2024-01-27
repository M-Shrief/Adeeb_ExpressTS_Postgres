package services

import (
	"context"
	"fmt"
	"time"
	"users-service/auth"
	"users-service/datasource"
	"users-service/pb"
)

func (s *Server) Signup(ctx context.Context, req *pb.SignupRequest) (*pb.SignupResponse, error) {
	hashedPassword, err := auth.Hash(req.GetPassword())
	if err != nil {
		return nil, err
	}

	res, err := datasource.DB.CreateUser(
		ctx,
		datasource.CreateUserParams{
			Name:      req.GetName(),
			Phone:     req.GetPhone(),
			Password:  hashedPassword,
			SignedFor: []datasource.SignedFor{datasource.SignedFor(req.GetSignedFor())},
		},
	)
	if err != nil {
		return nil, fmt.Errorf("couldn't create user, Error: %v", err)
	}

	userId := datasource.UUIDToString(res.ID)
	user := &pb.User{
		Id:    userId,
		Name:  res.Name,
		Phone: res.Phone,
	}

	token, err := auth.CreateToken(
		time.Hour,
		user,
		auth.NewPermission(res.SignedFor),
	)
	if err != nil {
		return nil, fmt.Errorf("couldn't create jwt token, Error: %v", err)
	}
	return &pb.SignupResponse{User: user, Token: token}, nil
}
