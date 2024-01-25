package services

import (
	"context"
	"log"
	"users-service/pb"
)

func (s *Server) PingPong(ctx context.Context, req *pb.PingRequest) (*pb.PongResponse, error) {
	log.Println(req.GetMessage())
	return &pb.PongResponse{Message: "Pong"}, nil
}
