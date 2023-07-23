import { NODE_ENV } from '../../config';
import { CookieOptions, NextFunction, Request, Response } from 'express';
// Services
import { PartnerService } from './partner.service';
// Types
import { ERROR_MSG } from '../../interfaces/partner.interface';
// Utils
import { signToken } from '../../utils/auth';
import { AppError } from '../../utils/errorsCenter/appError';
import HttpStatusCode from '../../utils/httpStatusCode';

export class PartnerController {
  private partnerService = new PartnerService();

  private signToken = (name: string) =>
    signToken(
      {
        Name: name,
        permissions: ['partner:read', 'partner:write'],
      },
      {
        algorithm: 'RS256',
        expiresIn: '8h',
      },
    );

  private cookieOptions: CookieOptions = {
    maxAge: 60 * 60 * 8, // 8 hours
    httpOnly: true,
    secure: NODE_ENV === 'production' ? true : false,
    sameSite: 'strict',
  };

  public indexInfo = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const partner = await this.partnerService.getInfo(req.params.id);
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
      const accessToken = this.signToken(partner.name);
      res.set('Authorization', `Bearer ${accessToken}`);
      res.status(HttpStatusCode.CREATED).json({
        Success: true,
        partner: {
          id: partner.id,
          name: partner.name,
          phone: partner.phone,
          address: partner.address,
        },
        accessToken,
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
      const accessToken = this.signToken(partner.name);
      res.set('Authorization', `Bearer ${accessToken}`);
      res.status(HttpStatusCode.ACCEPTED).json({
        success: true,
        partner: {
          id: partner.id,
          name: partner.name,
          phone: partner.phone,
          address: partner.address,
        },
        accessToken,
      });
    } catch (error) {
      next(error);
    }
  };

  public logout = async (req: Request, res: Response, next: NextFunction) => {
    res.set('Authorization', undefined);
    res.status(HttpStatusCode.ACCEPTED).send('logged out');
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const partner = await this.partnerService.update(req.params.id, req.body);
      if (!partner)
        throw new AppError(
          HttpStatusCode.NOT_ACCEPTABLE,
          ERROR_MSG.NOT_VALID,
          true,
        );
      res.status(201).send(partner);
    } catch (error) {
      next(error);
    }
  };

  public remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const partner = await this.partnerService.remove(req.params.id);
      if (!partner)
        throw new AppError(HttpStatusCode.NOT_FOUND, ERROR_MSG.NOT_FOUND, true);
      res.status(HttpStatusCode.ACCEPTED).send('Deleted Successfully');
    } catch (errors) {
      next(errors);
    }
  };
}
