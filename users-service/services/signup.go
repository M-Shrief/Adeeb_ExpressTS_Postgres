package services

import (
	"context"
	"errors"
	"fmt"
	"time"
	"users-service/auth"
	"users-service/datasource"
	"users-service/pb"

	"github.com/jackc/pgerrcode"
	"github.com/jackc/pgx/v5/pgconn"
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
		var pgErr *pgconn.PgError
		isPgError := errors.As(err, &pgErr)
		if isPgError && pgErr.Code == pgerrcode.UniqueViolation {
			return newServiceSignedFor(ctx, req.GetPhone(), req.GetPassword(), req.GetSignedFor())
		}
		return nil, fmt.Errorf("signup error, please try again later")
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

func newServiceSignedFor(ctx context.Context, phone, password string, newService string) (*pb.SignupResponse, error) {
	// Not handling err, because we use it after having Phone unique violation error
	existingUser, _ := datasource.DB.GetUserByPhone(ctx, phone)

	// compare existing user password
	err := auth.CompareHash(existingUser.Password, password)
	if err != nil {
		return nil, fmt.Errorf("wrong password, not authorized to sign up to a new service")
	}

	user, err := datasource.DB.NewServiceSignedFor(
		ctx,
		datasource.NewServiceSignedForParams{
			Phone:   phone,
			Column2: datasource.SignedFor(newService),
		},
	)
	if err != nil {
		return nil, fmt.Errorf("couldn't ")
	}

	userId := datasource.UUIDToString(user.ID)
	pbUser := &pb.User{
		Id:    userId,
		Name:  user.Name,
		Phone: user.Phone,
	}

	token, err := auth.CreateJWT(
		time.Hour,
		pbUser,
		auth.NewPermission(user.SignedFor),
	)
	if err != nil {
		return nil, fmt.Errorf("couldn't create jwt token, Error: %v", err)
	}
	return &pb.SignupResponse{User: pbUser, Token: token}, nil
}
