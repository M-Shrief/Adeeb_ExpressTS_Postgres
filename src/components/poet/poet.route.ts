import { Router } from 'express';
import { body, param } from 'express-validator';
// Controller
import { PoetController } from './poet.controller';
// Types
import { IRoute } from '@/interfaces/route.interface';
import { ERROR_MSG } from '@/interfaces/poet.interface';
// middlewares
import { validate } from '@/middlewares/validate.middleware';
import { setCache } from '@/middlewares/cache.middleware';

export class PoetRoute implements IRoute {
  public router: Router = Router();
  private controller: PoetController = new PoetController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/poets', setCache, this.controller.index);
    this.router.get(
      '/poet/:id',
      [
        validate([param('id').isUUID(4).withMessage(ERROR_MSG.NOT_FOUND)]),
        setCache,
      ],
      this.controller.indexOneWithLiterature,
    );
    this.router.post(
      '/poet',
      // validate([
      //   body('name')
      //     .isLength({ min: 4, max: 50 })
      //     .isString()
      //     .escape()
      //     .withMessage(ERROR_MSG.NAME),

      //   body('time_period')
      //     .isLength({ min: 4, max: 50 })
      //     .isString()
      //     .escape()
      //     .withMessage(ERROR_MSG.TIME_PERIOD),

      //   body('bio')
      //     .isLength({ min: 4, max: 300 })
      //     .isString()
      //     .escape()
      //     .withMessage(ERROR_MSG.BIO),

      //   body('reviewed').optional().isBoolean().withMessage(ERROR_MSG.REVIEWED),
      // ]),
      this.controller.post,
    );
    this.router.put(
      '/poet/:id',
      validate([
        param('id').isUUID(4).withMessage(ERROR_MSG.NOT_FOUND),

        // body('name')
        //   .optional()
        //   .isLength({ min: 4, max: 50 })
        //   .isString()
        //   .escape()
        //   .withMessage(ERROR_MSG.NAME),

        // body('time_period')
        //   .optional()
        //   .isLength({ min: 4, max: 50 })
        //   .isString()
        //   .escape()
        //   .withMessage(ERROR_MSG.TIME_PERIOD),

        // body('bio')
        //   .optional()
        //   .isLength({ min: 4, max: 300 })
        //   .isString()
        //   .escape()
        //   .withMessage(ERROR_MSG.BIO),

        // body('reviewed').optional().isBoolean().withMessage(ERROR_MSG.REVIEWED),
      ]),
      this.controller.update,
    );
    this.router.delete(
      '/poet/:id',
      [validate([param('id').isUUID(4).withMessage(ERROR_MSG.NOT_FOUND)])],
      this.controller.remove,
    );
  }
}
