import { Router } from 'express';
import { body, param } from 'express-validator';
// Controller
import PoetController from '../controllers/poet.controller';
// Types
import { IRoute } from '../interfaces/route.interface';
// middlewares
import validate from '../middlewares/validate.middleware';

export default class PoetRoute implements IRoute {
  public router: Router = Router();
  private controller: PoetController = new PoetController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/poets', this.controller.index);
    this.router.post(
      '/poet',
      validate([
        body('name').notEmpty().isString().isLength({ max: 50 }),
        body('time_period').isString().isLength({ max: 50 }),
        body('bio').notEmpty().isString().isLength({ max: 300 }),
        body('reviewed').optional().notEmpty().isBoolean(),
      ]),
      this.controller.post
    );
    this.router.put(
      '/poet/:id',
      validate([
        param('id').optional().notEmpty().isMongoId(),
        body('name').optional().notEmpty().isString().isLength({ max: 50 }),
        body('time_period').optional().isString().isLength({ max: 50 }),
        body('bio').optional().notEmpty().isString().isLength({ max: 300 }),
        body('reviewed').optional().notEmpty().isBoolean(),
      ]),
      this.controller.update
    );
    this.router.delete(
      '/poet/:id',
      validate([param('id').notEmpty().isMongoId()]),
      this.controller.remove
    );
  }
}
