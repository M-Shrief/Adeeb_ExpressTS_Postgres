import { NextFunction, Request, Response } from 'express';
// Services
import { ProseService } from './prose.service';
// Types
import { ERROR_MSG } from './prose.entity';
// Utils
import { AppError } from '../../utils/errorsCenter/appError';
import HttpStatusCode from '../../utils/httpStatusCode';

export const ProseController = {
  indexWithPoetName: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const proses = await ProseService.getAllWithPoetName();
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
  },

  indexRandomWithPoetName: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const proses = await ProseService.getRandomWithPoetName(
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
  },

  indexOneWithPoetName: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const prose = await ProseService.getOneWithPoetName(req.params.id);
      if (!prose)
        throw new AppError(HttpStatusCode.NOT_FOUND, ERROR_MSG.NOT_FOUND, true);
      res.status(HttpStatusCode.OK).send(prose);
    } catch (error) {
      next(error);
    }
  },

  post: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const prose = await ProseService.post(req.body);
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
  },

  postMany: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const proses = await ProseService.postMany(req.body);
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
  },

  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const prose = await ProseService.update(req.params.id, req.body);
      if (!prose)
        throw new AppError(
          HttpStatusCode.NOT_ACCEPTABLE,
          ERROR_MSG.NOT_VALID,
          true,
        );
      res.sendStatus(HttpStatusCode.ACCEPTED).send(prose);
    } catch (errors) {
      next(errors);
    }
  },

  remove: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const prose = await ProseService.remove(req.params.id);
      if (!prose)
        throw new AppError(HttpStatusCode.NOT_FOUND, ERROR_MSG.NOT_FOUND, true);
      res.status(HttpStatusCode.ACCEPTED).send('Deleted Successfully');
    } catch (errors) {
      next(errors);
    }
  },
};
