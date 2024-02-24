import { NextFunction, Request, Response } from 'express';
// Services
import { PoetService } from './poet.service';
// Types
import { ERROR_MSG, Poet } from './poet.entity';
// Utils
import { AppError } from '../../utils/errorsCenter/appError';
import HttpStatusCode from '../../utils/httpStatusCode';

/**
 * Poet's Controller to handle request.
 */
export const PoetController = {
  
  /**
   * Handle Index request to get All Poets data
   * @remarks
   * if successful, res = {poets: Poet[]} with success status: {@link HttpStatusCode.OK}.
   * 
   * if not, res = {@link ERROR_MSG.NOT_AVAILABLE} with error {@link HttpStatusCode.NOT_FOUND}.
  */ 
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const service = await PoetService.getAll();
      const { status, poets, errMsg } = responseInfo.index(service);
      if (errMsg) {
        throw new AppError(status, errMsg, true);
      }
      res.status(status).send(poets);
    } catch (errors) {
      next(errors);
    }
  },

  /**
   * Handle IndexOneWithLiterature request to get a specific Poet data.
   *
   * Recieving poet's id in req.params.id
   * @remarks
   * if successful, res = {poet: Poet} with success status: {@link HttpStatusCode.OK}.
   * 
   * if not, res = {@link ERROR_MSG.NOT_FOUND} with error {@link HttpStatusCode.NOT_FOUND}.
  */ 
  async indexOneWithLiterature(req: Request, res: Response, next: NextFunction) {
    try {
      const service = await PoetService.getOneWithLiterature(req.params.id);
      const { status, poet, errMsg } =
        responseInfo.indexOneWithLiterature(service);
      if (errMsg) {
        throw new AppError(status, errMsg, true);
      }
      res.status(status).send(poet);
    } catch (err) {
      next(err);
    }
  },
  
  /**
   * Handle post request to create a new Poet
   * @remarks
   * if successful, res = Poet with success status: {@link HttpStatusCode.CREATED}.
   * 
   * if not, res = {@link ERROR_MSG.NOT_VALID} with error {@link HttpStatusCode.NOT_ACCEPTABLE}.
  */ 
  async post(req: Request, res: Response, next: NextFunction) {
    try {
      const service = await PoetService.post(req.body);
      const { status, poet, errMsg } = responseInfo.post(service);
      if (errMsg) throw new AppError(status, errMsg, true);

      res.status(status).send(poet);
    } catch (errors) {
      next(errors);
    }
  },

  /**
   * Handle postMany request to create a new Poets
   * @remarks
   * if some or all data was valid, res = { newPoets: Poet[], inValidPoets: Poet[] } with success status: {@link HttpStatusCode.CREATED}.
   * 
   * if not, res = {@link ERROR_MSG.NOT_VALID} with error {@link HttpStatusCode.NOT_ACCEPTABLE}.
  */   
  async postMany(req: Request, res: Response, next: NextFunction) {
    try {
      const service = await PoetService.postMany(req.body);
      const { status, poets, errMsg } = responseInfo.postMany(service);
      if (errMsg) {
        throw new AppError(status, errMsg, true);
      }
      res.status(status).send(poets);
    } catch (errors) {
      next(errors);
    }
  },

  /**
   * Handle update request to update a Poet's data
   * 
   * Recieving poet's id in req.params.id, and Poet's updated field in req.body
   * @remarks
   * if successful, res with success status: {@link HttpStatusCode.ACCEPTED}.
   * 
   * if not, res = {@link ERROR_MSG.NOT_VALID} with error {@link HttpStatusCode.NOT_ACCEPTABLE}.
  */ 
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const service = await PoetService.update(req.params.id, req.body);
      const { status, errMsg } = responseInfo.update(service);
      if (errMsg) {
        throw new AppError(status, errMsg, true);
      }
      res.sendStatus(status);
    } catch (errors) {
      next(errors);
    }
  },
  /**
   * Handle remove request to remove a Poet's data
   * 
   * Recieving poet's id in req.params.id.
   * @remarks
   * if successful, res with success status: {@link HttpStatusCode.ACCEPTED}.
   * 
   * if not, res = {@link ERROR_MSG.NOT_FOUND} with error {@link HttpStatusCode.NOT_FOUND}.
  */ 
  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const service = await PoetService.remove(req.params.id);
      const { status, errMsg } = responseInfo.remove(service);
      if (errMsg) throw new AppError(status, errMsg, true);
      res.sendStatus(HttpStatusCode.ACCEPTED);
    } catch (errors) {
      next(errors);
    }
  },
};

/**
 * returns response info depending on the parameter value.
 */
export const responseInfo = {

  /**
   * evalute PoetController.index, depending on PoetService.index result
  */  
  index(poets: Poet[] | false) : { status: number; poets?: Poet[]; errMsg?: string } {
    if (!poets) {
      return {
        status: HttpStatusCode.NOT_FOUND,
        errMsg: ERROR_MSG.NOT_AVAILABLE,
      };
    }
    return { status: HttpStatusCode.OK, poets };
  },

  /**
   * evalute PoetController.indexOneWithLiterature, depending on PoetService.indexOneWithLiterature result
  */   
  indexOneWithLiterature(poet: Poet | false): { status: number; poet?: Poet; errMsg?: string } {
    if (!poet) {
      return { status: HttpStatusCode.NOT_FOUND, errMsg: ERROR_MSG.NOT_FOUND };
    }
    return { status: HttpStatusCode.OK, poet };
  },

  /**
   * evalute PoetController.post, depending on PoetService.post result
  */   
  post(poet: Poet | false) : { status: number; poet?: Poet; errMsg?: string } {
    if (!poet) {
      return {
        status: HttpStatusCode.NOT_ACCEPTABLE,
        errMsg: ERROR_MSG.NOT_VALID,
      };
    }
    return { status: HttpStatusCode.CREATED, poet };
  },

  /**
   * evalute PoetController.postMany, depending on PoetService.postMany result
  */  
  postMany(poets: { newPoets: Poet[]; inValidPoets: Poet[] } | false): {
    status: number;
    poets?: { newPoets: Poet[]; inValidPoets: Poet[] };
    errMsg?: string;
  } {
    if (!poets) {
      return {
        status: HttpStatusCode.NOT_ACCEPTABLE,
        errMsg: ERROR_MSG.NOT_VALID,
      };
    }
    return { status: HttpStatusCode.CREATED, poets };
  },

  /**
   * evalute PoetController.update, depending on PoetService.update result
  */    
  update(poet: number | false): { status: number; errMsg?: string } {
    if (!poet) {
      return {
        status: HttpStatusCode.NOT_ACCEPTABLE,
        errMsg: ERROR_MSG.NOT_VALID,
      };
    }
    return { status: HttpStatusCode.ACCEPTED };
  },

  /**
   * evalute PoetController.remove, depending on PoetService.remove result
  */  
  remove(poet: number | false): { status: number; errMsg?: string } {
    if (!poet) {
      return { status: HttpStatusCode.NOT_FOUND, errMsg: ERROR_MSG.NOT_FOUND };
    }
    return { status: HttpStatusCode.ACCEPTED };
  },
};
