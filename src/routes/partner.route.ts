import { Router } from 'express';
import { body, param } from 'express-validator';
// Controller
import PartnerController from '../controllers/partner.controller';
// Types
import { IRoute } from '../interfaces/route.interface';
// middlewares
import validate from '../middlewares/validate.middleware';

export default class PartnerRoute implements IRoute {
  public router: Router = Router();
  private controller: PartnerController = new PartnerController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/partner/:id', this.controller.indexInfo);
    this.router.post('/partner/signup', this.controller.signup);
    this.router.post('/partner/login', this.controller.login);
  }
}
