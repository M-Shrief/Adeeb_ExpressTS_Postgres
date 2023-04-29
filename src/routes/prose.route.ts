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
    this.router.get('/proses/:num', this.controller.indexRandom);
    this.router.get('/prose/:id', this.controller.indexOneWithPoetName);
    this.router.post('/prose', this.controller.post);
    this.router.put('/prose/:id', this.controller.update);
    this.router.delete('/prose/:id', this.controller.remove);
  }
}
