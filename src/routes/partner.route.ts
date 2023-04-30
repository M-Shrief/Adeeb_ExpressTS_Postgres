import { Router } from 'express';
import { body, param } from 'express-validator';
// Controller
import PartnerController from '../controllers/partner.controller';
// Types
import { IRoute } from '../interfaces/route.interface';
// middlewares
import validate from '../middlewares/validate.middleware';

export default class PartnerRoute implements IRoute {
  public router: Router = Router();
  private controller: PartnerController = new PartnerController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      '/partner/:id',
      validate([param('id').isMongoId().withMessage('Partner not available')]),
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
          .isString()
          .escape()
          .isMobilePhone('any')
          .withMessage('phone not rigth or not supported'),

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
    this.router.put(
      '/partner/:id',
      validate([
        param('id').isMongoId().withMessage('Partner not available'),

        body('name')
          .notEmpty()
          .isString()
          .isLength({ max: 50 })
          .escape()
          .withMessage(
            'name should be contain letters, and less than 50 in length'
          ),

        body('phone')
          .isString()
          .escape()
          .isMobilePhone('any')
          .withMessage('phone not rigth or not supported'),

        body('address').notEmpty().withMessage('address can not be empty'), // should have more

        body('password')
          .isString()
          .isStrongPassword()
          .escape()
          .withMessage(
            'Password should contain: lowercase and uppercase letters, numbers, and symbols(*&^%%$#!@)'
          ),
      ]),
      this.controller.update
    );
    this.router.delete(
      '/partner/:id',
      validate([param('id').isMongoId().withMessage('Partner not available')]),
      this.controller.remove
    );
  }
}
