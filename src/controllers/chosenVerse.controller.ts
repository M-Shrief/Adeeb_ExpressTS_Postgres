import { NextFunction, Request, Response } from 'express';
// Services
import ChosenVerseService from '../services/chosenVerse.service';
// Types
import ChosenVerseType from '../interfaces/ChosenVerse.interface';
// Utils
import { logger } from '../utils/logger';

export default class ChosenVerseController {
  private ChosenVerseService = new ChosenVerseService();

  public indexWithPoetName = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    this.ChosenVerseService.getChosenVerseWithPoetName()
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        logger.log(err);
        res.status(404).send('No Poems Found');
      });
  };
}
