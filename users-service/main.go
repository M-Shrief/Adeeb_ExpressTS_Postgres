package main

import (
	"context"
	"fmt"
	"log"
	"net"
	"os"
	"time"
	"users-service/config"
	"users-service/pb"

	"users-service/auth"

	"google.golang.org/grpc"
)

type server struct {
	pb.UnimplementedServicesServer
}

func (s *server) PingPong(ctx context.Context, req *pb.PingRequest) (*pb.PongResponse, error) {
	log.Println(req.GetMessage())
	return &pb.PongResponse{Message: "Pong"}, nil
}

func (s *server) Signup(ctx context.Context, req *pb.SignupRequest) (*pb.SignupResponse, error) {
	user := &pb.User{Id: "sadsad", Name: req.GetName(), Phone: req.GetPhone()}
	token, err := auth.CreateToken(
		time.Hour,
		user,
	)
	if err != nil {
		return nil, fmt.Errorf("Couldn't create jwt token, Error: %v", err)
	}
	return &pb.SignupResponse{User: user, Token: token}, nil
}

func main() {
	listener, err := net.Listen("tcp", config.PORT)
	if err != nil {
		log.Printf("Failed to start server: %v", err)
		os.Exit(1)
	}

	grpcServer := grpc.NewServer()

	pb.RegisterServicesServer(grpcServer, &server{})

	log.Printf("Server starter at: %v", listener.Addr())
	if err := grpcServer.Serve(listener); err != nil {
		log.Printf("Failed to start: %v", err)
		os.Exit(1)
	}
}
