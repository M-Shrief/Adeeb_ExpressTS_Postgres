import { NextFunction, Request, Response } from 'express';
// Services
import { ChosenVerseService } from './chosenVerse.service';
// Types
import { ChosenVerseType } from '../../interfaces/chosenVerse.interface';
// Utils
import { logger } from '../../utils/logger';

export class ChosenVerseController {
  private chosenVerseService = new ChosenVerseService();

  public indexWithPoetName = (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    this.chosenVerseService
      .getAllWithPoetName()
      .then((result: ChosenVerseType[]) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        logger.error(err);
        res.status(404).send('No Poems Found');
      });
  };

  public indexRandomWithPoetName = (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    this.chosenVerseService
      .getRandomWithPoetName(Number(req.query.num))
      .then((result: ChosenVerseType[]) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        logger.error(err);
        res.status(404).send('No Poems Found');
      });
  };

  public indexOneWithPoetName = (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    this.chosenVerseService
      .getOneWithPoetName(req.params.id)
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        logger.error(err);
        res.send(404).send('No Chosen Verse Found');
      });
  };

  public post = (req: Request, res: Response, next: NextFunction) => {
    this.chosenVerseService
      .post(req.body as ChosenVerseType)
      .then((result) => {
        res.status(201).send(result);
      })
      .catch((err) => {
        logger.error(err);
        res.status(400).send('Bad Request');
      });
  };

  public update = (req: Request, res: Response, next: NextFunction) => {
    this.chosenVerseService
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
    this.chosenVerseService
      .remove(req.params.id)
      .then(() => {
        res.status(202).send('Deleted Successfully');
      })
      .catch((err) => logger.error(err));
  };
}
