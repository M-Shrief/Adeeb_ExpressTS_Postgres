import { Router } from 'express';
import { body, param } from 'express-validator';
// Controller
import { PoemController } from './poem.controller';
// Types
import { IRoute } from '@/interfaces/route.interface';
import { ERROR_MSG } from '@/interfaces/poem.interface';
// middlewares
import { validate } from '@/middlewares/validate.middleware';
import { setCache } from '@/middlewares/cache.middleware';

export class PoemRoute implements IRoute {
  public router: Router = Router();
  private controller: PoemController = new PoemController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/poems', setCache, this.controller.indexWithPoetName);
    this.router.get(
      '/poems_intros',
      setCache,
      this.controller.indexIntrosWithPoetName,
    );
    this.router.get(
      '/poem/:id',
      [
        validate([param('id').isUUID(4).withMessage(ERROR_MSG.NOT_FOUND)]),
        setCache,
      ],
      this.controller.indexOneWithPoet,
    );
    this.router.post(
      '/poem',
      validate([
        body('intro')
          .isLength({ min: 4, max: 50 })
          .isString()
          .escape()
          .withMessage(ERROR_MSG.INTRO),

        body('poet').isUUID(4).withMessage(ERROR_MSG.POET),

        body('verses.*.first')
          .isLength({ min: 4, max: 50 })
          .isString()
          .escape()
          .withMessage(ERROR_MSG.VERSES),

        body('verses.*.sec')
          .isLength({ min: 4, max: 50 })
          .isString()
          .escape()
          .withMessage(ERROR_MSG.VERSES),

        body('reviewed').optional().isBoolean().withMessage(ERROR_MSG.REVIEWED),
      ]),
      this.controller.post,
    );
    this.router.put(
      '/poem/:id',
      validate([
        param('id').isUUID(4).withMessage(ERROR_MSG.NOT_FOUND),

        body('intro')
          .optional()
          .isLength({ min: 4, max: 50 })
          .isString()
          .escape()
          .withMessage(ERROR_MSG.INTRO),

        body('poet').optional().isUUID(4).withMessage(ERROR_MSG.NOT_FOUND),

        body('verses.*.first')
          .optional()
          .isLength({ min: 4, max: 50 })
          .isString()
          .escape()
          .withMessage(ERROR_MSG.VERSES),

        body('verses.*.sec')
          .optional()
          .isLength({ min: 4, max: 50 })
          .isString()
          .escape()
          .withMessage(ERROR_MSG.VERSES),

        body('reviewed').optional().isBoolean().withMessage(ERROR_MSG.REVIEWED),
      ]),
      this.controller.update,
    );

    this.router.delete(
      '/poem/:id',
      validate([
        param('id').optional().isUUID(4).withMessage(ERROR_MSG.NOT_FOUND),
      ]),
      this.controller.remove,
    );
  }
}
