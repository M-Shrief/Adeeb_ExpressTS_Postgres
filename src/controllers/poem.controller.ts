import { NextFunction, Request, Response } from 'express';
// Services
import PoemService from '../services/poem.service';
// Types
import PoemType from '../interfaces/poem.interface';
// Utils
import { logger } from '../utils/logger';

export default class PoemController {
  private poemService = new PoemService();

  public indexWithPoetName = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    this.poemService
      .getAllWithPoetName()
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        logger.log(err);
        res.status(404).send('No Poems Found');
      });
  };

  public indexIntrosWithPoetName = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    this.poemService
      .getAllIntrosWithPoetName()
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        logger.log(err);
        res.status(404).send('No Poems Found');
      });
  };

  public indexOneWithPoet = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    this.poemService
      .getOneWithPoet(req.params.id)
      .then((poem) => {
        res.status(200).send(poem);
      })
      .catch((err) => logger.log(err));
  };

  public post = (req: Request, res: Response, next: NextFunction) => {
    this.poemService
      .post(req.body as PoemType)
      .then((result) => {
        res.status(201).send(result);
      })
      .catch((err) => {
        logger.log(err);
        res.status(400).send('Bad Request');
      });
  };

  public update = (req: Request, res: Response, next: NextFunction) => {
    this.poemService
      .update(req.params.id, req.body as PoemType)
      .then((updatedPoem) => {
        res.status(201).json({
          Status: true,
          Poem: updatedPoem,
        });
      })
      .catch((err) => {
        logger.log(err);
        res.status(400).send('Bad Request');
      });
  };

  public remove = (req: Request, res: Response, next: NextFunction) => {
    this.poemService
      .remove(req.params.id)
      .then(() => {
        res.status(202).send('Deleted Successfully');
      })
      .catch((err) => logger.log(err));
  };
}
