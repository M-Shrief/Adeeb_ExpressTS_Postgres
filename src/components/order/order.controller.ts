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

export const OrderController = {
  indexGuestOrders: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orders = await OrderService.getGuestOrders(
        req.body.name as string,
        req.body.phone as string,
      );
      if (!orders)
        throw new AppError(HttpStatusCode.NOT_FOUND, ERROR_MSG.NOT_FOUND, true);
      res.status(HttpStatusCode.OK).send(orders);
    } catch (error) {
      next(error);
    }
  },

  indexPartnerOrders: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const decoded = decodeToken(
        req.headers.authorization!.slice(7),
      ) as JwtPayload;
      const orders = await OrderService.getPartnerOrders(decoded.id);
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
  },

  postGuest: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const order = await OrderService.post(req.body);
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
  },

  postPartner: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const decoded = decodeToken(
        req.headers.authorization!.slice(7),
      ) as JwtPayload;
      const order = await OrderService.post({
        ...req.body,
        partnerId: decoded.id,
      });
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
  },

  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const order = await OrderService.update(req.params.id, req.body);
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
  },

  remove: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const order = await OrderService.remove(req.params.id);
      if (!order)
        throw new AppError(HttpStatusCode.NOT_FOUND, ERROR_MSG.NOT_FOUND, true);
      res.status(HttpStatusCode.ACCEPTED).send('Deleted Successfully');
    } catch (errors) {
      next(errors);
    }
  },
};
