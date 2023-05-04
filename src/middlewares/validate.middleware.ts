import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationChain } from 'express-validator';
// can be reused by many routes

// sequential processing, stops running validations chain if the previous one fails.
const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    for (let validation of validations) {
      const result = await validation.run(req);
      if (result.array().length) break;
    }

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    res.status(400).send(`Bad Request`);
  };
};

export default validate;
