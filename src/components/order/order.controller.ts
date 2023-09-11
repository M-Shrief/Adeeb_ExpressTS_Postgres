import { NextFunction, Request, Response } from 'express';
// Services
import { OrderService } from './order.service';
// Types
import { JwtPayload } from 'jsonwebtoken';
import { ERROR_MSG } from './order.entity';
// Utils
import { AppError } from '../../utils/errorsCenter/appError';
import HttpStatusCode from '../../utils/httpStatusCode';
import { decodeToken } from '../../utils/auth';

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
          ERROR_MSG.NOT_FOUND,
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
      const decoded = decodeToken(req.headers.authorization!.slice(7)) as JwtPayload;
      const orders = await this.orderService.getPartnerOrders(decoded.id);
      if (!orders)
        throw new AppError(
          HttpStatusCode.NOT_FOUND,
          ERROR_MSG.NOT_AVAILABLE,
          true,
        );
      res.status(HttpStatusCode.OK).send(orders);
    } catch (error) {
      next(error);
    }
  };

  public postGuest = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const order = await this.orderService.post(req.body);
      if (!order)
        throw new AppError(
          HttpStatusCode.NOT_ACCEPTABLE,
          ERROR_MSG.NOT_VALID,
          true,
        );
      res.status(HttpStatusCode.CREATED).send(order);
    } catch (error) {
      next(error);
    }
  };

  public postPartner = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const decoded = decodeToken(req.headers.authorization!.slice(7)) as JwtPayload;
      const order = await this.orderService.post({...req.body, partnerId: decoded.id});
      if (!order)
        throw new AppError(
          HttpStatusCode.NOT_ACCEPTABLE,
          ERROR_MSG.NOT_VALID,
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
          ERROR_MSG.NOT_VALID,
          true,
        );
      res.sendStatus(HttpStatusCode.ACCEPTED).send(order);
    } catch (error) {
      next(error);
    }
  };

  public remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const order = await this.orderService.remove(req.params.id);
      if (!order)
        throw new AppError(HttpStatusCode.NOT_FOUND, ERROR_MSG.NOT_FOUND, true);
      res.status(HttpStatusCode.ACCEPTED).send('Deleted Successfully');
    } catch (errors) {
      next(errors);
    }
  };
}
