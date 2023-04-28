import { NextFunction, Request, Response } from 'express';
// Services
import PoemService from '../services/poem.service';
// Types
import PoemType from '../interfaces/poem.interface';
// Utils
import { logger } from '../utils/logger';

export default class PoemController {
  private poemService = new PoemService();

  public index = (req: Request, res: Response, next: NextFunction) => {
    this.poemService
      .getPoemsWithPoetName()
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        logger.log(err);
        res.status(404).send('No Poems Found');
      });
  };
}
