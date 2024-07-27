package services

import (
	"context"
	"fmt"
	"users-service/internal/auth"
	"users-service/internal/datasource"
	"users-service/internal/pb"

	validation "github.com/go-ozzo/ozzo-validation/v4"
	"github.com/jackc/pgx/v5/pgtype"
)

// It uses this SQL trick:
// https://medium.com/developer-rants/conditional-update-in-postgresql-a27ddb5dd35

func (s *Server) Update(ctx context.Context, req *pb.UpdateRequest) (*pb.UpdateResponse, error) {
	token := auth.GetAuthToken(ctx)
	err := auth.ValidateToken(
		token,
		[]string{
			fmt.Sprintf("%v:write", datasource.SignedForAdeeb),
			fmt.Sprintf("%v:write", datasource.SignedForDBA),
			fmt.Sprintf("%v:write", datasource.SignedForManagement),
		},
	)
	if err != nil {
		return nil, err
	}

	// Validate req fields:
	err = validateUpdateReq(req)
	if err != nil {
		return nil, err
	}

	uuid, err := datasource.StringToUUID(req.GetId())
	if err != nil {
		return nil, fmt.Errorf("not a valid uuid")
	}

	var name, phone, password string
	if req.GetName() != "" {
		name = req.GetName()
	}
	if req.GetPhone() != "" {
		phone = req.GetPhone()
	}
	if req.GetPassword() != "" {
		password, err = auth.Hash(req.GetPassword())
		if err != nil {
			return nil, fmt.Errorf("couldn't hash password, error: %v", err)
		}
	}
	err = datasource.DB.UpdateUser(
		ctx,
		datasource.UpdateUserParams{
			ID:      pgtype.UUID{Bytes: uuid, Valid: true},
			Column2: name,     // name
			Column3: phone,    // phone
			Column4: password, // password
		},
	)
	if err != nil {
		return nil, fmt.Errorf("couldn't update user, error: %v", err)
	}

	return &pb.UpdateResponse{}, nil
}

func validateUpdateReq(req *pb.UpdateRequest) error {
	// Validate req fields:
	return validation.ValidateStruct(req, // already a pointer
		validation.Field(&req.Name, validation.Length(5, 50)),
		validation.Field(&req.Phone, validation.Length(5, 50)),
		validation.Field(&req.Password, validation.Length(5, 100)),
	)
}
