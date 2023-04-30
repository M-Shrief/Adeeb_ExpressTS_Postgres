import { Router } from 'express';
import OrderController from '../controllers/order.controller';
import { IRoute } from '../interfaces/route.interface';

export default class OrderRoute implements IRoute {
  public router: Router = Router();
  private controller = new OrderController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/orders/guest', this.controller.indexGuestOrders);
    this.router.get('/orders/:partner', this.controller.indexPartnerOrders);
    this.router.post('/order', this.controller.post);
    this.router.put('/order/:id', this.controller.update);
    this.router.delete('/order/:id', this.controller.remove);
  }
}
