import { Router } from 'express';
import { body, param } from 'express-validator';
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
    this.router.get('/proses', this.controller.indexWithPoetName);
  }
}
