import { Router } from 'express';
import { body, param, query } from 'express-validator';
// Controller
import ProseController from '../controllers/prose.controller';
// Types
import { IRoute } from '../interfaces/route.interface';
// middlewares
import validate from '../middlewares/validate.middleware';

export default class ProseRoute implements IRoute {
  public router: Router = Router();
  private controller: ProseController = new ProseController();

  constructor() {
    this.initalizeRoutes();
  }

  private initalizeRoutes() {
    this.router.get(
      '/proses',
      validate([query('num').optional().isInt()]),
      this.controller.indexWithPoetName
    );
    this.router.get(
      '/prose/:id',
      validate([param('id').isMongoId()]),
      this.controller.indexOneWithPoetName
    );
    this.router.post(
      '/prose',
      validate([
        body('poet').isMongoId(),
        body('tags').notEmpty().isString(),
        body('qoute').notEmpty().isString().isLength({ max: 300 }),
        body('reviewed').isBoolean(),
      ]),
      this.controller.post
    );
    this.router.put(
      '/prose/:id',
      validate([
        param('id').isMongoId(),
        body('poet').optional().isMongoId(),
        body('tags').optional().notEmpty().isString(),
        body('qoute').optional().notEmpty().isString().isLength({ max: 300 }),
        body('reviewed').optional().isBoolean(),
      ]),
      this.controller.update
    );
    this.router.delete(
      '/prose/:id',
      validate([param('id').isMongoId()]),
      this.controller.remove
    );
  }
}
