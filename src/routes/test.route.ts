import { Router } from 'express';
import { body, param } from 'express-validator';
// Controller
import TestController from '../controllers/test.controller';
import { IRoute } from '../interfaces/route.interface';
// Middlewares
import validate from '../middlewares/validate.middleware';

class TestRoute implements IRoute {
  public router: Router = Router();
  public controller: TestController = new TestController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      '/tests',
      validate([body('name').notEmpty().trim().escape()]),
      this.controller.getHello
    );
  }
}

export default TestRoute;
