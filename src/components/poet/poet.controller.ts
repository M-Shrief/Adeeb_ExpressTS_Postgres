import { NextFunction, Request, Response } from 'express';
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
      const service = await PoetService.getAll();
      const {status, poets, errMsg} = responseInfo.indexAll(service)
      if (errMsg) {
        throw new AppError(status, errMsg, true);
      }
      res.status(status).send(poets);
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
      const service = await PoetService.post(req.body);
      const {status, poet, errMsg} = responseInfo.post(service)
      if (errMsg)
        throw new AppError(status, errMsg, true);

      res.status(status).send(poet);
    } catch (errors) {
      next(errors);
    }
  },

  postMany: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const service = await PoetService.postMany(req.body);
      const {status, poets, errMsg} = responseInfo.postMany(service)
      if (errMsg) {
        throw new AppError(status, errMsg, true);
      }
      res.status(status).send(poets);
    } catch (errors) {
      next(errors);
    }
  },

  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const service = await PoetService.update(req.params.id, req.body);
      const {status, errMsg} = responseInfo.update(service)
      if (errMsg) {
        throw new AppError(status, errMsg, true);
      }
      // Bug: it gives error with res.status but works with res.sendStatus
      // It gives a bug because poet is a number so it thinks we put it as a status code.
      res.sendStatus(status);
    } catch (errors) {
      next(errors);
    }
  },

  remove: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const service = await PoetService.remove(req.params.id);
      const {status, errMsg} = responseInfo.remove(service)
      if (errMsg)
        throw new AppError(status, errMsg, true);
      res.sendStatus(HttpStatusCode.ACCEPTED)
    } catch (errors) {
      next(errors);
    }
  }
}

export const responseInfo = {
  indexAll: (poets: Poet[] | false): {status: number, poets?: Poet[], errMsg?: string}  => {
    if (!poets) {
      return {status: HttpStatusCode.NOT_FOUND, errMsg: ERROR_MSG.NOT_AVAILABLE }
    }
    return {status: HttpStatusCode.OK, poets}
  },
  indexOneWithLiterature: (poet: Poet | false): {status: number, poet?: Poet, errMsg?: string} => {
    if (!poet) {
      return {status: HttpStatusCode.NOT_FOUND, errMsg: ERROR_MSG.NOT_FOUND }
    }
    return {status: HttpStatusCode.OK, poet}
  },
  post: (poet: Poet | false): {status: number, poet?: Poet, errMsg?: string} => {
    if (!poet) {
      return {status: HttpStatusCode.NOT_ACCEPTABLE, errMsg: ERROR_MSG.NOT_VALID }
    }
    return {status: HttpStatusCode.CREATED, poet}
  },
  postMany: (poets: {newPoets: Poet[], notValidPoets: Poet[]} | false): {status: number, poets?: {newPoets: Poet[], notValidPoets: Poet[]}, errMsg?: string} => {
    if (!poets) {
      return {status: HttpStatusCode.NOT_ACCEPTABLE, errMsg: ERROR_MSG.NOT_VALID}
    }
    return {status: HttpStatusCode.CREATED, poets}
  },
  update: (poet: number | false): {status: number, errMsg?: string} => {
    if (!poet) {
      return {status: HttpStatusCode.NOT_ACCEPTABLE, errMsg: ERROR_MSG.NOT_VALID }
    }
    return {status: HttpStatusCode.ACCEPTED}
  },
  remove: (poet: number | false): {status: number, errMsg?: string} => {
    if (!poet) {
      return {status: HttpStatusCode.NOT_FOUND, errMsg: ERROR_MSG.NOT_FOUND }
    }
    return {status: HttpStatusCode.ACCEPTED}
  },
}