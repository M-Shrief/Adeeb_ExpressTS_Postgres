import { Router } from 'express';
import { body, query, param } from 'express-validator';
// Controller
import { ChosenVerseController } from './chosenVerse.controller';
// Types
import { IRoute } from '../../interfaces/route.interface';
import { ERROR_MSG } from './chosenVerse.entity';
// middlewares
import { validate } from '../../middlewares/validate.middleware';
import { setCache } from '../../middlewares/cache.middleware';

export class ChosenVerseRoute implements IRoute {
  public router: Router = Router();
  private controller: ChosenVerseController = new ChosenVerseController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      '/chosenverses',
      setCache,
      this.controller.indexWithPoetName,
    );
    this.router.get(
      '/chosenverses/random',
      validate([query('num').optional().isInt().withMessage(ERROR_MSG.NUM)]),
      this.controller.indexRandomWithPoetName,
    );
    this.router.get(
      '/chosenverse/:id',
      validate([param('id').isUUID().withMessage(ERROR_MSG.NOT_FOUND)]),
      this.controller.indexOneWithPoetName,
    );
    this.router.post(
      '/chosenverse',
      validate([
        body('poet').isUUID().withMessage(ERROR_MSG.POET),
        body('poem').isUUID().withMessage(ERROR_MSG.POEM),
        body('tags').isString().escape().withMessage(ERROR_MSG.TAGS),
        body('verses').isArray().withMessage(ERROR_MSG.VERSES),
        body('verses.*.first')
          .isString()
          .escape()
          .withMessage(ERROR_MSG.VERSES),
        body('verses.*.sec').isString().escape().withMessage(ERROR_MSG.VERSES),
        body('reviewed').optional().isBoolean().withMessage(ERROR_MSG.REVIEWED),
      ]),
      this.controller.post,
    );

    this.router.post('/chosenverses', this.controller.postMany);

    this.router.put(
      '/chosenverse/:id',
      validate([
        param('id').isUUID().withMessage(ERROR_MSG.NOT_FOUND),

        body('poet').optional().isUUID(4).withMessage(ERROR_MSG.POET),

        body('poem').optional().isUUID(4).withMessage(ERROR_MSG.POEM),

        body('tags').optional().isString().escape().withMessage(ERROR_MSG.TAGS),
        body('verses').optional().isArray().withMessage(ERROR_MSG.VERSES),
        body('verses.*.first')
          .optional()
          .isString()
          .escape()
          .withMessage(ERROR_MSG.VERSES),

        body('verses.*.sec')
          .optional()
          .isString()
          .escape()
          .withMessage(ERROR_MSG.VERSES),

        body('reviewed').optional().isBoolean().withMessage(ERROR_MSG.REVIEWED),
      ]),
      this.controller.update,
    );
    this.router.delete(
      '/chosenverse/:id',
      validate([param('id').isUUID().withMessage(ERROR_MSG.NOT_FOUND)]),
      this.controller.remove,
    );
  }
}
