package services

import (
	"context"
	"fmt"
	"time"
	"users-service/auth"
	"users-service/datasource"
	"users-service/pb"
)

// Make a request first to know if the user already exists,
// but wants to signup for other service,
// if yes, add it to signed_for[] field
// else create a new service
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

	token, err := auth.CreateJWT(
		time.Hour,
		user,
		auth.NewPermission(res.SignedFor),
	)
	if err != nil {
		return nil, fmt.Errorf("couldn't create jwt token, Error: %v", err)
	}
	return &pb.SignupResponse{User: user, Token: token}, nil
}

// func getUserByPhone(ctx context.Context, phone string) (*datasource.GetUserByPhoneRow, error) {
// 	existingUser, err := datasource.DB.GetUserByPhone(ctx, phone)
// 	if err != nil {
// 		return nil, fmt.Errorf("user Doesn't exist")
// 	}
// 	return &existingUser, nil
// }

// func newServiceSignedFor(ctx context.Context, phone string, newService string) error {
// 	err := datasource.DB.NewServiceSignedFor(
// 		ctx,
// 		datasource.NewServiceSignedForParams{
// 			Phone:       phone,
// 			ArrayAppend: datasource.SignedFor(newService),
// 		},
// 	)
// 	if err != nil {
// 		return fmt.Errorf("couldn't ")
// 	}
// 	return nil
// }
