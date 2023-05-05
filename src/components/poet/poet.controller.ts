import { NextFunction, Request, Response } from 'express';
// Services
import { PoetService } from './poet.service';
// Types
import { PoetType } from '../../interfaces/poet.interface';
// Utils
import { logger } from '../../utils/logger';
export class PoetController {
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

  public indexOneWithLiterature = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const poet = await this.poetService.getOneWithLiterature(req.params.id);
    if (!poet) return res.status(400).send("Poet doesn't exist");
    return res.status(200).send(poet);
  };

  public post = (req: Request, res: Response, next: NextFunction) => {
    this.poetService
      .post(req.body as PoetType['details'])
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
