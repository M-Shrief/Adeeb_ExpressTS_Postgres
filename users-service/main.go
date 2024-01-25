package main

import (
	"log"
	"net"
	"os"
	"users-service/config"
	"users-service/pb"
	"users-service/services"

	"google.golang.org/grpc"
)

func main() {

	listener, err := net.Listen("tcp", config.PORT)
	if err != nil {
		log.Printf("Failed to start server: %v", err)
		os.Exit(1)
	}

	grpcServer := grpc.NewServer()

	pb.RegisterServicesServer(grpcServer, &services.Server{})

	log.Printf("Server starter at: %v", listener.Addr())
	if err := grpcServer.Serve(listener); err != nil {
		log.Printf("Failed to start: %v", err)
		os.Exit(1)
	}
}
