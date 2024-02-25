import { NextFunction, Request, Response } from 'express';
// Services
import { ProseService } from './prose.service';
// Types
import { ERROR_MSG, Prose } from './prose.entity';
// Utils
import { AppError } from '../../utils/errorsCenter/appError';
import HttpStatusCode from '../../utils/httpStatusCode';

/**
 * Prose's Controller to handle request.
 */
export const ProseController = {
  /**
   * Handle indexWithPoetName request to get All Proses data with the poet name
   * @remarks
   * if successful, res = {proses: Prose[]} with success status: {@link HttpStatusCode.OK}.
   *
   * if not, res = {@link ERROR_MSG.NOT_AVAILABLE} with error {@link HttpStatusCode.NOT_FOUND}.
   */
  async indexWithPoetName(req: Request, res: Response, next: NextFunction) {
    try {
      const service = await ProseService.getAllWithPoetName();
      const { status, proses, errMsg } =
        responseInfo.indexWithPoetName(service);
      if (errMsg) throw new AppError(status, errMsg, true);
      res.status(status).send(proses);
    } catch (error) {
      next(error);
    }
  },
  /**
   * Handle indexRandomWithPoetName request to get a random length array of Proses with the poet name
   *
   * Recieving num: number in req.query.num
   * @remarks
   * if successful, res = {proses: Prose[]} with success status: {@link HttpStatusCode.OK}.
   *
   * if not, res = {@link ERROR_MSG.NOT_AVAILABLE} with error {@link HttpStatusCode.NOT_FOUND}.
   */
  async indexRandomWithPoetName(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const service = await ProseService.getRandomWithPoetName(
        Number(req.query.num),
      );
      const { status, proses, errMsg } =
        responseInfo.indexRandomWithPoetName(service);
      if (errMsg) throw new AppError(status, errMsg, true);
      res.status(status).send(proses);
    } catch (error) {
      next(error);
    }
  },

  /**
   * Handle IndexOneWithPoetName request to get a specific Prose and the poet name.
   *
   * Recieving prose's id in req.params.id
   * @remarks
   * if successful, res = {prose: Prose} with success status: {@link HttpStatusCode.OK}.
   *
   * if not, res = {@link ERROR_MSG.NOT_FOUND} with error {@link HttpStatusCode.NOT_FOUND}.
   */
  async indexOneWithPoetName(req: Request, res: Response, next: NextFunction) {
    try {
      const service = await ProseService.getOneWithPoetName(req.params.id);
      const { status, prose, errMsg } =
        responseInfo.indexOneWithPoetName(service);
      if (errMsg) throw new AppError(status, errMsg, true);
      res.status(status).send(prose);
    } catch (error) {
      next(error);
    }
  },

  /**
   * Handle post request to create a new Prose
   * @remarks
   * if successful, res = Prose with success status: {@link HttpStatusCode.CREATED}.
   *
   * if not, res = {@link ERROR_MSG.NOT_VALID} with error {@link HttpStatusCode.NOT_ACCEPTABLE}.
   */
  async post(req: Request, res: Response, next: NextFunction) {
    try {
      const service = await ProseService.post(req.body);
      const { status, prose, errMsg } = responseInfo.post(service);
      if (errMsg) throw new AppError(status, errMsg, true);
      res.status(status).send(prose);
    } catch (errors) {
      next(errors);
    }
  },
  /**
   * Handle postMany request to create a new Proses
   * @remarks
   * if some or all data was valid, res = { newProses: Prose[], inValidProses: Prose[] } with success status: {@link HttpStatusCode.CREATED}.
   *
   * if not, res = {@link ERROR_MSG.NOT_VALID} with error {@link HttpStatusCode.NOT_ACCEPTABLE}.
   */
  async postMany(req: Request, res: Response, next: NextFunction) {
    try {
      const service = await ProseService.postMany(req.body);
      const { status, proses, errMsg } = responseInfo.postMany(service);
      if (errMsg) throw new AppError(status, errMsg, true);
      res.status(status).send(proses);
    } catch (errors) {
      next(errors);
    }
  },
  /**
   * Handle update request to update a Prose's data
   *
   * Recieving prose's id in req.params.id, and Prose's updated fields in req.body
   * @remarks
   * if successful, res with success status: {@link HttpStatusCode.ACCEPTED}.
   *
   * if not, res = {@link ERROR_MSG.NOT_VALID} with error {@link HttpStatusCode.NOT_ACCEPTABLE}.
   */
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const service = await ProseService.update(req.params.id, req.body);
      const { status, errMsg } = responseInfo.update(service);
      if (errMsg) throw new AppError(status, errMsg, true);
      res.sendStatus(status);
    } catch (errors) {
      next(errors);
    }
  },
  /**
   * Handle remove request to remove a Prose's data
   *
   * Recieving prose's id in req.params.id
   * @remarks
   * if successful, res with success status: {@link HttpStatusCode.ACCEPTED}.
   *
   * if not, res = {@link ERROR_MSG.NOT_FOUND} with error {@link HttpStatusCode.NOT_FOUND}.
   */
  async remove(req: Request, res: Response, next: NextFunction) {
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

/**
 * returns response info depending on the parameter value.
 */
export const responseInfo = {
  /**
   * evalute ProseController.indexWithPoetName, depending on ProseService.indexWithPoetName result
   */
  indexWithPoetName(proses: Prose[] | false): {
    status: number;
    proses?: Prose[];
    errMsg?: string;
  } {
    if (!proses) {
      return {
        status: HttpStatusCode.NOT_FOUND,
        errMsg: ERROR_MSG.NOT_AVAILABLE,
      };
    }
    return { status: HttpStatusCode.OK, proses };
  },
  /**
   * evalute ProseController.indexRandomWithPoetName, depending on ProseService.indexRandomWithPoetName result
   */
  indexRandomWithPoetName(proses: Prose[] | false): {
    status: number;
    proses?: Prose[];
    errMsg?: string;
  } {
    if (!proses) {
      return {
        status: HttpStatusCode.NOT_FOUND,
        errMsg: ERROR_MSG.NOT_AVAILABLE,
      };
    }
    return { status: HttpStatusCode.OK, proses };
  },
  /**
   * evalute ProseController.indexOneWithPoetName, depending on ProseService.indexOneWithPoetName result
   */
  indexOneWithPoetName(prose: Prose | false): {
    status: number;
    prose?: Prose;
    errMsg?: string;
  } {
    if (!prose) {
      return { status: HttpStatusCode.NOT_FOUND, errMsg: ERROR_MSG.NOT_FOUND };
    }
    return { status: HttpStatusCode.OK, prose };
  },
  /**
   * evalute ProseController.post, depending on ProseService.post result
   */
  post(prose: Prose | false): {
    status: number;
    prose?: Prose;
    errMsg?: string;
  } {
    if (!prose) {
      return {
        status: HttpStatusCode.NOT_ACCEPTABLE,
        errMsg: ERROR_MSG.NOT_VALID,
      };
    }
    return { status: HttpStatusCode.CREATED, prose };
  },
  /**
   * evalute ProseController.postMany, depending on ProseService.postMany result
   */
  postMany(proses: { newProses: Prose[]; inValidProses: Prose[] } | false): {
    status: number;
    proses?: { newProses: Prose[]; inValidProses: Prose[] };
    errMsg?: string;
  } {
    if (!proses) {
      return {
        status: HttpStatusCode.NOT_ACCEPTABLE,
        errMsg: ERROR_MSG.NOT_VALID,
      };
    }
    return { status: HttpStatusCode.CREATED, proses };
  },
  /**
   * evalute ProseController.update, depending on ProseService.update result
   */
  update(prose: number | false): { status: number; errMsg?: string } {
    if (!prose) {
      return {
        status: HttpStatusCode.NOT_ACCEPTABLE,
        errMsg: ERROR_MSG.NOT_VALID,
      };
    }
    return { status: HttpStatusCode.ACCEPTED };
  },
  /**
   * evalute ProseController.remove, depending on ProseService.remove result
   */
  remove(prose: number | false): { status: number; errMsg?: string } {
    if (!prose) {
      return { status: HttpStatusCode.NOT_FOUND, errMsg: ERROR_MSG.NOT_FOUND };
    }
    return { status: HttpStatusCode.ACCEPTED };
  },
};
