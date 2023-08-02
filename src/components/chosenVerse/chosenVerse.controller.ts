import { NextFunction, Request, Response } from 'express';
// Services
import { ChosenVerseService } from './chosenVerse.service';
// Types
import { ERROR_MSG } from './chosenVerse.entity';
// Utils
import { AppError } from '../../utils/errorsCenter/appError';
import HttpStatusCode from '../../utils/httpStatusCode';

export class ChosenVerseController {
  private chosenVerseService = new ChosenVerseService();

  public indexWithPoetName = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const chosenVerses = await this.chosenVerseService.getAllWithPoetName();
      if (!chosenVerses)
        throw new AppError(
          HttpStatusCode.NOT_FOUND,
          ERROR_MSG.NOT_AVAILABLE,
          true,
        );
      res.status(HttpStatusCode.OK).send(chosenVerses);
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
      const chosenVerses = await this.chosenVerseService.getRandomWithPoetName(
        Number(req.query.num),
      );
      if (!chosenVerses)
        throw new AppError(
          HttpStatusCode.NOT_FOUND,
          ERROR_MSG.NOT_AVAILABLE,
          true,
        );
      res.status(HttpStatusCode.OK).send(chosenVerses);
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
      const chosenVerse = await this.chosenVerseService.getOneWithPoetName(
        req.params.id,
      );
      if (!chosenVerse)
        throw new AppError(HttpStatusCode.NOT_FOUND, ERROR_MSG.NOT_FOUND, true);
      res.status(HttpStatusCode.OK).send(chosenVerse);
    } catch (error) {
      next(error);
    }
  };

  public post = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const chosenVerse = await this.chosenVerseService.post(req.body);
      if (!chosenVerse)
        throw new AppError(
          HttpStatusCode.NOT_ACCEPTABLE,
          ERROR_MSG.NOT_VALID,
          true,
        );
      res.status(HttpStatusCode.CREATED).send(chosenVerse);
    } catch (error) {
      next(error);
    }
  };

  public postMany = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const chosenVerses = await this.chosenVerseService.postMany(req.body);
      if (!chosenVerses)
        throw new AppError(
          HttpStatusCode.NOT_ACCEPTABLE,
          ERROR_MSG.NOT_VALID,
          true,
        );
      res.status(HttpStatusCode.CREATED).send(chosenVerses);
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const chosenVerse = await this.chosenVerseService.update(
        req.params.id,
        req.body,
      );
      if (!chosenVerse)
        throw new AppError(
          HttpStatusCode.NOT_ACCEPTABLE,
          ERROR_MSG.NOT_VALID,
          true,
        );
      res.sendStatus(HttpStatusCode.ACCEPTED).send(chosenVerse);
    } catch (error) {
      next(error);
    }
  };

  public remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const chosenVerse = await this.chosenVerseService.remove(req.params.id);
      if (!chosenVerse)
        throw new AppError(
          HttpStatusCode.NOT_FOUND,
          ERROR_MSG.NOT_AVAILABLE,
          true,
        );
      res.status(HttpStatusCode.ACCEPTED).send('Deleted Successfully');
    } catch (errors) {
      next(errors);
    }
  };
}
