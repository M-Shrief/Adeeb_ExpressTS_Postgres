import { Router } from 'express';
import { body, param } from 'express-validator';
// Controller
import PoemController from '../controllers/poem.controller';
// Types
import { IRoute } from '../interfaces/route.interface';
// middlewares
import validate from '../middlewares/validate.middleware';

export default class PoemRoute implements IRoute {
  public router: Router = Router();
  private controller: PoemController = new PoemController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/poems', this.controller.indexWithPoetName);
    this.router.get('/poems_intros', this.controller.indexIntrosWithPoetName);
    this.router.get(
      '/poem/:id',
      validate([param('id').optional().notEmpty().isMongoId()]),
      this.controller.indexOneWithPoet
    );
    this.router.post(
      '/poem/',
      validate([
        body('intro').notEmpty().isString().isLength({ max: 50 }),
        body('poet').isMongoId(),
        body('verses.*').notEmpty().isString().isLength({ max: 50 }),
        body('reviewed').optional().notEmpty().isBoolean(),
      ]),
      this.controller.post
    );
    this.router.put(
      '/poem/:id',
      validate([
        param('id').optional().notEmpty().isMongoId(),
        body('intro').optional().notEmpty().isString().isLength({ max: 50 }),
        body('poet').optional().isMongoId(),
        body('verses.*').optional().notEmpty().isString().isLength({ max: 50 }),
        body('reviewed').optional().notEmpty().isBoolean(),
      ]),
      this.controller.update
    );
    this.router.delete(
      '/poem/:id',
      validate([param('id').optional().notEmpty().isMongoId()]),
      this.controller.remove
    );
  }
}
