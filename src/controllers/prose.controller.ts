import { NextFunction, Request, Response } from 'express';
// Services
import ProseService from '../services/prose.service';
// Types
import ProseType from '../interfaces/prose.interface';
// Utils
import { logger } from '../utils/logger';

export default class ProseController {
  private proseService: ProseService = new ProseService();

  public indexWithPoetName = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    this.proseService
      .getAllWithPoetName()
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        logger.error(err);
        res.status(404).send('No Poets Found');
      });
  };

  public indexRandom = (req: Request, res: Response, next: NextFunction) => {
    this.proseService
      .getRandom(Number(req.params.num))
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        logger.error(err);
        res.status(400).send('bad request');
      });
  };

  public indexOneWithPoetName = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    this.proseService
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
    this.proseService
      .post(req.body)
      .then((result) => {
        res.status(201).send(result);
      })
      .catch((err) => {
        logger.error(err);
        res.status(400).send('Bad Request');
      });
  };

  public update = (req: Request, res: Response, next: NextFunction) => {
    this.proseService
      .update(req.params.id, req.body)
      .then((result) => {
        res.status(202).json(result);
      })
      .catch((err) => {
        logger.error(err);
        res.status(400).send('Bad Request');
      });
  };

  public remove = (req: Request, res: Response, next: NextFunction) => {
    this.proseService
      .remove(req.params.id)
      .then(() => {
        res.status(202).send('Deleted Successfully');
      })
      .catch((err) => logger.error(err));
  };
}
