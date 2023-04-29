import { NextFunction, Request, Response } from 'express';
// Services
import PartnerService from '../services/partner.service';
// Types
import PartnerType from '../interfaces/partner.interface';
// Utils
import { logger } from '../utils/logger';

export default class PartnerController {
  private partnerService = new PartnerService();

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
}
