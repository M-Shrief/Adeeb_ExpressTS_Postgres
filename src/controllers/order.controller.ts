import { NextFunction, Request, Response } from 'express';
// Services
import OrderService from '../services/order.service';
// Types
import OrderType from '../interfaces/order.interface';
// Utils
import { logger } from '../utils/logger';

export default class OrderController {
  private orderService = new OrderService();

  public indexGuestOrders = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    await this.orderService
      .getGuestOrders(req.body.name, req.body.phone)
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        logger.error(err);
        res.status(404).send(err);
      });
  };

  public indexPartnerOrders = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    await this.orderService
      .getPartnerOrders(req.params.partner)
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        logger.error(err);
        res.status(404).send(err);
      });
  };

  public post = (req: Request, res: Response, next: NextFunction) => {
    this.orderService
      .post(req.body)
      .then((newOrder) =>
        res.status(201).json({
          success: true,
          Order: newOrder,
        })
      )
      .catch((err) => {
        logger.error(err);
        res.status(400).send('Bad Request');
      });
  };

  public update = (req: Request, res: Response, next: NextFunction) => {
    this.orderService
      .update(req.params.id, req.body)
      .then((updatedOrder) =>
        res.status(202).json({
          success: true,
          Order: updatedOrder,
        })
      )
      .catch((err) => {
        logger.error(err);
        res.status(400).send('Bad Request');
      });
  };

  public remove = (req: Request, res: Response, next: NextFunction) => {
    this.orderService
      .remove(req.params.id)
      .then(() => {
        res.status(202).send('Deleted Successfully');
      })
      .catch((err) => logger.error(err));
  };
}
