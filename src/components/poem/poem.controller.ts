import { NextFunction, Request, Response } from 'express';
// Services
import { PoemService } from './poem.service';
// Types
import { PoemType } from '../../interfaces/poem.interface';
// Utils
import { logger } from '../../utils/logger';
import { AppError } from '../../utils/errorsCenter/appError';
import HttpStatusCode from '../../utils/httpStatusCode';

export class PoemController {
  private poemService = new PoemService();

  public indexWithPoetName = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const poems = await this.poemService.getAllWithPoetName();

      if (!poems)
        throw new AppError(
          HttpStatusCode.NOT_FOUND,
          'No poems available',
          true,
        );
      res.status(HttpStatusCode.OK).send(poems);
    } catch (error) {
      next(error);
    }
  };

  public indexIntrosWithPoetName = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const poems = await this.poemService.getAllIntrosWithPoetName();

      if (!poems)
        throw new AppError(
          HttpStatusCode.NOT_FOUND,
          'No poems available',
          true,
        );
      res.status(HttpStatusCode.OK).send(poems);
    } catch (error) {
      next(error);
    }
  };

  public indexOneWithPoet = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const poem = await this.poemService.getOneWithPoet(req.params.id);
      if (!poem)
        throw new AppError(
          HttpStatusCode.NOT_FOUND,
          'Poem was not found',
          true,
        );
      res.status(HttpStatusCode.OK).send(poem);
    } catch (error) {
      next(error);
    }
  };

  public post = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const poem = await this.poemService.post(req.body as PoemType);
      if (!poem)
        throw new AppError(
          HttpStatusCode.NOT_ACCEPTABLE,
          'Data for poem is not valid',
          true,
        );
      res.status(HttpStatusCode.CREATED).send(poem);
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const poem = await this.poemService.update(
        req.params.id,
        req.body as PoemType,
      );
      if (!poem)
        throw new AppError(
          HttpStatusCode.NOT_ACCEPTABLE,
          'Data for poem is not valid',
          true,
        );
      res.status(HttpStatusCode.ACCEPTED).send(poem);
    } catch (error) {
      next(error);
    }
  };

  public remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const poem = await this.poemService.remove(req.params.id);
      if (!poem)
        throw new AppError(
          HttpStatusCode.NOT_FOUND,
          'Poem was not found',
          true,
        );
      res.status(HttpStatusCode.ACCEPTED).send(poem);
    } catch (error) {
      next(error);
    }
  };
}
