import {  NextFunction, Request, Response } from 'express';
// Services
import { PartnerService } from './partner.service';
// Types
import { ERROR_MSG } from './partner.entity';
// Utils
import { decodeToken, signToken } from '../../utils/auth';
import { AppError } from '../../utils/errorsCenter/appError';
import HttpStatusCode from '../../utils/httpStatusCode';
import { JwtPayload } from 'jsonwebtoken';

export class PartnerController {
  private partnerService = new PartnerService();

  private signToken = (name: string, id: string) =>
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


  public indexInfo = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const decoded = decodeToken(req.headers.authorization!.slice(7)) as JwtPayload;
      const partner = await this.partnerService.getInfo(decoded.id);
      if (!partner)
        throw new AppError(HttpStatusCode.NOT_FOUND, ERROR_MSG.NOT_FOUND, true);
      res.status(HttpStatusCode.OK).send(partner);
    } catch (error) {
      next(error);
    }
  };

  public signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const partner = await this.partnerService.signup(req.body);
      if (!partner)
        throw new AppError(
          HttpStatusCode.NOT_ACCEPTABLE,

          ERROR_MSG.NOT_VALID,
          true,
        );
      const accessToken = this.signToken(partner.name, partner.id);

      res.status(HttpStatusCode.CREATED).json({
        Success: true,
        partner: {
          id: partner.id,
          name: partner.name,
          phone: partner.phone,
        },
        accessToken
      });
    } catch (error) {
      next(error);
    }
  };

  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const partner = await this.partnerService.login(
        req.body.phone,
        req.body.password,
      );
      if (!partner)
        throw new AppError(
          HttpStatusCode.NOT_ACCEPTABLE,
          ERROR_MSG.NOT_VALID,
          true,
        );
      const accessToken = this.signToken(partner.name, partner.id);
      res.status(HttpStatusCode.ACCEPTED).json({
        success: true,
        partner: {
          id: partner.id,
          name: partner.name,
          phone: partner.phone,
        },
        accessToken
      });
    } catch (error) {
      next(error);
    }
  };

  public logout = async (req: Request, res: Response, next: NextFunction) => {
    res.status(HttpStatusCode.ACCEPTED).send('logged out');
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const decoded = decodeToken(req.headers.authorization!.slice(7)) as JwtPayload;
      const partner = await this.partnerService.update(decoded.id, req.body);
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
  };

  public remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const decoded = decodeToken(req.headers.authorization!.slice(7)) as JwtPayload;
      const partner = await this.partnerService.remove(decoded.id);
      if (!partner)
        throw new AppError(HttpStatusCode.NOT_FOUND, ERROR_MSG.NOT_FOUND, true);
      res.status(HttpStatusCode.ACCEPTED).send('Deleted Successfully');
    } catch (errors) {
      next(errors);
    }
  };
}
