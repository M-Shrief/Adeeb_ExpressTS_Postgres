import HttpStatusCode from '../httpStatusCode';

/**
 * centralized error object that derives from Node’s Error
 *
 * @remarks
 * Example:
 * ```ts
 * throw new AppError(HttpStatusCode.BAD_REQUEST, err.msg, true);
 * ```
 */
export class AppError extends Error {
  public readonly httpCode: HttpStatusCode;
  public readonly isOperational: boolean;

  constructor(
    httpCode: HttpStatusCode,
    message: string,
    isOperational: boolean,
  ) {
    super(message);

    this.httpCode = httpCode;
    this.isOperational = isOperational || false;

    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
    Error.captureStackTrace(this);
  }
}
