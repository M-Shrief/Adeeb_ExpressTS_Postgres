package services

import (
	"context"
	"errors"
	"fmt"
	"time"
	"users-service/internal/auth"
	"users-service/internal/datasource"
	"users-service/internal/pb"

	validation "github.com/go-ozzo/ozzo-validation/v4"
	"github.com/jackc/pgerrcode"
	"github.com/jackc/pgx/v5/pgconn"
)

func (s *Server) Signup(ctx context.Context, req *pb.SignupRequest) (*pb.SignupResponse, error) {

	// Validate req fields:
	err := validateSignupReq(req)
	if err != nil {
		return nil, err
	}

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
		return nil, fmt.Errorf("couldn't sign up for a new service")
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

func validateSignupReq(req *pb.SignupRequest) error {
	// Validate req fields:
	return validation.ValidateStruct(req, // already a pointer
		// Street cannot be empty, and the length must between 5 and 50
		validation.Field(&req.Name, validation.Required, validation.Length(5, 50)),
		// City cannot be empty, and the length must between 5 and 50
		validation.Field(&req.Phone, validation.Required, validation.Length(5, 50)),
		// State cannot be empty, and must be a string consisting of two letters in upper case
		validation.Field(&req.Password, validation.Required, validation.Length(5, 100)),
		// State cannot be empty, and must be a string consisting of five digits
		validation.Field(&req.SignedFor, validation.Required, validation.In(
			string(datasource.SignedForAdeeb),
			string(datasource.SignedForManagement),
			string(datasource.SignedForDBA),
			string(datasource.SignedForAnalytics),
		)),
	)
}
