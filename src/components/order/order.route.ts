import { Router } from 'express';
import { body, param } from 'express-validator';
// controllers
import { OrderController } from './order.controller';
// Types
import { IRoute } from '../../interfaces/route.interface';
import { ERROR_MSG } from './order.entity';
// middlewares
import {
  guard,
  jwtToken,
  authErrorHandler,
} from '../../middlewares/auth.middleware';
import { validate } from '../../middlewares/validate.middleware';
import { setCache } from '../../middlewares/cache.middleware';
export class OrderRoute implements IRoute {
  public router: Router = Router();
  private controller = new OrderController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      '/orders/guest',
      [
        validate([
          body('name')
            .isString()
            .escape()
            .withMessage(ERROR_MSG.NAME),
          body('phone')
          .isString()
          .escape()
            // .isMobilePhone('any')
            .withMessage(ERROR_MSG.PHONE),
        ]),
        setCache,
      ],
      this.controller.indexGuestOrders,
    );
    this.router.get(
      '/orders/partner',
      [
        jwtToken(true),
        guard.check(['partner:read', 'partner:write']),
        authErrorHandler,        
      ],
      this.controller.indexPartnerOrders,
    );

    this.router.post(
      '/order/guest',
      [     
        validate([
          body('name')
            .isString()
            .escape()
            .withMessage(ERROR_MSG.NAME),

          body('phone')
            .isString()
            .escape()
            // .isMobilePhone('any')
            .withMessage(ERROR_MSG.PHONE),

          body('address') 
            .isString()
            .withMessage(ERROR_MSG.ADDRESS), // should have more constraints

          body('reviewed').optional().isBoolean().withMessage(ERROR_MSG.REVIEWED),

          body('completed')
            .optional()
            .isBoolean()
            .withMessage(ERROR_MSG.COMPLETED),

          body('products').isArray().withMessage(ERROR_MSG.PRODUCTS),
          body('products.*.fontType')
            .optional()
            .isString()
            .withMessage(ERROR_MSG.PRODUCTS),
          body('products.*.fontColor')
            .optional()
            .isString()
            .withMessage(ERROR_MSG.PRODUCTS),
          body('products.*.backgroundColor')
            .optional()
            .isString()
            .withMessage(ERROR_MSG.PRODUCTS),
          body('products.*.print')
            .optional()
            .isObject()
            .withMessage(ERROR_MSG.PRODUCTS),
        ]),
      ],
      this.controller.postGuest,
    );

    this.router.post(
      '/order/partner',
      [
        jwtToken(true),
        guard.check(['partner:read', 'partner:write']),
        authErrorHandler,       
        validate([
          body('name')
            .isString()
            .escape()
            .withMessage(ERROR_MSG.NAME),

          body('phone')
            .isString()
            .escape()
            // .isMobilePhone('any')
            .withMessage(ERROR_MSG.PHONE),

          body('address') 
            .isString()
            .withMessage(ERROR_MSG.ADDRESS), // should have more constraints

          body('reviewed').optional().isBoolean().withMessage(ERROR_MSG.REVIEWED),

          body('completed')
            .optional()
            .isBoolean()
            .withMessage(ERROR_MSG.COMPLETED),

          body('products').isArray().withMessage(ERROR_MSG.PRODUCTS),
          body('products.*.fontType')
            .optional()
            .isString()
            .withMessage(ERROR_MSG.PRODUCTS),
          body('products.*.fontColor')
            .optional()
            .isString()
            .withMessage(ERROR_MSG.PRODUCTS),
          body('products.*.backgroundColor')
            .optional()
            .isString()
            .withMessage(ERROR_MSG.PRODUCTS),
          body('products.*.prints')
            .optional()
            .isArray()
            .withMessage(ERROR_MSG.PRODUCTS),
        ]),
      ],
      this.controller.postPartner,
    );

    this.router.put(
      '/order/:id',
      validate([
        param('id').isUUID().withMessage(ERROR_MSG.NOT_FOUND),

        body('partnerId').optional().isUUID().withMessage(ERROR_MSG.PARTNER),

        body('name')
          .optional()
          .isString()
          .escape()
          .withMessage(ERROR_MSG.NAME),

        body('phone')
          .optional()
          .isString()
          .escape()
          // .isMobilePhone('any')
          .withMessage(ERROR_MSG.PHONE),

        body('address')
        .optional()
        .isString()
        .escape()
        .withMessage(ERROR_MSG.ADDRESS),

        body('reviewed').optional().isBoolean().withMessage(ERROR_MSG.REVIEWED),

        body('completed')
          .optional()
          .isBoolean()
          .withMessage(ERROR_MSG.COMPLETED),

        body('products').optional().isArray().withMessage(ERROR_MSG.PRODUCTS),
        body('products.*.fontType')
          .optional()
          .isString()
          .withMessage(ERROR_MSG.PRODUCTS),
        body('products.*.fontColor')
          .optional()
          .isString()
          .withMessage(ERROR_MSG.PRODUCTS),
        body('products.*.backgroundColor')
          .optional()
          .isString()
          .withMessage(ERROR_MSG.PRODUCTS),
        body('products.*.print.*')
          .optional()
          .isString()
          .withMessage(ERROR_MSG.PRODUCTS),
      ]),
      this.controller.update,
    );

    this.router.delete(
      '/order/:id',
      validate([param('id').isUUID().withMessage(ERROR_MSG.NOT_FOUND)]),
      this.controller.remove,
    );
  }
}
