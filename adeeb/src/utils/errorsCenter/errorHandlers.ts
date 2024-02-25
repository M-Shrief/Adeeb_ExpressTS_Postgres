import { Response } from 'express';
// Utils
import { AppError } from './appError';
import { logger } from '../logger';

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
  res
    .status(error.httpCode)
    .json({ message: error.message });
};
