import { NextFunction, Request, Response } from 'express';
// Services
import { ProseService } from './prose.service';
// Types
import { ERROR_MSG } from '../../interfaces/prose.interface';
// Utils
import { AppError } from '../../utils/errorsCenter/appError';
import HttpStatusCode from '../../utils/httpStatusCode';

export class ProseController {
  private proseService: ProseService = new ProseService();

  public indexWithPoetName = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const proses = await this.proseService.getAllWithPoetName();
      if (!proses)
        throw new AppError(
          HttpStatusCode.NOT_FOUND,
          ERROR_MSG.NOT_AVAILABLE,
          true,
        );
      res.status(HttpStatusCode.OK).send(proses);
    } catch (error) {
      next(error);
    }
  };

  public indexRandomWithPoetName = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const proses = await this.proseService.getRandomWithPoetName(
        Number(req.query.num),
      );
      if (!proses)
        throw new AppError(
          HttpStatusCode.NOT_FOUND,
          ERROR_MSG.NOT_AVAILABLE,
          true,
        );
      res.status(HttpStatusCode.OK).send(proses);
    } catch (error) {
      next(error);
    }
  };

  public indexOneWithPoetName = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const prose = await this.proseService.getOneWithPoetName(req.params.id);
      if (!prose)
        throw new AppError(HttpStatusCode.NOT_FOUND, ERROR_MSG.NOT_FOUND, true);
      res.status(HttpStatusCode.OK).send(prose);
    } catch (error) {
      next(error);
    }
  };

  public post = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const prose = await this.proseService.post(req.body);
      if (!prose)
        throw new AppError(
          HttpStatusCode.NOT_ACCEPTABLE,
          ERROR_MSG.NOT_VALID,
          true,
        );
      res.status(HttpStatusCode.CREATED).send(prose);
    } catch (errors) {
      next(errors);
    }
  };

  public postMany = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const proses = await this.proseService.postMany(req.body);
      if (!proses)
        throw new AppError(
          HttpStatusCode.NOT_ACCEPTABLE,
          ERROR_MSG.NOT_VALID,
          true,
        );
      res.status(HttpStatusCode.CREATED).send(proses);
    } catch (errors) {
      next(errors);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const prose = await this.proseService.update(req.params.id, req.body);
      if (!prose)
        throw new AppError(
          HttpStatusCode.NOT_ACCEPTABLE,
          ERROR_MSG.NOT_VALID,
          true,
        );
      res.status(HttpStatusCode.ACCEPTED).send(prose);
    } catch (errors) {
      next(errors);
    }
  };

  public remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const prose = await this.proseService.remove(req.params.id);
      if (!prose)
        throw new AppError(HttpStatusCode.NOT_FOUND, ERROR_MSG.NOT_FOUND, true);
      res.status(HttpStatusCode.ACCEPTED).send('Deleted Successfully');
    } catch (errors) {
      next(errors);
    }
  };
}
