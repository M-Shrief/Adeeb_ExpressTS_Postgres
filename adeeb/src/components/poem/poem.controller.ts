import { NextFunction, Request, Response } from 'express';
// Services
import { PoemService } from './poem.service';
// Types
import { ERROR_MSG, Poem } from './poem.entity';
// Utils
import { AppError } from '../../utils/errorsCenter/appError';
import HttpStatusCode from '../../utils/httpStatusCode';

export const PoemController = {
  indexWithPoetName: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const service = await PoemService.getAllWithPoetName();
      const { status, poems, errMsg } = responseInfo.indexWithPoetName(service);
      if (errMsg) throw new AppError(status, errMsg, true);
      res.status(status).send(poems);
    } catch (error) {
      next(error);
    }
  },

  indexIntrosWithPoetName: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const service = await PoemService.getAllIntrosWithPoetName();
      const { status, poems, errMsg } =
        responseInfo.indexIntrosWithPoetName(service);
      if (errMsg) throw new AppError(status, errMsg, true);
      res.status(HttpStatusCode.OK).send(poems);
    } catch (error) {
      next(error);
    }
  },

  indexOneWithPoet: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const service = await PoemService.getOneWithPoet(req.params.id);
      const { status, poem, errMsg } = responseInfo.indexOneWithPoet(service);
      if (errMsg) throw new AppError(status, errMsg, true);
      res.status(status).send(poem);
    } catch (error) {
      next(error);
    }
  },

  post: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const service = await PoemService.post(req.body);
      const { status, poem, errMsg } = responseInfo.post(service);
      if (errMsg) throw new AppError(status, errMsg, true);
      res.status(status).send(poem);
    } catch (error) {
      next(error);
    }
  },

  postMany: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const service = await PoemService.postMany(req.body);
      const { status, poems, errMsg } = responseInfo.postMany(service);
      if (errMsg) throw new AppError(status, errMsg, true);
      res.status(status).send(poems);
    } catch (error) {
      next(error);
    }
  },

  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const service = await PoemService.update(req.params.id, req.body);
      const { status, errMsg } = responseInfo.update(service);
      if (errMsg) throw new AppError(status, errMsg, true);
      res.sendStatus(status);
    } catch (error) {
      next(error);
    }
  },

  remove: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const service = await PoemService.remove(req.params.id);
      const { status, errMsg } = responseInfo.remove(service);
      if (errMsg) throw new AppError(status, errMsg, true);
      res.sendStatus(status);
    } catch (error) {
      next(error);
    }
  },
};

export const responseInfo = {
  indexWithPoetName: (
    poems: Poem[] | false,
  ): { status: number; poems?: Poem[]; errMsg?: string } => {
    if (!poems) {
      return {
        status: HttpStatusCode.NOT_FOUND,
        errMsg: ERROR_MSG.NOT_AVAILABLE,
      };
    }
    return { status: HttpStatusCode.OK, poems };
  },
  indexIntrosWithPoetName: (
    poems: Poem[] | false,
  ): { status: number; poems?: Poem[]; errMsg?: string } => {
    if (!poems) {
      return {
        status: HttpStatusCode.NOT_FOUND,
        errMsg: ERROR_MSG.NOT_AVAILABLE,
      };
    }
    return { status: HttpStatusCode.OK, poems };
  },
  indexOneWithPoet: (
    poem: Poem | false,
  ): { status: number; poem?: Poem; errMsg?: string } => {
    if (!poem) {
      return { status: HttpStatusCode.NOT_FOUND, errMsg: ERROR_MSG.NOT_FOUND };
    }
    return { status: HttpStatusCode.OK, poem };
  },
  post: (
    poem: Poem | false,
  ): { status: number; poem?: Poem; errMsg?: string } => {
    if (!poem) {
      return {
        status: HttpStatusCode.NOT_ACCEPTABLE,
        errMsg: ERROR_MSG.NOT_VALID,
      };
    }
    return { status: HttpStatusCode.CREATED, poem };
  },
  postMany: (
    poems: { newPoems: Poem[]; inValidPoems: Poem[] } | false,
  ): {
    status: number;
    poems?: { newPoems: Poem[]; inValidPoems: Poem[] };
    errMsg?: string;
  } => {
    if (!poems) {
      return {
        status: HttpStatusCode.NOT_ACCEPTABLE,
        errMsg: ERROR_MSG.NOT_VALID,
      };
    }
    return { status: HttpStatusCode.CREATED, poems };
  },
  update: (poem: number | false): { status: number; errMsg?: string } => {
    if (!poem) {
      return {
        status: HttpStatusCode.NOT_ACCEPTABLE,
        errMsg: ERROR_MSG.NOT_VALID,
      };
    }
    return { status: HttpStatusCode.ACCEPTED };
  },
  remove: (poem: number | false): { status: number; errMsg?: string } => {
    if (!poem) {
      return { status: HttpStatusCode.NOT_FOUND, errMsg: ERROR_MSG.NOT_FOUND };
    }
    return { status: HttpStatusCode.ACCEPTED };
  },
};
