import { Router } from 'express';
// Controller
import PoetController from '../controllers/poet.controller';
// Types
import { IRoute } from '../interfaces/route.interface';

export default class PoetRoute implements IRoute {
  public router: Router = Router();
  private controller: PoetController = new PoetController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/poets', this.controller.index);
  }
}
