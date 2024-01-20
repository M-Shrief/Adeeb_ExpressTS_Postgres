import { NextFunction, Request, Response } from 'express';
// Services
import { PartnerService } from './partner.service';
// Types
import { ERROR_MSG, Partner } from './partner.entity';
// Utils
import { decodeToken, signToken } from '../../utils/auth';
import { AppError } from '../../utils/errorsCenter/appError';
import HttpStatusCode from '../../utils/httpStatusCode';
import { JwtPayload } from 'jsonwebtoken';
import { deadLine, grpcClient } from '../../grpc';

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
  PingPong: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    grpcClient.PingPong(
      {message: "Ping"},
      (err, result) => {
        try {
          if(err) 
            throw new AppError(HttpStatusCode.NOT_ACCEPTABLE, err.message, true);
          res.status(HttpStatusCode.ACCEPTED).send(result);
        } catch (error) {
          next(error);
        }
      }       
    ) 
  },

  indexInfo: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const decoded = decodeToken(
        req.headers.authorization!.slice(7),
      ) as JwtPayload;
      const service = await PartnerService.getInfo(decoded.id);
      const { status, partner, errMsg } =
        responseInfo.indexInfo(service);
      if (errMsg) throw new AppError(status, errMsg, true);
     res.status(status).send(partner);
    } catch (error) {
      next(error);
    }
  },

  signup: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const service = await PartnerService.signup(req.body);
      const { status, partner, errMsg } =
      responseInfo.signup(service);
      if (errMsg) throw new AppError(status, errMsg, true);
      if (partner) {
        const accessToken = signTokenFn(partner.name, partner.id);

        res.status(status).json({
          Success: true,
          partner: {
            id: partner.id,
            name: partner.name,
            phone: partner.phone,
          },
          accessToken,
        });
  
      }
    } catch (error) {
      next(error);
    }
  },

  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const service = await PartnerService.login(
        req.body.phone,
        req.body.password,
      );
      const { status, partner, errMsg } =
      responseInfo.login(service);
      if (errMsg) throw new AppError(status, errMsg, true);
      if (partner) {
        const accessToken = signTokenFn(partner.name, partner.id);
        res.status(status).json({
          success: true,
          partner: {
            id: partner.id,
            name: partner.name,
            phone: partner.phone,
          },
          accessToken,
        });  
      }
    } catch (error) {
      next(error);
    }
  },

  // logout: async (req: Request, res: Response, next: NextFunction) => {
  //   res.status(HttpStatusCode.ACCEPTED).send('logged out');
  // },

  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const decoded = decodeToken(
        req.headers.authorization!.slice(7),
      ) as JwtPayload;
      const service = await PartnerService.update(decoded.id, req.body);
      const { status, errMsg } =
      responseInfo.update(service);
      if (errMsg) throw new AppError(status, errMsg, true);
      res.sendStatus(status);
    } catch (error) {
      next(error);
    }
  },

  remove: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const decoded = decodeToken(
        req.headers.authorization!.slice(7),
      ) as JwtPayload;
      const service = await PartnerService.remove(decoded.id);
      const { status, errMsg } =
      responseInfo.remove(service);
      if (errMsg) throw new AppError(status, errMsg, true);
      res.sendStatus(status);
    } catch (errors) {
      next(errors);
    }
  },
}

export const responseInfo = {
  indexInfo: (
    partner: Partner | false,
  ): { status: number; partner?: Partner; errMsg?: string } => {
    if (!partner) {
      return { status: HttpStatusCode.NOT_FOUND, errMsg: ERROR_MSG.NOT_FOUND };
    }
    return { status: HttpStatusCode.OK, partner };
  },
  signup: (
    partner: Partner | false,
  ): { status: number; partner?: Partner; errMsg?: string } => {
    if (!partner) {
      return {
        status: HttpStatusCode.NOT_ACCEPTABLE,
        errMsg: ERROR_MSG.NOT_VALID,
      };
    }
    return { status: HttpStatusCode.CREATED, partner };
  },
  login: (
    partner: Partner | false,
  ): { status: number; partner?: Partner; errMsg?: string } => {
    if (!partner) {
      return {
        status: HttpStatusCode.NOT_ACCEPTABLE,
        errMsg: ERROR_MSG.NOT_VALID,
      };
    }
    return { status: HttpStatusCode.ACCEPTED, partner };
  },

  update: (partner: number | false): { status: number; errMsg?: string } => {
    if (!partner) {
      return {
        status: HttpStatusCode.NOT_ACCEPTABLE,
        errMsg: ERROR_MSG.NOT_VALID,
      };
    }
    return { status: HttpStatusCode.ACCEPTED };
  },
  remove: (partner: number | false): { status: number; errMsg?: string } => {
    if (!partner) {
      return { status: HttpStatusCode.NOT_FOUND, errMsg: ERROR_MSG.NOT_FOUND };
    }
    return { status: HttpStatusCode.ACCEPTED };
  },
}
