package main

import (
	"context"
	"log"
	"net"
	"os"
	"users-service/internal/config"
	"users-service/internal/datasource"
	"users-service/internal/pb"
	"users-service/services"

	"google.golang.org/grpc"
)

func main() {
	conn, err := datasource.ConnectDB()
	if err != nil {
		log.Printf("Failed to connect to the database: %v", err)
		os.Exit(1)
	}
	log.Printf("connected to database")
	defer conn.Close(context.TODO())

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
