import { NextFunction, Request, Response } from 'express';
// Services
import { ChosenVerseService } from './chosenVerse.service';
// Types
import { ChosenVerse, ERROR_MSG } from './chosenVerse.entity';
// Utils
import { AppError } from '../../utils/errors';
import HttpStatusCode from '../../utils/httpStatusCode';

/**
 * ChosenVerse's Controller to handle request.
 */
export const ChosenVerseController = {
  /**
   * Handle indexWithPoetName request to get All ChosenVerses data with the poet name
   * @remarks
   * if successful, res = {chosenVerse: ChosenVerse[]} with success status: {@link HttpStatusCode.OK}.
   *
   * if not, res = {@link ERROR_MSG.NOT_AVAILABLE} with error {@link HttpStatusCode.NOT_FOUND}.
   */
  async indexWithPoetName(req: Request, res: Response, next: NextFunction) {
    try {
      const service = await ChosenVerseService.getAllWithPoetName();
      const { status, chosenVerses, errMsg } =
        responseInfo.indexWithPoetName(service);
      if (errMsg) throw new AppError(status, errMsg, true);
      res.status(status).send(chosenVerses);
    } catch (error) {
      next(error);
    }
  },
  /**
   * Handle indexRandomWithPoetName request to get a random length array of ChosenVerses with the poet name
   *
   * Recieving num: number in req.query.num
   * @remarks
   * if successful, res = {chosenVerse: ChosenVerse[]} with success status: {@link HttpStatusCode.OK}.
   *
   * if not, res = {@link ERROR_MSG.NOT_AVAILABLE} with error {@link HttpStatusCode.NOT_FOUND}.
   */
  async indexRandomWithPoetName(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const service = await ChosenVerseService.getRandomWithPoetName(
        Number(req.query.num),
      );
      const { status, chosenVerses, errMsg } =
        responseInfo.indexRandomWithPoetName(service);
      if (errMsg) throw new AppError(status, errMsg, true);
      res.status(status).send(chosenVerses);
    } catch (error) {
      next(error);
    }
  },
  /**
   * Handle IndexOneWithPoetName request to get a specific ChosenVerse and the poet name.
   *
   * Recieving chosenVerse's id in req.params.id
   * @remarks
   * if successful, res = {chosenVerse: ChosenVerse} with success status: {@link HttpStatusCode.OK}.
   *
   * if not, res = {@link ERROR_MSG.NOT_FOUND} with error {@link HttpStatusCode.NOT_FOUND}.
   */
  async indexOneWithPoetName(req: Request, res: Response, next: NextFunction) {
    try {
      const service = await ChosenVerseService.getOneWithPoetName(
        req.params.id,
      );
      const { status, chosenVerse, errMsg } =
        responseInfo.indexOneWithPoetName(service);
      if (errMsg) throw new AppError(status, errMsg, true);
      res.status(status).send(chosenVerse);
    } catch (error) {
      next(error);
    }
  },
  /**
   * Handle post request to create a new ChosenVerse
   * @remarks
   * if successful, res = ChosenVerse with success status: {@link HttpStatusCode.CREATED}.
   *
   * if not, res = {@link ERROR_MSG.NOT_VALID} with error {@link HttpStatusCode.NOT_ACCEPTABLE}.
   */
  async post(req: Request, res: Response, next: NextFunction) {
    try {
      const service = await ChosenVerseService.post(req.body);
      const { status, chosenVerse, errMsg } = responseInfo.post(service);
      if (errMsg) throw new AppError(status, errMsg, true);
      res.status(status).send(chosenVerse);
    } catch (error) {
      next(error);
    }
  },
  /**
   * Handle postMany request to create a new ChosenVerses
   * @remarks
   * if some or all data was valid, res = { newChosenVerses: ChosenVerse[], inValidChosenVerses: ChosenVerse[] } with success status: {@link HttpStatusCode.CREATED}.
   *
   * if not, res = {@link ERROR_MSG.NOT_VALID} with error {@link HttpStatusCode.NOT_ACCEPTABLE}.
   */
  postMany: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const service = await ChosenVerseService.postMany(req.body);
      const { status, chosenVerses, errMsg } = responseInfo.postMany(service);
      if (errMsg) throw new AppError(status, errMsg, true);
      res.status(status).send(chosenVerses);
    } catch (error) {
      next(error);
    }
  },
  /**
   * Handle update request to update a ChosenVerse's data
   *
   * Recieving chosenVerse's id in req.params.id, and ChosenVerse's updated fields in req.body
   * @remarks
   * if successful, res with success status: {@link HttpStatusCode.ACCEPTED}.
   *
   * if not, res = {@link ERROR_MSG.NOT_VALID} with error {@link HttpStatusCode.NOT_ACCEPTABLE}.
   */
  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const service = await ChosenVerseService.update(req.params.id, req.body);
      const { status, errMsg } = responseInfo.update(service);
      if (errMsg) throw new AppError(status, errMsg, true);
      res.sendStatus(status);
    } catch (error) {
      next(error);
    }
  },
  /**
   * Handle remove request to remove a ChosenVerse's data
   *
   * Recieving ChosenVerse's id in req.params.id
   * @remarks
   * if successful, res with success status: {@link HttpStatusCode.ACCEPTED}.
   *
   * if not, res = {@link ERROR_MSG.NOT_FOUND} with error {@link HttpStatusCode.NOT_FOUND}.
   */
  remove: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const service = await ChosenVerseService.remove(req.params.id);
      const { status, errMsg } = responseInfo.remove(service);
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
   * evalute ChosenVerseController.indexWithPoetName, depending on ChosenVerseService.indexWithPoetName result
   */
  indexWithPoetName(chosenVerses: ChosenVerse[] | false): {
    status: number;
    chosenVerses?: ChosenVerse[];
    errMsg?: string;
  } {
    if (!chosenVerses) {
      return {
        status: HttpStatusCode.NOT_FOUND,
        errMsg: ERROR_MSG.NOT_AVAILABLE,
      };
    }
    return { status: HttpStatusCode.OK, chosenVerses };
  },
  /**
   * evalute ChosenVerseController.indexRandomWithPoetName, depending on ChosenVerseService.indexRandomWithPoetName result
   */
  indexRandomWithPoetName(chosenVerses: ChosenVerse[] | false): {
    status: number;
    chosenVerses?: ChosenVerse[];
    errMsg?: string;
  } {
    if (!chosenVerses) {
      return {
        status: HttpStatusCode.NOT_FOUND,
        errMsg: ERROR_MSG.NOT_AVAILABLE,
      };
    }
    return { status: HttpStatusCode.OK, chosenVerses };
  },
  /**
   * evalute ChosenVerseController.indexOneWithPoetName, depending on ChosenVerseService.indexOneWithPoetName result
   */
  indexOneWithPoetName(chosenVerse: ChosenVerse | false): {
    status: number;
    chosenVerse?: ChosenVerse;
    errMsg?: string;
  } {
    if (!chosenVerse) {
      return { status: HttpStatusCode.NOT_FOUND, errMsg: ERROR_MSG.NOT_FOUND };
    }
    return { status: HttpStatusCode.OK, chosenVerse };
  },
  /**
   * evalute ChosenVerseController.post, depending on ChosenVerseService.post result
   */
  post(chosenVerse: ChosenVerse | false): {
    status: number;
    chosenVerse?: ChosenVerse;
    errMsg?: string;
  } {
    if (!chosenVerse) {
      return {
        status: HttpStatusCode.NOT_ACCEPTABLE,
        errMsg: ERROR_MSG.NOT_VALID,
      };
    }
    return { status: HttpStatusCode.CREATED, chosenVerse };
  },
  /**
   * evalute ChosenVerseController.postMany, depending on ChosenVerseService.postMany result
   */
  postMany(
    chosenVerses:
      | { newChosenVerses: ChosenVerse[]; inValidChosenVerses: ChosenVerse[] }
      | false,
  ): {
    status: number;
    chosenVerses?: {
      newChosenVerses: ChosenVerse[];
      inValidChosenVerses: ChosenVerse[];
    };
    errMsg?: string;
  } {
    if (!chosenVerses) {
      return {
        status: HttpStatusCode.NOT_ACCEPTABLE,
        errMsg: ERROR_MSG.NOT_VALID,
      };
    }
    return { status: HttpStatusCode.CREATED, chosenVerses };
  },
  /**
   * evalute ChosenVerseController.update, depending on ChosenVerseService.update result
   */
  update(chosenVerse: number | false): { status: number; errMsg?: string } {
    if (!chosenVerse) {
      return {
        status: HttpStatusCode.NOT_ACCEPTABLE,
        errMsg: ERROR_MSG.NOT_VALID,
      };
    }
    return { status: HttpStatusCode.ACCEPTED };
  },
  /**
   * evalute ChosenVerseController.remove, depending on ChosenVerseService.remove result
   */
  remove(chosenVerse: number | false): { status: number; errMsg?: string } {
    if (!chosenVerse) {
      return { status: HttpStatusCode.NOT_FOUND, errMsg: ERROR_MSG.NOT_FOUND };
    }
    return { status: HttpStatusCode.ACCEPTED };
  },
};
