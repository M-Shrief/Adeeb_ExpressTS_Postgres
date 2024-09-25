package services

import (
	"context"
	"fmt"
	"users-service/internal/auth"
	"users-service/internal/datasource"
	"users-service/internal/pb"

	"github.com/jackc/pgx/v5/pgtype"
)

func (s *Server) Delete(ctx context.Context, req *pb.DeleteRequest) (*pb.DeleteResponse, error) {
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
	uuid, err := datasource.StringToUUID(req.GetId())
	if err != nil {
		return nil, fmt.Errorf("can't parse UUID")
	}

	err = datasource.DB.DeleteUser(ctx, pgtype.UUID{Bytes: uuid, Valid: true})
	if err != nil {
		return nil, fmt.Errorf("users doesn't exist")
	}
	return &pb.DeleteResponse{}, nil
}
