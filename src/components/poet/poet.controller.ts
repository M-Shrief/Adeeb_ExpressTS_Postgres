import { NextFunction, Request, Response } from 'express';
// Services
import { PoetService } from './poet.service';
// Types
import { PoetType } from '../../interfaces/poet.interface';
// Utils
import { logger } from '../../utils/logger';
import { AppError } from '../../utils/errorCenter/appError';
import HttpStatusCode from '../../utils/httpStatusCode';
export class PoetController {
  private poetService = new PoetService();

  public index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const poets = await this.poetService.getAll();

      if (!poets.length)
        throw new AppError(404, 'No Poets available for now', true);
      res.send(200).send(poets);
    } catch (errors) {
      next(errors);
    }
    // .then((result) => {
    //   res.status(200).send(result);
    // })
    // .catch((err) => {
    //   logger.error(err);
    //   res.status(404).send('No Poets Found');
    // });
  };

  public indexOneWithLiterature = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const poet = await this.poetService.getOneWithLiterature(req.params.id);
      if (!poet)
        throw new AppError(
          HttpStatusCode.NOT_FOUND,
          "Poet doesn't exist",
          true,
        );
      // if (!poet) return res.status(400).send("Poet doesn't exist");
      return res.status(200).send(poet);
    } catch (err) {
      next(err);
    }
  };

  public post = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const poet = await this.poetService.post(req.body as PoetType['details']);

      res.status(201).send(poet);

      // .then((result) => {
      //   res.status(201).send(result);
      // })
      // .catch((err) => {
      //   logger.error(err);
      //   res.status(400).send('Bad Request');
      // });
    } catch (errors) {
      next(errors);
    }
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
