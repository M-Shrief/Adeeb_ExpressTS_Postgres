import { Router } from 'express';
import { body, query, param } from 'express-validator';
// Controller
import { ChosenVerseController } from './chosenVerse.controller';
// Types
import { IRoute } from '../../interfaces/route.interface';
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
      validate([
        query('num').optional().isInt().withMessage('Accepts numbers only'),
      ]),
      this.controller.indexRandomWithPoetName,
    );
    this.router.get(
      '/chosenverse/:id',
      validate([param('id').isMongoId().withMessage('chosenVerse not found')]),
      this.controller.indexOneWithPoetName,
    );
    this.router.post(
      '/chosenverse',
      validate([
        body('poet').isMongoId().withMessage('poet not found'),

        body('poem').isMongoId().withMessage('poem not found'),

        body('tags')
          .notEmpty()
          .isLength({ max: 50 })
          .isString()
          .escape()
          .withMessage('tags should be letters, and max 50 letters length'),

        body('verses')
          .notEmpty()
          .escape()
          .withMessage("Verses can't be empty "),

        body('reviewed')
          .optional()
          .isBoolean()
          .withMessage('reviewed must be true or false'),
      ]),
      this.controller.post,
    );
    this.router.put(
      '/chosenverse/:id',
      validate([
        param('id').isMongoId().withMessage('chosenVerse not found'),

        body('poet').optional().isMongoId().withMessage('poet not found'),

        body('poem').optional().isMongoId().withMessage('poem not found'),

        body('tags')
          .optional()
          .notEmpty()
          .isLength({ max: 50 })
          .isString()
          .escape()
          .withMessage('tags should be letters, and max 50 letters length'),

        body('verses')
          .optional()
          .notEmpty()
          .escape()
          .withMessage("Verses can't be empty "),

        body('reviewed')
          .optional()
          .isBoolean()
          .withMessage('reviewed must be true or false'),
      ]),
      this.controller.update,
    );
    this.router.delete(
      '/chosenverse/:id',
      validate([param('id').isMongoId().withMessage('chosenVerse not found')]),
      this.controller.remove,
    );
  }
}