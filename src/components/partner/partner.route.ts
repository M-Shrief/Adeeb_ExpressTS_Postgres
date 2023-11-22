import { Router } from 'express';
import { body } from 'express-validator';
// Controller
import { PartnerController } from './partner.controller';
// Types
import { IRoute } from '../../interfaces/route.interface';
import { ERROR_MSG } from './partner.entity';
// middlewares
import { validate } from '../../middlewares/validate.middleware';
import {
  guard,
  jwtToken,
  authErrorHandler,
} from '../../middlewares/auth.middleware';
import { setCache } from '../../middlewares/cache.middleware';

const router: Router = Router();

router.get(
  '/partner/me',
  [
    jwtToken(true),
    guard.check(['partner:read', 'partner:write']),
    authErrorHandler,
    setCache,
  ],
  PartnerController.indexInfo,
);
router.post(
  '/partner/signup',
  validate([
    body('name').isString().escape().withMessage(ERROR_MSG.NAME),

    body('phone')
      .isString()
      .escape()
      // .isMobilePhone('any')
      .withMessage(ERROR_MSG.PHONE),

    body('password')
      .isString()
      // .isStrongPassword()
      .escape()
      .withMessage(ERROR_MSG.PASSWORD),
  ]),
  PartnerController.signup,
);
router.post(
  '/partner/login',
  validate([
    body('phone').isString().escape().withMessage(ERROR_MSG.PHONE),

    body('password').isString().escape().withMessage(ERROR_MSG.PASSWORD),
  ]),
  PartnerController.login,
);
// router.post('/partner/logout', PartnerController.logout);
router.put(
  '/partner/me',
  [
    jwtToken(true),
    guard.check(['partner:read', 'partner:write']),
    authErrorHandler,
    validate([
      body('name').optional().isString().escape().withMessage(ERROR_MSG.NAME),

      body('phone')
        .optional()
        .escape()
        .isString()
        // .isMobilePhone('any')
        .withMessage(ERROR_MSG.PHONE),

      body('password')
        .optional()
        .isString()
        // .isStrongPassword()
        .escape()
        .withMessage(ERROR_MSG.PASSWORD),
    ]),
  ],
  PartnerController.update,
);
router.delete(
  '/partner/me',
  [
    jwtToken(true),
    guard.check(['partner:read', 'partner:write']),
    authErrorHandler,
  ],
  PartnerController.remove,
);

export const PartnerRoute: IRoute = {
  router
}