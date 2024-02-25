import { Request, Response, NextFunction } from 'express';
import { expressjwt } from 'express-jwt';
import guardFactory from 'express-jwt-permissions';
// Config
import { JWT_PUBLIC } from '../config';
// Utils
import HttpStatusCode from '../utils/httpStatusCode';
import { AppError } from '../utils/errorsCenter/appError';

/**
 * Used to validate requests jwtToken
 * @param {boolean} bln -  set true to prevent unauthenticated users, set false to identify registered users while still providing access to unregistered users.
 * @returns 
 */
export const jwtToken = (bln?: boolean) =>
  expressjwt({
    secret: JWT_PUBLIC as string,
    algorithms: ['RS256'],
    credentialsRequired: bln ?? false, // 
    requestProperty: 'user', // made it user for guard, it's req.auth by default
  });

/**
 * Check JWT Payload for permissions: string[]
 * 
 * @remarks
 * example
 * ```ts
 * router.put('/partner/me',guard.check(['adeeb:read', 'adeeb:write']))
 * ```
 */
export const guard = guardFactory();

/**
 * Handle Authentication guards errors
 */
export const authErrorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (error.name == 'UnauthorizedError')
      throw new AppError(
        HttpStatusCode.UNAUTHORIZED,
        'Unautorized for this request',
        true,
      );
    if (error.name === 'permission_denied') {
      throw new AppError(HttpStatusCode.FORBIDDEN, 'Forbidden request', true);
    }
  } catch (err) {
    next(err);
  }
};

// import { NextFunction, Request, Response } from 'express';
// import jwt, { Secret } from 'jsonwebtoken';

// export const authorizeJWT = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const authHeader = req.header('Authorization');

//   if (authHeader) {
//     const token = authHeader.split(' ')[1];

//     if (token == undefined) return res.status(401).send('Unauthorized Request');

//     jwt.verify(
//       token,
//       process.env.JWT_PRIVATE as Secret,
//       (err: any, user: any) => {
//         if (err) {
//           return res.status(403).send('Unauthorized Request');
//         }
//         // TODO: Figure types
//         req.user = user;
//         next();
//       }
//     );
//   }
// };
