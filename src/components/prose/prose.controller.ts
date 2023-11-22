import { NextFunction, Request, Response } from 'express';
// Services
import { ProseService } from './prose.service';
// Types
import { ERROR_MSG, Prose } from './prose.entity';
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
      const service = await ProseService.getAllWithPoetName();
      const {status, proses, errMsg} = responseInfo.indexWithPoetName(service)
      if (errMsg) throw new AppError(status, errMsg, true);
      res.status(status).send(proses);
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
      const service = await ProseService.getRandomWithPoetName(
        Number(req.query.num),
      );
      const {status, proses, errMsg} = responseInfo.indexRandomWithPoetName(service)
      if (errMsg) throw new AppError(status, errMsg, true);
      res.status(status).send(proses);
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
      const service = await ProseService.getOneWithPoetName(req.params.id);
      const {status, prose, errMsg} = responseInfo.indexOneWithPoetName(service)
      if (errMsg) throw new AppError(status, errMsg, true);
      res.status(status).send(prose);
    } catch (error) {
      next(error);
    }
  },

  post: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const service = await ProseService.post(req.body);
      const {status, prose, errMsg} = responseInfo.post(service)
      if (errMsg) throw new AppError(status, errMsg, true);
      res.status(status).send(prose);
    } catch (errors) {
      next(errors);
    }
  },

  postMany: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const service = await ProseService.postMany(req.body);
      const {status, proses, errMsg} = responseInfo.postMany(service)
      if (errMsg) throw new AppError(status, errMsg, true);
      res.status(status).send(proses);
    } catch (errors) {
      next(errors);
    }
  },

  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const service = await ProseService.update(req.params.id, req.body);
      const { status, errMsg } = responseInfo.update(service);
      if (errMsg) throw new AppError(status, errMsg, true);
      res.sendStatus(status);
    } catch (errors) {
      next(errors);
    }
  },

  remove: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const service = await ProseService.remove(req.params.id);
      const { status, errMsg } = responseInfo.update(service);
      if (errMsg) throw new AppError(status, errMsg, true);
      res.sendStatus(status);    
    } catch (errors) {
      next(errors);
    }
  },
};

export const responseInfo = {
  indexWithPoetName: (
    proses: Prose[] | false,
  ): { status: number; proses?: Prose[]; errMsg?: string } => {
    if (!proses) {
      return {
        status: HttpStatusCode.NOT_FOUND,
        errMsg: ERROR_MSG.NOT_AVAILABLE,
      };
    }
    return { status: HttpStatusCode.OK, proses };
  },
  indexRandomWithPoetName: (
    proses: Prose[] | false,
  ): { status: number; proses?: Prose[]; errMsg?: string } => {
    if (!proses) {
      return {
        status: HttpStatusCode.NOT_FOUND,
        errMsg: ERROR_MSG.NOT_AVAILABLE,
      };
    }
    return { status: HttpStatusCode.OK, proses };
  },
  indexOneWithPoetName: (
    prose: Prose| false,
  ): { status: number; prose?: Prose; errMsg?: string } => {
    if (!prose) {
      return { status: HttpStatusCode.NOT_FOUND, errMsg: ERROR_MSG.NOT_FOUND };
    }
    return { status: HttpStatusCode.OK, prose };
  },
  post: (
    prose: Prose | false,
  ): { status: number; prose?: Prose; errMsg?: string } => {
    if (!prose) {
      return {
        status: HttpStatusCode.NOT_ACCEPTABLE,
        errMsg: ERROR_MSG.NOT_VALID,
      };
    }
    return { status: HttpStatusCode.CREATED, prose };
  },
  postMany: (
    proses: { newProses: Prose[]; inValidProses: Prose[] } | false,
  ): { status: number; proses?: { newProses: Prose[]; inValidProses: Prose[] }; errMsg?: string } => {
    if (!proses) {
      return {
        status: HttpStatusCode.NOT_ACCEPTABLE,
        errMsg: ERROR_MSG.NOT_VALID,
      };
    }
    return { status: HttpStatusCode.CREATED, proses };
  },
  update: (prose: number | false): { status: number; errMsg?: string } => {
    if (!prose) {
      return {
        status: HttpStatusCode.NOT_ACCEPTABLE,
        errMsg: ERROR_MSG.NOT_VALID,
      };
    }
    return { status: HttpStatusCode.ACCEPTED };
  },
  remove: (prose: number | false): { status: number; errMsg?: string } => {
    if (!prose) {
      return { status: HttpStatusCode.NOT_FOUND, errMsg: ERROR_MSG.NOT_FOUND };
    }
    return { status: HttpStatusCode.ACCEPTED };
  },
}