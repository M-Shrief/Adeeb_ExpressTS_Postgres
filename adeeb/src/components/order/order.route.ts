import { Router } from 'express';
import { body, param } from 'express-validator';
// OrderControllers
import { OrderController } from './order.controller';
// Types
import { ERROR_MSG } from './order.entity';
// middlewares
import {
  guard,
  jwtToken,
  authErrorHandler,
} from '../../middlewares/auth.middleware';
import { validate } from '../../middlewares/validate.middleware';
import { setCache } from '../../middlewares/cache.middleware';

const router: Router = Router();

router.post(
  '/orders/guest',
  [
    validate([
      body('name', ERROR_MSG.NAME).isString(),
      body('phone', ERROR_MSG.PHONE)
        .isString()
        .escape(),
        // .isMobilePhone('any')
    ]),
    setCache,
  ],
  OrderController.indexGuestOrders,
);
router.get(
  '/orders/partner',
  [
    jwtToken(true),
    guard.check(['adeeb:read', 'adeeb:write']),
    authErrorHandler,
  ],
  OrderController.indexPartnerOrders,
);

router.post(
  '/order/guest',
  [
    validate([
      body('name', ERROR_MSG.NAME).isString(),

      body('phone', ERROR_MSG.PHONE)
        .isString()
        .escape(),
        // .isMobilePhone('any')

      body('address', ERROR_MSG.ADDRESS).isString(), // should have more constraints

      body('reviewed', ERROR_MSG.REVIEWED).optional().isBoolean(),

      body('completed', ERROR_MSG.COMPLETED).optional().isBoolean(),

      body('products', ERROR_MSG.PRODUCTS).isArray(),
      body('products.*.fontType', ERROR_MSG.PRODUCTS)
        .optional()
        .isString(),
      body('products.*.fontColor', ERROR_MSG.PRODUCTS)
        .optional()
        .isString(),
      body('products.*.backgroundColor', ERROR_MSG.PRODUCTS)
        .optional()
        .isString(),
      body('products.*.print')
        .optional()
        .isObject(),
    ]),
  ],
  OrderController.postGuest,
);

router.post(
  '/order/partner',
  [
    jwtToken(true),
    guard.check(['adeeb:read', 'adeeb:write']),
    authErrorHandler,
    validate([
      body('name', ERROR_MSG.NAME).isString(),

      body('phone', ERROR_MSG.PHONE)
        .isString()
        .escape()
        // .isMobilePhone('any')
        .withMessage(ERROR_MSG.PHONE),

      body('address', ERROR_MSG.ADDRESS).isString(), // should have more constraints

      body('reviewed', ERROR_MSG.REVIEWED).optional().isBoolean(),

      body('completed', ERROR_MSG.COMPLETED).optional().isBoolean(),

      body('products', ERROR_MSG.PRODUCTS).isArray(),
      body('products.*.fontType', ERROR_MSG.PRODUCTS)
        .optional()
        .isString()
        ,
      body('products.*.fontColor', ERROR_MSG.PRODUCTS)
        .optional()
        .isString(),
      body('products.*.backgroundColor', ERROR_MSG.PRODUCTS)
        .optional()
        .isString(),
      body('products.*.prints', ERROR_MSG.PRODUCTS)
        .optional()
        .isArray(),
    ]),
  ],
  OrderController.postPartner,
);

router.put(
  '/order/:id',
  validate([
    param('id', ERROR_MSG.NOT_FOUND).isUUID(4),

    body('partnerId', ERROR_MSG.PARTNER).optional().isUUID(4),

    body('name', ERROR_MSG.NAME).optional().isString(),

    body('phone', ERROR_MSG.PHONE)
      .optional()
      .isString()
      .escape(),
      // .isMobilePhone('any')

    body('address', ERROR_MSG.ADDRESS)
      .optional()
      .isString()
      .escape(),

    body('reviewed', ERROR_MSG.REVIEWED).optional().isBoolean(),

    body('completed', ERROR_MSG.COMPLETED).optional().isBoolean(),

   body('products', ERROR_MSG.PRODUCTS).optional().isArray(),
    body('products.*.fontType', ERROR_MSG.PRODUCTS)
      .optional()
      .isString()
      ,
    body('products.*.fontColor', ERROR_MSG.PRODUCTS)
      .optional()
      .isString()
      ,
    body('products.*.backgroundColor', ERROR_MSG.PRODUCTS)
      .optional()
      .isString()
      ,
    body('products.*.print', ERROR_MSG.PRODUCTS)
      .optional()
      .isArray(),
  ]),
  OrderController.update,
);

router.delete(
  '/order/:id',
  validate([param('id', ERROR_MSG.NOT_FOUND).isUUID(4)]),
  OrderController.remove,
);

export const OrderRoute = router;
