import { NextFunction, Request, Response } from 'express';
// Services
import { PoetService } from './poet.service';
// Types
import { PoetType } from '../../interfaces/poet.interface';
// Utils
import { logger } from '../../utils/logger';
import { AppError } from '../../utils/errorsCenter/appError';
import HttpStatusCode from '../../utils/httpStatusCode';
export class PoetController {
  private poetService = new PoetService();

  public index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const poets = await this.poetService.getAll();

      if (!poets) {
        throw new AppError(
          HttpStatusCode.NOT_FOUND,
          'No Poets available for now',
          true,
        );
      }
      res.status(HttpStatusCode.OK).send(poets);
    } catch (errors) {
      next(errors);
    }
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
      return res.status(HttpStatusCode.OK).send(poet);
    } catch (err) {
      next(err);
    }
  };

  public post = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const poet = await this.poetService.post(req.body as PoetType['details']);
      if (!poet)
        throw new AppError(
          HttpStatusCode.NOT_ACCEPTABLE,
          'Data for poet is not valid',
          true,
        );
      res.status(HttpStatusCode.CREATED).send(poet);
    } catch (errors) {
      next(errors);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const poet = await this.poetService.update(req.params.id, req.body);
      if (!poet)
        throw new AppError(
          HttpStatusCode.NOT_ACCEPTABLE,
          'Data for poet is not valid',
          true,
        );
      res.status(HttpStatusCode.CREATED).send(poet);
    } catch (errors) {
      next(errors);
    }
  };

  public remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const poet = await this.poetService.remove(req.params.id);
      if (!poet)
        throw new AppError(HttpStatusCode.NOT_FOUND, "Poet's not found", true);
      res.status(HttpStatusCode.ACCEPTED).send('Deleted Successfully');
    } catch (errors) {
      next(errors);
    }
  };
}
