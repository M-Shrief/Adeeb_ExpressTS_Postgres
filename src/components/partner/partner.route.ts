import { Router } from 'express';
import { body, param } from 'express-validator';
// Controller
import { PartnerController } from './partner.controller';
// Types
import { IRoute } from '@/interfaces/route.interface';
import { ERROR_MSG } from '@/interfaces/partner.interface';
// middlewares
import { validate } from '@/middlewares/validate.middleware';
import {
  guard,
  jwtToken,
  authErrorHandler,
} from '@/middlewares/auth.middleware';
import { setCache } from '@/middlewares/cache.middleware';
export class PartnerRoute implements IRoute {
  public router: Router = Router();
  private controller: PartnerController = new PartnerController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      '/partner/:id',
      [
        jwtToken(true),
        guard.check(['partner:read', 'partner:write']),
        authErrorHandler,
        validate([param('id').isUUID().withMessage(ERROR_MSG.NOT_FOUND)]),
        setCache,
      ],
      this.controller.indexInfo,
    );
    this.router.post(
      '/partner/signup',
      validate([
        body('name')
          .isLength({ min: 4, max: 50 })
          .isString()
          .escape()
          .withMessage(ERROR_MSG.NAME),

        body('phone')
          .escape()
          .isMobilePhone('any')
          .withMessage(ERROR_MSG.PHONE),

        body('addresses').isArray({ min: 1 }).withMessage(ERROR_MSG.ADDRESSES),

        body('password')
          .isString()
          .isStrongPassword()
          .escape()
          .withMessage(ERROR_MSG.PASSWORD),
      ]),
      this.controller.signup,
    );
    this.router.post(
      '/partner/login',
      validate([
        body('phone')
          .isLength({ min: 4, max: 20 })
          .isString()
          .escape()
          .withMessage(ERROR_MSG.NOT_VALID),

        body('password')
          .isLength({ min: 4, max: 20 })
          .isString()
          .escape()
          .withMessage(ERROR_MSG.NOT_VALID),
      ]),
      this.controller.login,
    );
    this.router.post('/partner/logout', this.controller.logout);
    this.router.put(
      '/partner/:id',
      [
        validate([
          param('id').isUUID().withMessage(ERROR_MSG.NOT_FOUND),

          body('name')
            .optional()
            .isLength({ min: 4, max: 50 })
            .isString()
            .escape()
            .withMessage(ERROR_MSG.NAME),

          body('phone')
            .optional()
            .escape()
            .isMobilePhone('any')
            .withMessage(ERROR_MSG.PHONE),

          body('addresses')
            .optional()
            .isArray({ min: 1 })
            .withMessage(ERROR_MSG.ADDRESSES), // should have more

          body('password')
            .optional()
            .isString()
            .isStrongPassword()
            .escape()
            .withMessage(ERROR_MSG.PASSWORD),
        ]),
        jwtToken(true),
        guard.check(['partner:read', 'partner:write']),
        authErrorHandler,
      ],
      this.controller.update,
    );
    this.router.delete(
      '/partner/:id',
      [
        validate([param('id').isUUID().withMessage(ERROR_MSG.NOT_FOUND)]),
        jwtToken(true),
        guard.check(['partner:read', 'partner:write']),
        authErrorHandler,
      ],
      this.controller.remove,
    );
  }
}
