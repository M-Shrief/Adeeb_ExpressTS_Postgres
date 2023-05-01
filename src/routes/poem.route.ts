import { Router } from 'express';
import { body, param } from 'express-validator';
// Controller
import PoemController from '../controllers/poem.controller';
// Types
import { IRoute } from '../interfaces/route.interface';
// middlewares
import validate from '../middlewares/validate.middleware';
import setCache from '../middlewares/cache.middleware';

export default class PoemRoute implements IRoute {
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
      this.controller.indexIntrosWithPoetName
    );
    this.router.get(
      '/poem/:id',
      [
        validate([param('id').isMongoId().withMessage('Poem not found')]),
        setCache,
      ],
      this.controller.indexOneWithPoet
    );
    this.router.post(
      '/poem',
      validate([
        body('intro')
          .notEmpty()
          .isString()
          .isLength({ max: 50 })
          .escape()
          .withMessage('intro should be letters, and max 50 letters length'),

        body('poet').isMongoId().withMessage('Poet not found'),

        body('verses.*')
          .notEmpty()
          .isString()
          .isLength({ max: 50 })
          .escape()
          .withMessage(
            "Verses's first and sec part should be less than 50 letters"
          ),

        body('reviewed')
          .optional()
          .isBoolean()
          .withMessage('reviewed should be true or false'),
      ]),
      this.controller.post
    );
    this.router.put(
      '/poem/:id',
      validate([
        param('id').optional().isMongoId().withMessage('Poem not found'),

        body('intro')
          .notEmpty()
          .isString()
          .isLength({ max: 50 })
          .escape()
          .withMessage('intro should be letters, and max 50 letters length'),

        body('poet').isMongoId().withMessage('Poet not found'),

        body('verses.*')
          .notEmpty()
          .isString()
          .isLength({ max: 50 })
          .escape()
          .withMessage(
            "Verses's first and sec part should be less than 50 letters"
          ),

        body('reviewed')
          .optional()
          .isBoolean()
          .withMessage('reviewed should be true or false'),
      ]),
      this.controller.update
    );

    this.router.delete(
      '/poem/:id',
      validate([
        param('id').optional().isMongoId().withMessage('Poem not found'),
      ]),
      this.controller.remove
    );
  }
}
