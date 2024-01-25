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
			Name:     req.GetName(),
			Phone:    req.GetPhone(),
			Password: hashedPassword,
		},
	)
	if err != nil {
		return nil, fmt.Errorf("couldn't create user, Error: %v", err)
	}

	userId := datasource.ToString(res.ID)
	user := &pb.User{
		Id:    userId,
		Name:  res.Name,
		Phone: res.Phone,
	}

	token, err := auth.CreateToken(
		time.Hour,
		user,
	)
	if err != nil {
		return nil, fmt.Errorf("couldn't create jwt token, Error: %v", err)
	}
	return &pb.SignupResponse{User: user, Token: token}, nil
}
