import { Router } from 'express';
import { body, param } from 'express-validator';
// controllers
import { OrderController } from './order.controller';
// Types
import { IRoute } from '../../interfaces/route.interface';
// middlewares
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
            .isLength({ min: 4, max: 50 })
            .isString()
            .escape()
            .withMessage('name is not valid'),
          body('phone')
            .escape()
            .isMobilePhone('any')
            .withMessage('phone is not valid'),
        ]),
        setCache,
      ],
      this.controller.indexGuestOrders,
    );
    this.router.get(
      '/orders/:partner',
      validate([param('partner').isMongoId().withMessage('Partner not found')]),
      this.controller.indexPartnerOrders,
    );
    this.router.post(
      '/order',
      validate([
        body('partner').optional().isMongoId().withMessage('Partner not found'),

        body('name')
          .isLength({ min: 4, max: 50 })
          .isString()
          .escape()
          .withMessage('name should be letters, and max 50 letters length'),

        body('phone')
          .escape()
          .isMobilePhone('any')
          .withMessage('phone not right or not supported'),

        body('address')
          .isLength({ min: 4, max: 100 })
          .withMessage('address can not be empty'), // should have more

        body('reviewed')
          .optional()
          .isBoolean()
          .withMessage('reviewed should be true or false'),

        body('completed')
          .optional()
          .isBoolean()
          .withMessage('completed should be true or false'),

        body('products').notEmpty().withMessage('Order must have products'),
      ]),
      this.controller.post,
    );
    this.router.put(
      '/order/:id',
      validate([
        param('id').isMongoId().withMessage('Order not Found'),

        body('partner').optional().isMongoId().withMessage('Partner not found'),

        body('name')
          .optional()
          .isLength({ min: 4, max: 50 })
          .isString()
          .escape()
          .withMessage('name should be letters, and max 50 letters length'),

        body('phone')
          .optional()
          .escape()
          .isMobilePhone('any')
          .withMessage('phone not right or not supported'),

        body('address')
          .optional()
          .isLength({ min: 4, max: 100 })
          .withMessage('address can not be empty'), // should have more

        body('reviewed').optional().isBoolean(),

        body('completed').optional().isBoolean(),

        body('products.fontType')
          .optional()
          .isLength({ max: 10 })
          .isString()
          .withMessage('Order must have products'),
        body('products.fontColor')
          .optional()
          .isLength({ max: 8 })
          .isString()
          .withMessage('Order must have products'),
        body('products.backgroundColor')
          .optional()
          .isLength({ max: 8 })
          .isString()
          .withMessage('Order must have products'),
        body('products.print')
          .optional()
          .notEmpty()
          .withMessage('Order must have products'),
      ]),
      this.controller.update,
    );

    this.router.delete(
      '/order/:id',
      validate([param('id').isMongoId().withMessage('Order not Found')]),
      this.controller.remove,
    );
  }
}
