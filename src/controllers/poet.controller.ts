import { NextFunction, Request, Response } from 'express';
// Services
import PoetService from '../services/poet.service';
// Types
import PoetType from '../interfaces/poet.interface';
// Utils
import { logger } from '../utils/logger';

export default class PoetController {
  private poetService = new PoetService();

  public index = (req: Request, res: Response, next: NextFunction) => {
    this.poetService
      .getAll()
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        logger.error(err);
        res.status(404).send('No Poets Found');
      });
  };

  public indexOneWithLiterature = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    this.poetService
      .getOneWithLiterature(req.params.id)
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => logger.error(err));
  };

  public post = (req: Request, res: Response, next: NextFunction) => {
    this.poetService
      .post(req.body as PoetType)
      .then((result) => {
        res.status(201).send(result);
      })
      .catch((err) => {
        logger.error(err);
        res.status(400).send('Bad Request');
      });
  };

  public update = (req: Request, res: Response, next: NextFunction) => {
    this.poetService
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
    this.poetService
      .remove(req.params.id)
      .then(() => {
        res.status(202).send('Deleted Successfully');
      })
      .catch((err) => logger.error(err));
  };
}
