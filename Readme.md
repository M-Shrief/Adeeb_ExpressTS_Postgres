# REST API for "Adeeb أديب", using Express with TypeScript

**Overview, and file structure**:

- _app_ is the main file for app logic, initializing middlewares and routes, and
  connecting to our Postgres Database using TypeORM.

- _index_ is the server file to run the app.

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
  convention for every module, beside \_**\_types\_\_** for general types. Every interface has an Enum: **ERROR_MSG** for this interface error messages.

- _./schemas_ file for shared Yup schemas

- _./middlewares_ file for containing reused middlewares, which are used across
  the app, using (\*.middleware.ts) naming convention for every module.

- _./utils_ file for containing reused functions and centralized error handling, which are used across the app.

### Used Middlewares

- **Helmet**, for security
- **Cors**
- **Cookie-Parser**
- **Compression**
- **Morgan & winston** for Logging
- **Express-rate-limit**, to limit api requests.
- **Express-validator**, to validate requests' body, params,...etc.
- Basic hand-made middleware for **Caching**.
- **jsonwebtoken, Express-jwt & Express-jwt-permissions**, for authentication,
  guarding routes.

### Currently working on:

- Dealing with cookies and authentication better
- Imporve routes' guards
