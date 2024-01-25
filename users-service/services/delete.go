package services

import (
	"context"
	"fmt"
	"users-service/datasource"
	"users-service/pb"

	"github.com/jackc/pgx/v5/pgtype"
)

func (s *Server) Delete(ctx context.Context, req *pb.DeleteRequest) (*pb.DeleteResponse, error) {
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
