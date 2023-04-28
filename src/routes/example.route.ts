import { Router } from 'express';
// Controller
import ExampleController from '../controllers/example.controller';
// Types
import { IRoute } from '../interfaces/route.interface';

class ExampleRoute implements IRoute {
  public router: Router = Router();
  private controller: ExampleController = new ExampleController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/tests', this.controller.getHello);
  }
}

export default ExampleRoute;
