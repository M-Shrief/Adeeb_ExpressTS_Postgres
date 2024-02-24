import { NextFunction, Request, Response } from 'express';
// Services
import { PoemService } from './poem.service';
// Types
import { ERROR_MSG, Poem } from './poem.entity';
// Utils
import { AppError } from '../../utils/errorsCenter/appError';
import HttpStatusCode from '../../utils/httpStatusCode';

/**
 * Poem's Controller to handle request.
 */
export const PoemController = {
  /**
   * Handle indexWithPoetName request to get All Poems data with the poet name
   * @remarks
   * if successful, res = {poems: Poem[]} with success status: {@link HttpStatusCode.OK}.
   * 
   * if not, res = {@link ERROR_MSG.NOT_AVAILABLE} with error {@link HttpStatusCode.NOT_FOUND}.
  */ 
  async indexWithPoetName(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const service = await PoemService.getAllWithPoetName();
      const { status, poems, errMsg } = responseInfo.indexWithPoetName(service);
      if (errMsg) throw new AppError(status, errMsg, true);
      res.status(status).send(poems);
    } catch (error) {
      next(error);
    }
  },

  /**
   * Handle indexIntrosWithPoetName request to get All Poems intro with the poet name
   * @remarks
   * if successful, res = {poems: Poem[]} with success status: {@link HttpStatusCode.OK}.
   * 
   * if not, res = {@link ERROR_MSG.NOT_AVAILABLE} with error {@link HttpStatusCode.NOT_FOUND}.
  */ 
  async indexIntrosWithPoetName(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const service = await PoemService.getAllIntrosWithPoetName();
      const { status, poems, errMsg } =
        responseInfo.indexIntrosWithPoetName(service);
      if (errMsg) throw new AppError(status, errMsg, true);
      res.status(status).send(poems);
    } catch (error) {
      next(error);
    }
  },

  /**
   * Handle IndexOneWithPoemName request to get a specific Poem and the poet name.
   *
   * Recieving poem's id in req.params.id
   * @remarks
   * if successful, res = {poem: Poem} with success status: {@link HttpStatusCode.OK}.
   * 
   * if not, res = {@link ERROR_MSG.NOT_FOUND} with error {@link HttpStatusCode.NOT_FOUND}.
  */ 
  async indexOneWithPoet(req: Request, res: Response, next: NextFunction) {
    try {
      const service = await PoemService.getOneWithPoet(req.params.id);
      const { status, poem, errMsg } = responseInfo.indexOneWithPoet(service);
      if (errMsg) throw new AppError(status, errMsg, true);
      res.status(status).send(poem);
    } catch (error) {
      next(error);
    }
  },

  /**
   * Handle post request to create a new Poem
   * @remarks
   * if successful, res = Poem with success status: {@link HttpStatusCode.CREATED}.
   * 
   * if not, res = {@link ERROR_MSG.NOT_VALID} with error {@link HttpStatusCode.NOT_ACCEPTABLE}.
  */ 
  async post(req: Request, res: Response, next: NextFunction) {
    try {
      const service = await PoemService.post(req.body);
      const { status, poem, errMsg } = responseInfo.post(service);
      if (errMsg) throw new AppError(status, errMsg, true);
      res.status(status).send(poem);
    } catch (error) {
      next(error);
    }
  },

  /**
   * Handle postMany request to create a new Poems
   * @remarks
   * if some or all data was valid, res = { newPoems: Poem[], inValidPoems: Poem[] } with success status: {@link HttpStatusCode.CREATED}.
   * 
   * if not, res = {@link ERROR_MSG.NOT_VALID} with error {@link HttpStatusCode.NOT_ACCEPTABLE}.
  */   
  async postMany(req: Request, res: Response, next: NextFunction) {
    try {
      const service = await PoemService.postMany(req.body);
      const { status, poems, errMsg } = responseInfo.postMany(service);
      if (errMsg) throw new AppError(status, errMsg, true);
      res.status(status).send(poems);
    } catch (error) {
      next(error);
    }
  },

  /**
   * Handle update request to update a Poem's data
   * 
   * Recieving poem's id in req.params.id, and Poem's updated fields in req.body
   * @remarks
   * if successful, res with success status: {@link HttpStatusCode.ACCEPTED}.
   * 
   * if not, res = {@link ERROR_MSG.NOT_VALID} with error {@link HttpStatusCode.NOT_ACCEPTABLE}.
  */ 
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const service = await PoemService.update(req.params.id, req.body);
      const { status, errMsg } = responseInfo.update(service);
      if (errMsg) throw new AppError(status, errMsg, true);
      res.sendStatus(status);
    } catch (error) {
      next(error);
    }
  },
  /**
   * Handle remove request to remove a Poem's data
   * 
   * Recieving poem's id in req.params.id.
   * @remarks
   * if successful, res with success status: {@link HttpStatusCode.ACCEPTED}.
   * 
   * if not, res = {@link ERROR_MSG.NOT_FOUND} with error {@link HttpStatusCode.NOT_FOUND}.
  */ 
  async remove(req: Request, res: Response, next: NextFunction) {
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

/**
 * returns response info depending on the parameter value.
 */
export const responseInfo = {
  /**
   * evalute PoemController.indexWithPoetName, depending on PoemService.indexWithPoetName result
  */  
  indexWithPoetName(poems: Poem[] | false): { status: number; poems?: Poem[]; errMsg?: string } {
    if (!poems) {
      return {
        status: HttpStatusCode.NOT_FOUND,
        errMsg: ERROR_MSG.NOT_AVAILABLE,
      };
    }
    return { status: HttpStatusCode.OK, poems };
  },
  /**
   * evalute PoemController.indexIntrosWithPoetName, depending on PoemService.indexIntrosWithPoetName result
  */  
  indexIntrosWithPoetName(poems: Poem[] | false): { status: number; poems?: Poem[]; errMsg?: string } {
    if (!poems) {
      return {
        status: HttpStatusCode.NOT_FOUND,
        errMsg: ERROR_MSG.NOT_AVAILABLE,
      };
    }
    return { status: HttpStatusCode.OK, poems };
  },
  /**
   * evalute PoemController.indexOneWithPoet, depending on PoemService.indexOneWithPoet result
  */  
  indexOneWithPoet(poem: Poem | false): { status: number; poem?: Poem; errMsg?: string } {
    if (!poem) {
      return { status: HttpStatusCode.NOT_FOUND, errMsg: ERROR_MSG.NOT_FOUND };
    }
    return { status: HttpStatusCode.OK, poem };
  },
  /**
   * evalute PoemController.post, depending on PoemService.post result
  */  
  post(poem: Poem | false): { status: number; poem?: Poem; errMsg?: string } {
    if (!poem) {
      return {
        status: HttpStatusCode.NOT_ACCEPTABLE,
        errMsg: ERROR_MSG.NOT_VALID,
      };
    }
    return { status: HttpStatusCode.CREATED, poem };
  },
  /**
   * evalute PoemController.postMany, depending on PoemService.postMany result
  */  
  postMany( poems: { newPoems: Poem[]; inValidPoems: Poem[] } | false): {
    status: number;
    poems?: { newPoems: Poem[]; inValidPoems: Poem[] };
    errMsg?: string;
  } {
    if (!poems) {
      return {
        status: HttpStatusCode.NOT_ACCEPTABLE,
        errMsg: ERROR_MSG.NOT_VALID,
      };
    }
    return { status: HttpStatusCode.CREATED, poems };
  },
  /**
   * evalute PoemController.update, depending on PoemService.update result
  */  
  update(poem: number | false): { status: number; errMsg?: string } {
    if (!poem) {
      return {
        status: HttpStatusCode.NOT_ACCEPTABLE,
        errMsg: ERROR_MSG.NOT_VALID,
      };
    }
    return { status: HttpStatusCode.ACCEPTED };
  },
  /**
   * evalute PoemController.remove, depending on PoemService.remove result
  */ 
  remove(poem: number | false): { status: number; errMsg?: string } {
    if (!poem) {
      return { status: HttpStatusCode.NOT_FOUND, errMsg: ERROR_MSG.NOT_FOUND };
    }
    return { status: HttpStatusCode.ACCEPTED };
  },
};
