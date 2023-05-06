import { NODE_ENV } from '../../config';
import { CookieOptions, NextFunction, Request, Response } from 'express';
// Services
import { PartnerService } from './partner.service';
// Types
import { PartnerType } from '../../interfaces/partner.interface';
// Utils
import { logger } from '../../utils/logger';
import { signToken } from '../../utils/auth';

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

  public indexInfo = (req: Request, res: Response, next: NextFunction) => {
    this.partnerService
      .getInfo(req.params.id)
      .then((result: PartnerType) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        logger.error(err);
        res.status(404).send('No Poems Found');
      });
  };

  public signup = async (req: Request, res: Response, next: NextFunction) => {
    const partner = await this.partnerService.signup(req.body);
    const accessToken = this.signToken(partner.name);
    res.set('Authorization', `Bearer ${accessToken}`);
    res.status(202).json({
      Success: true,
      partner: {
        _id: partner._id,
        name: partner.name,
        phone: partner.phone,
        address: partner.address,
      },
      accessToken,
    });
  };

  public login = async (req: Request, res: Response, next: NextFunction) => {
    const partner = await this.partnerService.login(
      req.body.phone,
      req.body.password,
    );
    if (!partner) return res.status(400).send('Unauthorized');

    const accessToken = this.signToken(partner.name);
    res.set('Authorization', `Bearer ${accessToken}`);
    res.status(202).json({
      success: true,
      partner: {
        _id: partner._id,
        name: partner.name,
        phone: partner.phone,
        address: partner.address,
      },
      accessToken,
    });
  };

  public logout = async (req: Request, res: Response, next: NextFunction) => {
    res.set('Authorization', undefined);
    res.status(200).send('logged out');
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    await this.partnerService
      .update(req.params.id, req.body)
      .then((result) => {
        res.status(201).send(result);
      })
      .catch((err) => {
        logger.error(err);
        res.status(400).send('Bad Request');
      });
  };

  public remove = (req: Request, res: Response, next: NextFunction) => {
    this.partnerService
      .remove(req.params.id)
      .then(() => {
        res.status(202).send('Deleted Successfully');
      })
      .catch((err) => logger.error(err));
  };
}
