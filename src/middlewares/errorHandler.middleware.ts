import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errorHandler';
import { logger } from '../utils/logger';
import {
  handleTrustedError,
  isTrustedError,
} from '../utils/errorsCenter/errorHandlers';

export const errorMiddleware = async (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!isTrustedError(err)) process.exit(1);
  handleTrustedError(err, res);
};
