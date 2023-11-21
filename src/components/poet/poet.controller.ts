import { NextFunction, Request, Response } from 'express';
import { autoInjectable, container, inject, injectable } from "tsyringe";
// Services
import { PoetService } from './poet.service';
// Types
import { ERROR_MSG, Poet } from './poet.entity';
// Utils
import { AppError } from '../../utils/errorsCenter/appError';
import HttpStatusCode from '../../utils/httpStatusCode';

export const PoetController =  {
  index: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const poets = await PoetService.getAll();
      if (!poets) {
        throw new AppError(
          HttpStatusCode.NOT_FOUND,
          ERROR_MSG.NOT_AVAILABLE,
          true,
        );
      }
      res.status(HttpStatusCode.OK).send(poets);
    } catch (errors) {
      next(errors);
    }
  },

  indexOneWithLiterature: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const service = await PoetService.getOneWithLiterature(req.params.id)
      const {status, poet, errMsg} =  responseInfo.indexOneWithLiterature(service);
      if (errMsg) {
          throw new AppError(status, errMsg, true);
      }
      res.status(status).send(poet);
    } catch (err) {
      next(err);
    }
  },

  post: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const poet = await PoetService.post(req.body);
      if (!poet)
        throw new AppError(
          HttpStatusCode.NOT_ACCEPTABLE,
          ERROR_MSG.NOT_VALID,
          true,
        );
      res.status(HttpStatusCode.CREATED).send(poet);
    } catch (errors) {
      next(errors);
    }
  },

  postMany: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const poets = await PoetService.postMany(req.body);
      res.status(HttpStatusCode.CREATED).send(poets);
    } catch (errors) {
      next(errors);
    }
  },

  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const poet = await PoetService.update(req.params.id, req.body);
      if (!poet)
        throw new AppError(
          HttpStatusCode.NOT_ACCEPTABLE,
          ERROR_MSG.NOT_VALID,
          true,
        );
      // Bug: it gives error with res.status but works with res.sendStatus
      res.sendStatus(HttpStatusCode.ACCEPTED).send(poet);
    } catch (errors) {
      next(errors);
    }
  },

  remove: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const poet = await PoetService.remove(req.params.id);
      if (!poet)
        throw new AppError(HttpStatusCode.NOT_FOUND, ERROR_MSG.NOT_FOUND, true);
      res.status(HttpStatusCode.ACCEPTED).send('Deleted Successfully');
    } catch (errors) {
      next(errors);
    }
  }
}

export const responseInfo = {
  indexOneWithLiterature: (poet: Poet | false): {status: number, poet?: Poet, errMsg?: string} => {
    if (!poet) {
      return {status: HttpStatusCode.NOT_FOUND, errMsg: ERROR_MSG.NOT_FOUND }
    }
    return {status: HttpStatusCode.OK, poet}
  }
}