import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationChain } from 'express-validator';
// can be reused by many routes

// sequential processing, stops running validations chain if the previous one fails.
const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    for (let validation of validations) {
      const result = await validation.run(req);
      if (result.errors.length) break;
    }

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(400).json({ errors: errors.array() });
  };
};

// used with route:
// validate([
//   body("user_name").notEmpty().isLength({ min: this.mongoIdLength }), // min = object_id for mongoDB
//   body("user_phone")
//     .optional()
//     .notEmpty()
//     .isLength({ min: this.mongoIdLength }), // min = object_id for mongoDB
//   body("products.*").optional().notEmpty().escape(),
//   body("paymentMethod").isLength({ min: 4 }), // for "CASH" || "CARD"
// ]),

export default validate;
