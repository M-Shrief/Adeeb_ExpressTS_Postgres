import { Router } from 'express';
import { body, param, query } from 'express-validator';
// Controller
import ProseController from '../controllers/prose.controller';
// Types
import { IRoute } from '../interfaces/route.interface';
// middlewares
import validate from '../middlewares/validate.middleware';
import setCache from '../middlewares/cache.middleware';

export default class ProseRoute implements IRoute {
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
        query('num').optional().isInt().withMessage('Accepts numbers only'),
      ]),
      this.controller.indexRandomWithPoetName
    );
    this.router.get(
      '/prose/:id',
      validate([param('id').isMongoId().withMessage('prose not found')]),
      this.controller.indexOneWithPoetName
    );
    this.router.post(
      '/prose',
      validate([
        body('poet').isMongoId().withMessage('poet not found'),

        body('tags')
          .notEmpty()
          .isString()
          .isLength({ max: 50 })
          .escape()
          .withMessage('tags should be letters, and max 50 letters length'),

        body('qoute')
          .notEmpty()
          .isString()
          .isLength({ max: 400 })
          .withMessage('qoute should be letters, and max 400 letters length'),

        body('reviewed')
          .optional()
          .isBoolean()
          .withMessage('reviewed must be true or false'),
      ]),
      this.controller.post
    );
    this.router.put(
      '/prose/:id',
      validate([
        param('id').isMongoId().withMessage('prose not found'),

        body('poet').isMongoId().withMessage('poet not found'),

        body('tags')
          .notEmpty()
          .isString()
          .isLength({ max: 50 })
          .escape()
          .withMessage('tags should be letters, and max 50 letters length'),

        body('qoute')
          .notEmpty()
          .isString()
          .isLength({ max: 400 })
          .withMessage('qoute should be letters, and max 400 letters length'),

        body('reviewed')
          .optional()
          .isBoolean()
          .withMessage('reviewed must be true or false'),
      ]),
      this.controller.update
    );
    this.router.delete(
      '/prose/:id',
      validate([param('id').isMongoId().withMessage('prose not found')]),
      this.controller.remove
    );
  }
}
