import { Router } from 'express';
import { body, param } from 'express-validator';
// controllers
import OrderController from '../controllers/order.controller';
// Types
import { IRoute } from '../interfaces/route.interface';
// middlewares
import validate from '../middlewares/validate.middleware';
export default class OrderRoute implements IRoute {
  public router: Router = Router();
  private controller = new OrderController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      '/orders/guest',
      validate([
        body('name')
          .notEmpty()
          .isString()
          .isLength({ max: 50 })
          .escape()
          .withMessage('name should be letters, and max 50 letters length'),

        body('phone')
          .escape()
          .isMobilePhone('any')
          .withMessage('phone not right or not supported'),
      ]),
      this.controller.indexGuestOrders
    );
    this.router.get(
      '/orders/:partner',
      validate([param('partner').isMongoId().withMessage('Partner not found')]),
      this.controller.indexPartnerOrders
    );
    this.router.post(
      '/order',
      validate([
        body('partner').optional().isMongoId().withMessage('Partner not found'),

        body('name')
          .notEmpty()
          .isString()
          .isLength({ max: 50 })
          .escape()
          .withMessage('name should be letters, and max 50 letters length'),

        body('phone')
          .escape()
          .isMobilePhone('any')
          .withMessage('phone not right or not supported'),

        body('address').notEmpty().withMessage('address can not be empty'), // should have more

        body('reviewed').optional().isBoolean(),

        body('completed').optional().isBoolean(),

        body('products').notEmpty().withMessage('Order must have products'),
      ]),
      this.controller.post
    );
    this.router.put(
      '/order/:id',
      validate([
        param('id').isMongoId().withMessage('Order not Found'),

        body('partner').optional().isMongoId().withMessage('Partner not found'),

        body('name')
          .optional()
          .notEmpty()
          .isString()
          .isLength({ max: 50 })
          .escape()
          .withMessage('name should be letters, and max 50 letters length'),

        body('phone')
          .optional()
          .escape()
          .isMobilePhone('any')
          .withMessage('phone not right or not supported'),

        body('address')
          .optional()
          .notEmpty()
          .withMessage('address can not be empty'), // should have more

        body('reviewed').optional().isBoolean(),

        body('completed').optional().isBoolean(),

        body('products')
          .optional()
          .notEmpty()
          .withMessage('Order must have products'),
      ]),
      this.controller.update
    );

    this.router.delete(
      '/order/:id',
      validate([param('id').isMongoId().withMessage('Order not Found')]),
      this.controller.remove
    );
  }
}
