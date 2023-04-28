import { NextFunction, Request, Response } from 'express';
// Services
import PoetService from '../services/poet.service';
// Utils
import { logger } from '../utils/logger';

export default class PoetController {
  private poetService = new PoetService();

  public index = (req: Request, res: Response, next: NextFunction) => {
    this.poetService
      .getPoets()
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        logger.log(err);
        res.status(404).send('No Poets Found');
      });
  };
}
