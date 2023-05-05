import { Router } from 'express';
import { body, param } from 'express-validator';
// Controller
import { PartnerController } from './partner.controller';
// Types
import { IRoute } from '../../interfaces/route.interface';
// middlewares
import { validate } from '../../middlewares/validate.middleware';
import { guard, jwtToken } from '../../middlewares/auth.middleware';
import { setCache } from '../../middlewares/cache.middleware';
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
        validate([
          param('id').isMongoId().withMessage('Partner not available'),
        ]),
        jwtToken(true),
        guard.check(['partner:read', 'partner:write']),
        setCache,
      ],
      this.controller.indexInfo
    );
    this.router.post(
      '/partner/signup',
      validate([
        body('name')
          .notEmpty()
          .isString()
          .isLength({ max: 50 })
          .escape()
          .withMessage(
            'name should be contain letters, and less than 50 in length'
          ),

        body('phone')
          .escape()
          .isMobilePhone('any')
          .withMessage('phone not right or not supported'),

        body('address').notEmpty().withMessage('address can not be empty'), // should have more

        body('password')
          .isString()
          .isStrongPassword()
          .escape()
          .withMessage(
            'Password should contain: lowercase and uppercase letters, numbers, and symbols(*&^%%$#!@)'
          ),
      ]),
      this.controller.signup
    );
    this.router.post(
      '/partner/login',
      validate([
        body('phone').notEmpty().isString().isLength({ max: 20 }).escape(),

        body('password').notEmpty().isString().escape(),
      ]),
      this.controller.login
    );
    this.router.post('/partner/logout', this.controller.logout);
    this.router.put(
      '/partner/:id',
      [
        validate([
          param('id').isMongoId().withMessage('Partner not available'),

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

          body('address').notEmpty().withMessage('address can not be empty'), // should have more

          body('password')
            .optional()
            .isString()
            .isStrongPassword()
            .escape()
            .withMessage(
              'Password should contain: lowercase and uppercase letters, numbers, and symbols(*&^%%$#!@)'
            ),
        ]),
        jwtToken(true),
        guard.check(['partner:read', 'partner:write']),
      ],
      this.controller.update
    );
    this.router.delete(
      '/partner/:id',
      [
        validate([
          param('id').isMongoId().withMessage('Partner not available'),
        ]),
        jwtToken(true),
        guard.check(['partner:read', 'partner:write']),
      ],
      this.controller.remove
    );
  }
}
