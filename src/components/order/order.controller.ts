import { NextFunction, Request, Response } from 'express';
// Services
import { OrderService } from './order.service';
// Utils
import { logger } from '../../utils/logger';
import { AppError } from '../../utils/errorsCenter/appError';
import HttpStatusCode from '../../utils/httpStatusCode';

export class OrderController {
  private orderService = new OrderService();

  public indexGuestOrders = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const orders = await this.orderService.getGuestOrders(
        req.body.name as string,
        req.body.phone as string,
      );
      if (!orders)
        throw new AppError(
          HttpStatusCode.NOT_FOUND,
          'No orders available',
          true,
        );
      res.status(HttpStatusCode.OK).send(orders);
    } catch (error) {
      next(error);
    }
  };

  public indexPartnerOrders = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const orders = await this.orderService.getPartnerOrders(
        req.params.partner,
      );
      if (!orders)
        throw new AppError(
          HttpStatusCode.NOT_FOUND,
          'No orders available',
          true,
        );
      res.status(HttpStatusCode.OK).send(orders);
    } catch (error) {
      next(error);
    }
  };

  public post = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const order = await this.orderService.post(req.body);
      if (!order)
        throw new AppError(
          HttpStatusCode.NOT_ACCEPTABLE,
          'Data for Order is not valid',
          true,
        );
      res.status(HttpStatusCode.CREATED).send(order);
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const order = await this.orderService.update(req.params.id, req.body);
      if (!order)
        throw new AppError(
          HttpStatusCode.NOT_ACCEPTABLE,
          'Data for Order is not valid',
          true,
        );
      res.status(HttpStatusCode.ACCEPTED).send(order);
    } catch (error) {
      next(error);
    }
  };

  public remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const order = await this.orderService.remove(req.params.id);
      if (!order)
        throw new AppError(HttpStatusCode.NOT_FOUND, "Order's not found", true);
      res.status(HttpStatusCode.ACCEPTED).send('Deleted Successfully');
    } catch (errors) {
      next(errors);
    }
  };
}
