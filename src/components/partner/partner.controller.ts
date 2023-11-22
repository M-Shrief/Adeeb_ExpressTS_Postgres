import { NextFunction, Request, Response } from 'express';
// Services
import { PartnerService } from './partner.service';
// Types
import { ERROR_MSG } from './partner.entity';
// Utils
import { decodeToken, signToken } from '../../utils/auth';
import { AppError } from '../../utils/errorsCenter/appError';
import HttpStatusCode from '../../utils/httpStatusCode';
import { JwtPayload } from 'jsonwebtoken';

const signTokenFn = (name: string, id: string) =>
signToken(
  {
    name,
    id,
    permissions: ['partner:read', 'partner:write'],
  },
  {
    algorithm: 'RS256',
    expiresIn: '8h',
  },
);

export const PartnerController = {
  indexInfo: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const decoded = decodeToken(
        req.headers.authorization!.slice(7),
      ) as JwtPayload;
      const partner = await PartnerService.getInfo(decoded.id);
      if (!partner)
        throw new AppError(HttpStatusCode.NOT_FOUND, ERROR_MSG.NOT_FOUND, true);
      res.status(HttpStatusCode.OK).send(partner);
    } catch (error) {
      next(error);
    }
  },

  signup: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const partner = await PartnerService.signup(req.body);
      if (!partner)
        throw new AppError(
          HttpStatusCode.NOT_ACCEPTABLE,

          ERROR_MSG.NOT_VALID,
          true,
        );
      const accessToken = signTokenFn(partner.name, partner.id);

      res.status(HttpStatusCode.CREATED).json({
        Success: true,
        partner: {
          id: partner.id,
          name: partner.name,
          phone: partner.phone,
        },
        accessToken,
      });
    } catch (error) {
      next(error);
    }
  },

  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const partner = await PartnerService.login(
        req.body.phone,
        req.body.password,
      );
      if (!partner)
        throw new AppError(
          HttpStatusCode.NOT_ACCEPTABLE,
          ERROR_MSG.NOT_VALID,
          true,
        );
      const accessToken = signTokenFn(partner.name, partner.id);
      res.status(HttpStatusCode.ACCEPTED).json({
        success: true,
        partner: {
          id: partner.id,
          name: partner.name,
          phone: partner.phone,
        },
        accessToken,
      });
    } catch (error) {
      next(error);
    }
  },

  logout: async (req: Request, res: Response, next: NextFunction) => {
    res.status(HttpStatusCode.ACCEPTED).send('logged out');
  },

  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const decoded = decodeToken(
        req.headers.authorization!.slice(7),
      ) as JwtPayload;
      const partner = await PartnerService.update(decoded.id, req.body);
      if (!partner)
        throw new AppError(
          HttpStatusCode.NOT_ACCEPTABLE,
          ERROR_MSG.NOT_VALID,
          true,
        );
      res.sendStatus(HttpStatusCode.ACCEPTED).send(partner);
    } catch (error) {
      next(error);
    }
  },

  remove: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const decoded = decodeToken(
        req.headers.authorization!.slice(7),
      ) as JwtPayload;
      const partner = await PartnerService.remove(decoded.id);
      if (!partner)
        throw new AppError(HttpStatusCode.NOT_FOUND, ERROR_MSG.NOT_FOUND, true);
      res.status(HttpStatusCode.ACCEPTED).send('Deleted Successfully');
    } catch (errors) {
      next(errors);
    }
  },
}
