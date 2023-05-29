import { Router } from 'express';
import { body, param, query } from 'express-validator';
// Controller
import { ProseController } from './prose.controller';
// Types
import { IRoute } from '../../interfaces/route.interface';
import { ERROR_MSG } from '../../interfaces/prose.interface';
// middlewares
import { validate } from '../../middlewares/validate.middleware';
import { setCache } from '../../middlewares/cache.middleware';

export class ProseRoute implements IRoute {
  public router: Router = Router();
  private controller: ProseController = new ProseController();

  constructor() {
    this.initalizeRoutes();
  }

  private initalizeRoutes() {
    this.router.get('/proses', setCache, this.controller.indexWithPoetName);
    this.router.get(
      '/proses/random',
      validate([
        // it doesn't give error when num != number
        query('num').optional().isInt().withMessage(ERROR_MSG.NUM),
      ]),
      this.controller.indexRandomWithPoetName,
    );
    this.router.get(
      '/prose/:id',
      validate([param('id').isUUID().withMessage(ERROR_MSG.NOT_FOUND)]),
      this.controller.indexOneWithPoetName,
    );
    this.router.post(
      '/prose',
      validate([
        body('poet').isUUID().withMessage(ERROR_MSG.POET),

        body('tags')
          .isLength({ min: 4, max: 50 })
          .isString()
          .escape()
          .withMessage(ERROR_MSG.TAGS),

        body('qoute')
          .isLength({ min: 4, max: 400 })
          .isString()
          .withMessage(ERROR_MSG.QOUTE),

        body('reviewed').optional().isBoolean().withMessage(ERROR_MSG.REVIEWED),
      ]),
      this.controller.post,
    );
    this.router.put(
      '/prose/:id',
      validate([
        param('id').isUUID().withMessage(ERROR_MSG.NOT_FOUND),

        body('poet').optional().isUUID().withMessage(ERROR_MSG.POET),

        body('tags')
          .optional()
          .isLength({ min: 4, max: 50 })
          .isString()
          .escape()
          .withMessage(ERROR_MSG.TAGS),

        body('qoute')
          .optional()
          .isLength({ min: 4, max: 400 })
          .isString()
          .withMessage(ERROR_MSG.QOUTE),

        body('reviewed').optional().isBoolean().withMessage(ERROR_MSG.REVIEWED),
      ]),
      this.controller.update,
    );
    this.router.delete(
      '/prose/:id',
      validate([param('id').isUUID().withMessage(ERROR_MSG.NOT_FOUND)]),
      this.controller.remove,
    );
  }
}
