import { NextFunction, Request, Response } from 'express';
// Services
import { OrderService } from './order.service';
// Types
import { JwtPayload } from 'jsonwebtoken';
import { ERROR_MSG, Order } from './order.entity';
// Utils
import { AppError } from '../../utils/errorsCenter/appError';
import HttpStatusCode from '../../utils/httpStatusCode';
import { decodeToken } from '../../utils/auth';

/**
 * Order's Controller to handle request using gRPC calls for Users's service.
 */
export const OrderController = {
  /**
   * Handle indexGuestOrders request to get All Guest's orders
   *
   * Recieving guests's {name, phone} in req.params
   * @remarks
   * if successful, res = {orders: Order[]} with success status: {@link HttpStatusCode.OK}.
   *
   * if not, res = {@link ERROR_MSG.NOT_AVAILABLE} with error {@link HttpStatusCode.NOT_FOUND}.
   */
  async indexGuestOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const service = await OrderService.getGuestOrders(
        req.body.name as string,
        req.body.phone as string,
      );
      const { status, orders, errMsg } = responseInfo.indexOrders(service);
      if (errMsg) throw new AppError(status, errMsg, true);
      res.status(status).send(orders);
    } catch (error) {
      next(error);
    }
  },
  /**
   * Handle indexPartnerOrders request to get All Partner's orders
   *
   * Recieving Partner's JWT token in req.headers,authorization as `Bearer ${token}`
   * @remarks
   * if successful, res = {orders: Order[]} with success status: {@link HttpStatusCode.OK}.
   *
   * if not, res = {@link ERROR_MSG.NOT_AVAILABLE} with error {@link HttpStatusCode.NOT_FOUND}.
   */
  async indexPartnerOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const decoded = decodeToken(
        req.headers.authorization!.slice(7),
      ) as JwtPayload;
      const service = await OrderService.getPartnerOrders(decoded.user.id);
      const { status, orders, errMsg } = responseInfo.indexOrders(service);
      if (errMsg) throw new AppError(status, errMsg, true);
      res.status(status).send(orders);
    } catch (error) {
      next(error);
    }
  },
  /**
   * Handle postGuest request to create a new guestOrder
   *
   * Recieving guestOrder's data {name, phone, address, products, reviewed, completed} from req.body
   * @remarks
   * if successful, res = Order with success status: {@link HttpStatusCode.CREATED}.
   *
   * if not, res = {@link ERROR_MSG.NOT_VALID} with error {@link HttpStatusCode.NOT_ACCEPTABLE}.
   */
  async postGuest(req: Request, res: Response, next: NextFunction) {
    try {
      const service = await OrderService.post(req.body);
      const { status, order, errMsg } = responseInfo.postOrder(service);
      if (errMsg) throw new AppError(status, errMsg, true);
      res.status(status).send(order);
    } catch (error) {
      next(error);
    }
  },
  /**
   * Handle postPartner request to create a new partnerOrder (only availaible to authenticated partners)
   *
   * Recieving partnerOrder's data {partnerId, name, phone, address, products, reviewed, completed} from req.body
   * @remarks
   * if successful, res = Order with success status: {@link HttpStatusCode.CREATED}.
   *
   * if not, res = {@link ERROR_MSG.NOT_VALID} with error {@link HttpStatusCode.NOT_ACCEPTABLE}.
   */
  async postPartner(req: Request, res: Response, next: NextFunction) {
    try {
      const decoded = decodeToken(
        req.headers.authorization!.slice(7),
      ) as JwtPayload;
      const service = await OrderService.post({
        ...req.body,
        partnerId: decoded.user.id,
      });
      const { status, order, errMsg } = responseInfo.postOrder(service);
      if (errMsg) throw new AppError(status, errMsg, true);
      res.status(status).send(order);
    } catch (error) {
      next(error);
    }
  },
  /**
   * Handle update request to update a Order's data (only availaible to authenticated partners)
   *
   * Recieving order's id in req.params.id, and Order's updated field in req.body
   *
   * @remarks
   * if successful, res with success status: {@link HttpStatusCode.ACCEPTED}.
   *
   * if not, res = {@link ERROR_MSG.NOT_VALID} with error {@link HttpStatusCode.NOT_ACCEPTABLE}.
   */
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const service = await OrderService.update(req.params.id, req.body);
      const { status, errMsg } = responseInfo.update(service);
      if (errMsg) throw new AppError(status, errMsg, true);
      res.sendStatus(status);
    } catch (error) {
      next(error);
    }
  },
  /**
   * Handle remove request to remove a order's data (only availaible to authenticated partners)
   *
   * Recieving order's id in req.params.id.
   * @remarks
   * if successful, res with success status: {@link HttpStatusCode.ACCEPTED}.
   *
   * if not, res = {@link ERROR_MSG.NOT_FOUND} with error {@link HttpStatusCode.NOT_FOUND}.
   */
  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const service = await OrderService.remove(req.params.id);
      const { status, errMsg } = responseInfo.remove(service);
      if (errMsg) throw new AppError(status, errMsg, true);
      res.sendStatus(status);
    } catch (errors) {
      next(errors);
    }
  },
};

/**
 * returns response info depending on the parameter value.
 */
export const responseInfo = {
  /**
   * evalute OrderController.indexGuestOrders || OrderController.indexPartnerOrders, depending on OrderService.indexGuestOrders || OrderService.indexPartnerOrders result
   */
  indexOrders(orders: Order[] | false): {
    status: number;
    orders?: Order[];
    errMsg?: string;
  } {
    if (!orders) {
      return {
        status: HttpStatusCode.NOT_FOUND,
        errMsg: ERROR_MSG.NOT_FOUND,
      };
    }
    return { status: HttpStatusCode.OK, orders };
  },
  /**
   * evalute OrderController.postGuest || OrderController.postPartner, depending on OrderService.postGuest || OrderService.postPartner result
   */
  postOrder(order: Order | false): {
    status: number;
    order?: Order;
    errMsg?: string;
  } {
    if (!order) {
      return {
        status: HttpStatusCode.NOT_ACCEPTABLE,
        errMsg: ERROR_MSG.NOT_VALID,
      };
    }
    return { status: HttpStatusCode.CREATED, order };
  },
  /**
   * evalute OrderController.update, depending on OrderService.update result
   */
  update(order: number | false): { status: number; errMsg?: string } {
    if (!order) {
      return {
        status: HttpStatusCode.NOT_ACCEPTABLE,
        errMsg: ERROR_MSG.NOT_VALID,
      };
    }
    return { status: HttpStatusCode.ACCEPTED };
  },
  /**
   * evalute OrderController.remove, depending on OrderService.remove result
   */
  remove(order: number | false): { status: number; errMsg?: string } {
    if (!order) {
      return { status: HttpStatusCode.NOT_FOUND, errMsg: ERROR_MSG.NOT_FOUND };
    }
    return { status: HttpStatusCode.ACCEPTED };
  },
};
