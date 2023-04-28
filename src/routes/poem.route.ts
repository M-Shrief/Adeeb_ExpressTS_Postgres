import { Router } from 'express';
import { param } from 'express-validator';
// Controller
import PoemController from '../controllers/poem.controller';
// Types
import { IRoute } from '../interfaces/route.interface';
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
    this.router.get('/poem/:id', this.controller.indexOneWithPoet);
    this.router.post('/poem/', this.controller.post);
    this.router.put('/poem/:id', this.controller.update);
    this.router.delete('/poem/:id', this.controller.remove);
  }
}
