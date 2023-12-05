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
    body('name', ERROR_MSG.NAME).isString().escape(),

    body('phone', ERROR_MSG.PHONE)
      .isString()
      .escape(),
      // .isMobilePhone('any')

    body('password', ERROR_MSG.PASSWORD)
      .isString()
      // .isStrongPassword()
      .escape(),
  ]),
  PartnerController.signup,
);
router.post(
  '/partner/login',
  validate([
    body('phone', ERROR_MSG.PHONE).isString().escape(),

    body('password', ERROR_MSG.PASSWORD).isString().escape(),
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
      body('name', ERROR_MSG.NAME).optional().isString().escape(),

      body('phone', ERROR_MSG.PHONE)
        .optional()
        .escape()
        .isString(),
        // .isMobilePhone('any')
        

      body('password', ERROR_MSG.PASSWORD)
        .optional()
        .isString()
        // .isStrongPassword()
        .escape(),
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