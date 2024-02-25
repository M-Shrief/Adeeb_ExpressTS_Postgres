import { Router } from 'express';
import { body } from 'express-validator';
// Controller
import { PartnerController } from './partner.controller';
// Types
import { ERROR_MSG } from './partner.entity';
// middlewares
import { validate } from '../../middlewares/validate.middleware';
import {
  guard,
  jwtToken,
  authErrorHandler,
} from '../../middlewares/auth.middleware';

const router: Router = Router();

router.post(
  '/partner/signup',
  validate([
    body('name', ERROR_MSG.NAME).isString().escape(),

    body('phone', ERROR_MSG.PHONE).isString().escape(),
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
    guard.check(['adeeb:read', 'adeeb:write']),
    authErrorHandler,
    validate([
      body('name', ERROR_MSG.NAME).optional().isString().escape(),

      body('phone', ERROR_MSG.PHONE).optional().escape().isString(),
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
    guard.check(['adeeb:read', 'adeeb:write']),
    authErrorHandler,
  ],
  PartnerController.remove,
);

/**
 * Partner's API routes
 *
 * @remarks
 * Handles:
 *
 * Signup requests - POST /partner/signup with {@link PartnerController.signup}
 *
 * Login requests - POST /partner/login with {@link PartnerController.login}
 *
 * Update requests - PUT /partner/me with {@link PartnerController.update}
 *
 * Remove requests - DELETE /partner/me with {@link PartnerController.remove}
 */
export const PartnerRoute = router;
