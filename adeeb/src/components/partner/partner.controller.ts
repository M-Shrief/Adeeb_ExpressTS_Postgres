import { NextFunction, Request, Response } from 'express';
// gRPC
import { grpcClient } from '../../grpc';
// Services
import { PartnerService } from './partner.service';
// Types
import { ERROR_MSG, Partner } from './partner.entity';
import { JwtPayload } from 'jsonwebtoken';
// Schema
import { createSchema, updateSchema } from './partner.schema';
// Utils
import { decodeToken } from '../../utils/auth';
import { AppError } from '../../utils/errorsCenter/appError';
import HttpStatusCode from '../../utils/httpStatusCode';

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
      const {name, phone, password} = req.body
      const isValid = await createSchema.isValid({name, phone, password});
      if (!isValid)
        throw new AppError(HttpStatusCode.NOT_ACCEPTABLE, ERROR_MSG.NOT_VALID, true);
      grpcClient.Signup(
        {name, phone, password, signed_for: "adeeb"},
        (err, result) => {
          try {
            if(err) 
              throw new AppError(HttpStatusCode.NOT_ACCEPTABLE, ERROR_MSG.NOT_VALID, true);
            res.status(HttpStatusCode.CREATED).send(result);
          } catch (error) {
            next(error);
          }
        }       
      ) 
    } catch (error) {
        next(error)
    }
  },

  login: async (req: Request, res: Response, next: NextFunction) => {
    const {phone, password} = req.body;
    grpcClient.Login(
      {phone, password},
      (err, result) => {
        try {
          if(err)
            throw new AppError(HttpStatusCode.NOT_ACCEPTABLE, ERROR_MSG.NOT_VALID, true)
          res.status(HttpStatusCode.ACCEPTED).send(result)
        } catch (error) {
          next(error)
        }
      }
    )
  },

  update: async (req: Request, res: Response, next: NextFunction) => {
    const decoded = decodeToken(
      req.headers.authorization!.slice(7),
    ) as JwtPayload;
    const {name, phone, password} = req.body;

    const isValid = await updateSchema.isValid({name, phone, password});
    if (!isValid)
      throw new AppError(HttpStatusCode.NOT_ACCEPTABLE, ERROR_MSG.NOT_VALID, true);

    grpcClient.Update(
      {id: decoded.user.id, name: name || '', phone: phone || '', password: password || ''},
      (err, result) => {
        try {
          if(err)
            throw new AppError(HttpStatusCode.NOT_ACCEPTABLE, ERROR_MSG.NOT_VALID, true);
          res.sendStatus(HttpStatusCode.ACCEPTED);
        } catch (error) {
          next(error)
        }
      }
    )
  },

  remove: async (req: Request, res: Response, next: NextFunction) => {
      const decoded = decodeToken(
        req.headers.authorization!.slice(7),
      ) as JwtPayload;
      grpcClient.Delete(
        {id: decoded.user.id},
        (err, result) => {
          try {
            if(err)
              throw new AppError(HttpStatusCode.NOT_FOUND, ERROR_MSG.NOT_FOUND, true);
            res.sendStatus(HttpStatusCode.ACCEPTED);
          } catch (error) {
            next(error)
          }
        }
      )
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
}
