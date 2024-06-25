import { Response } from 'express';
// Utils
import HttpStatusCode from './httpStatusCode';
import { logger } from './logger';

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
  

/**
 * check if error is instance of AppError && isOperational
 * @param error
 * @returns
 */
export const isTrustedError = (error: Error) => {
  if (error instanceof AppError) {
    return error.isOperational;
  }
  return false;
};

/**
 * Log error, and response = err.message with err.httpCode.
 * @param error
 * @param res
 */
export const handleTrustedError = (error: AppError, res: Response): void => {
  logger.error({
    errorCode: error.httpCode,
    message: error.message,
    isOperational: true,
    stack: error.stack,
  });
  res.status(error.httpCode).json({ message: error.message });
};