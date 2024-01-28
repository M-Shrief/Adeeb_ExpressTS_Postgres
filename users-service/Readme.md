# Users gRPC Service

## Overview
After building the project, Adeeb's team got some notes that they should use the pre-existing Users service, rather than duplicating the service with their partner functionality.

The service is built with Go and it exposes a gRPC server, which is used for:
- Managing and Keeping track of all users which uses our company services, noting which service did the user have sign for (becuase signing for one service doesn't mean they want to sign to all services)
- JWT Authentication and Authorization

- Tech Stacks:

    - Built with **Go**
    - Database:
        - Postgres with Sqlc and Pgx

- Characteristics:

    - JWT Authentication & Authorization

## File Structure

- _./auth_ package for JWT Authentication and Authorization functionality

- _./config_ package to handle service's ENVs and secrets.

- _./datasource_ package to handle database functionality.

- _./services_ package to implement gRPC services server.

- _./Dockerfile_ file to build and containerize the application.

- _./sqlc.yaml_ file for Sqlc configs.