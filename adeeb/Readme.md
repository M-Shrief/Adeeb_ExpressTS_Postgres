# "Adeeb أديب"

**Overview**: Adeeb's concerned with Arabic literature. It assumes a business model in which it's a branch of a larger company. It enables you to order a specific piece of literature to be printed with especial colors and font. Then it'll be delivered to the customer, with the ability for the customer to follow up the process. And for special customers, it provides them with the ability to make bulk orders fast and easy. And if they’re willing to signup, they can review all of their past orders.

- Tech stack:

  - Built with **TypeScript**
  - **Nodejs** & **Express.js**
  - Database:
    - **Postgres** & **TypeORM**
    - Caching with **Redis**
  - **Docker** Containerization

- characteristics:

  - Regression tests with Vitest.
  - CI using Github actions testing
  - JWT Authentication & Authorization
  - Centralized Error Handling
  - Data Validation with Yup and express-validator
  - Documentation with TSdoc and TypeDoc.
  - Security best practices from OWASP
  - Communicate with gRPC server with Proto Buffers
  - …and more

## File Structure

- _./src_:

  - _app.ts_ is the main file for app logic, initializing middlewares and routes, and
    connecting to our MongoDB.

  - _index.ts_ is the server file to run the app.

  - _db.ts_ is the config file for PostgreSQL.

  - _redis.ts_ is the config file for redis.

  - _./config_ file to import all environment variables, and use a complex
    configuration structure if needed.

  - _./components_ file contain app's solutions by self contained components with

    - _entity_ file for TypeORM entities, representing app's data, using (\*.entity.ts) naming convention for each one.

    - _service_ file for communicating(read/write) to our database, and make
      operations on data if needed, then return the data for _./controllers_,
      using (\*.service.ts) naming convention for every module.

    - _controller_ file for coordinating HTTP request & responses, and set needed
      cookies and headers, using (\*.controller.ts) naming convention for every
      module.

    - _route_ file for establishing endpoints and controllers to every modules.
      Beside validating requests, and jwt authentication. Using (\*.route.ts)
      naming convention for every module.

    - _schema_ file for validation data for post and update methods by **Yup**.
      Using (\*.schema.ts) naming convention for every module.

  - _./interfaces_ file for types' declarations, using (\*.interface.ts) naming
    convention for every module, beside \_**\_types\_\_** for general types. Every interface has an Enum: **ERROR_MSG** for this interface error messages, and baseEntity for TypeORM.

  - _./middlewares_ file for containing reused middlewares, which are used across
    the app, using (\*.middleware.ts) naming convention for every module.

  - _./utils_ file for containing reused functions and centralized error handling, which are used across the app.

- _.env.example_ as example for ENVs.

- _tsconfig.json_ for TypeScript config

- _vitest.config.ts_ for Vitest config

- _Dockerfile_, _compose.yaml_, _.dockerignore_ for containerization
