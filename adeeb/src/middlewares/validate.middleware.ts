import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationChain } from 'express-validator';
import { AppError } from '../utils/errorsCenter/appError';
import HttpStatusCode from '../utils/httpStatusCode';

/**
 * Use express-validate to validate requests' body, headers or params.
 * @param {ValidationChain[]} validations - an array of validation chains
 * @remarks
 * sequential processing, stops running validations chain if the previous one fails.&
 * 
 * if valid, go to next middleware or controller.
 * 
 * if not valid, throw operational error,with error message and {@link HttpStatusCode.BAD_REQUEST}.
 */
export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    for (const validation of validations) {
      const result = await validation.run(req);
      if (result.array().length) break;
    }

    const errors = validationResult(req);
    if (errors.isEmpty()) return next();

    try {
      errors.array().forEach((err) => {
        throw new AppError(HttpStatusCode.BAD_REQUEST, err.msg, true);
      });
    } catch (errors) {
      next(errors);
    }
  };
};
