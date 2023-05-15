import { Router } from 'express';
import { body, param } from 'express-validator';
// Controller
import { PoetController } from './poet.controller';
// Types
import { IRoute } from '../../interfaces/route.interface';
// middlewares
import { validate } from '../../middlewares/validate.middleware';
import { setCache } from '../../middlewares/cache.middleware';

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
        validate([param('id').isMongoId().withMessage("Poet's not found")]),
        setCache,
      ],
      this.controller.indexOneWithLiterature,
    );
    this.router.post(
      '/poet',
      // removed isEmpty(), to responds with the right message
      validate([
        body('name')
          .isLength({ min: 4, max: 50 })
          .isString()
          .escape()
          .withMessage('name should be letters, and max 50 letters length'),

        body('time_period')
          .isLength({ min: 4, max: 50 })
          .isString()
          .escape()
          .withMessage(
            'time_period should be letters, and max 50 letters length',
          ),

        body('bio')
          .isLength({ min: 4, max: 300 })
          .isString()
          .escape()
          .withMessage('bio should be letters, and max 300 letters length'),

        body('reviewed')
          .optional()
          .isBoolean()
          .withMessage('reviewed should be true or false'),
      ]),
      this.controller.post,
    );
    this.router.put(
      '/poet/:id',
      validate([
        param('id').isMongoId().withMessage('Poet not Found'),

        body('name')
          .optional()
          .isLength({ min: 4, max: 50 })
          .isString()
          .escape()
          .withMessage('name should be letters, and max 50 letters length'),

        body('time_period')
          .optional()
          .isLength({ min: 4, max: 50 })
          .isString()
          .escape()
          .withMessage(
            'time_period should be letters, and max 50 letters length',
          ),

        body('bio')
          .optional()
          .isLength({ min: 4, max: 300 })
          .isString()
          .escape()
          .withMessage('bio should be letters, and max 300 letters length'),

        body('reviewed')
          .optional()
          .isBoolean()
          .withMessage('reviewed should be true or false'),
      ]),
      this.controller.update,
    );
    this.router.delete(
      '/poet/:id',
      validate([param('id').isMongoId().withMessage('Poet not Found')]),
      this.controller.remove,
    );
  }
}
