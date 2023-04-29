import { Router } from 'express';
import { body, param } from 'express-validator';
// Controller
import ChosenVerseController from '../controllers/chosenVerse.controller';
// Types
import { IRoute } from '../interfaces/route.interface';
// middlewares
import validate from '../middlewares/validate.middleware';

export default class ChosenVerseRoute implements IRoute {
  public router: Router = Router();
  private controller: ChosenVerseController = new ChosenVerseController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/chosenverses', this.controller.indexWithPoetName);
    this.router.get(
      '/chosenverses/:num',
      validate([param('num').isInt()]),
      this.controller.indexRandom
    );
    this.router.get(
      '/chosenverse/:id',
      validate([param('id').isMongoId()]),
      this.controller.indexOneWithPoetName
    );
    this.router.post(
      '/chosenverse',
      validate([
        body('poet').isMongoId(),
        body('poem').isMongoId(),
        body('tags').isString(),
        body('verses.*').isString().isLength({ max: 50 }),
        body('reviewed').optional().isBoolean(),
      ]),
      this.controller.post
    );
    this.router.put(
      '/chosenverse/:id',
      validate([
        param('id').optional().isMongoId(),
        body('poet').optional().isMongoId(),
        body('poem').optional().isMongoId(),
        body('tags').optional().isString(),
        body('verses.*').optional().isString().isLength({ max: 50 }),
        body('reviewed').optional().isBoolean(),
      ]),
      this.controller.update
    );
    this.router.delete('/chosenverse/:id', this.controller.remove);
  }
}
