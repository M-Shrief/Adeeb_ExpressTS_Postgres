# REST API for "Adeeb أديب", using Express with TypeScript

**Overview**: Adeeb's concerned with Arabic literature. It assumes a business model in which it's a branch of a larger company. It enables you to order a specific piece of literature to be printed with especial colors and font. Then it'll be delivered to the customer, with the ability for the customer to follow up the process. And for special customers, it provides them with the ability to make bulk orders fast and easy. And if they’re willing to signup, they can review all of their past orders.

Adeeb is a RESTful API, which communicates with Users-service gRPC API to handle Users Authentication and Authorization. Communication is based on Proto Buffers.

- Tech stack:

    - Adeeb API:
        - Built with **TypeScript** 
        - **Nodejs** and **Express.js** 
        - Database:
            - **Postgres** and **TypeORM**
            - Caching with **Redis**
        - **Docker** Containerization

    - Users-service API:
        - Built with **Go**
        - Database:
            - Postgresql with Sqlc and Pgx
        - **Docker** Containerization

- Characteristics:

  - Regression tests with Vitest.
  - CI using Github actions testing
  - JWT Authentication & Authorization
  - Centralized Error Handling
  - Data Validation with Yup and express-validator
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


## Roadmap

After building the project, Adeeb's team got some notes that they should use the pre-existing Users service, rather than duplicating the service with their partner functionality.

The service is built with Go and it exposes a gRPC server, which is used for:
- Managing and Keeping track of all users which uses our company services, noting which service did the user have sign for (becuase signing for one service doesn't mean they want to sign to all services)
- JWT Authentication and Authorization

We need to refactor partner component to:
- remove partner's entity from Adeeb's database. (as long as the order uses the jwt token, it doesn't need to confirm that the user id exist in our database.)
- use gRPC to make signups, logins and delete accounts from Users service.
- give Adeeb backend access to JWT public key only.
- ...and more.

You'll find the ongoing work in ***partner-grpc*** branch