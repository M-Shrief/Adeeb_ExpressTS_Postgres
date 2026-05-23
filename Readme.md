# "Adeeb أديب"'s Backend
E-Commerce for printing Arabic Literature. Using SSR frontend with REST API, gRPC API and Protocol Buffers.

## Overview
- Tech stack:
    - Adeeb API:
        - **TypeScript** 
        - **Nodejs** and **Express.js** 
        - Database:
            - **Postgres** and **TypeORM**
            - Caching with ~~Redis~~ **ValKey**
        - **Docker** Containerization

    - Users-service API:
        - **Go**
        - Database:
            - Postgresql with Sqlc and Pgx
        - **Docker** Containerization

- Characteristics:
  - Regression tests with Vitest.
  - CI using Github actions testing
  - JWT Authentication & Authorization
  - Centralized Error Handling
  - Data Validation with Yup and express-validator
  - Documentation with TSdoc and TypeDoc.
  - Security best practices from OWASP
  - Secrets handling.
  - Using Proto Buffers
  - …and more

## File Structure

- _./github_ for Github actions.

- _./adeeb_ folder that encapsulate Adeeb API

- _./proto_ folder that contains our Proto Buffers

- _./users-service_ folder that contains Users-service API.

- _./compose.yaml_ file to build and start full aplication with docker-compose.

- _./Setup.md_ file to help to start the application.

- You can visit _./adeeb/Readme.md_ and _./users-servivce/Readme.md_ to read more about specific information about the project.
