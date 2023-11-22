import { Router } from 'express';
import { body, param, query } from 'express-validator';
// Controller
import { ProseController } from './prose.controller';
// Types
import { IRoute } from '../../interfaces/route.interface';
import { ERROR_MSG } from './prose.entity';
// middlewares
import { validate } from '../../middlewares/validate.middleware';
import { setCache } from '../../middlewares/cache.middleware';

const router: Router = Router();

router.get('/proses', setCache, ProseController.indexWithPoetName);
router.get(
  '/proses/random',
  validate([
    // it doesn't give error when num != number
    query('num').optional().isInt().withMessage(ERROR_MSG.NUM),
  ]),
  ProseController.indexRandomWithPoetName,
);
router.get(
  '/prose/:id',
  validate([param('id').isUUID().withMessage(ERROR_MSG.NOT_FOUND)]),
  ProseController.indexOneWithPoetName,
);
router.post(
  '/prose',
  validate([
    body('poet').isUUID().withMessage(ERROR_MSG.POET),
    body('tags').isString().escape().withMessage(ERROR_MSG.TAGS),
    body('qoute').isString().withMessage(ERROR_MSG.QOUTE),
    body('reviewed').optional().isBoolean().withMessage(ERROR_MSG.REVIEWED),
  ]),
  ProseController.post,
);

router.post('/proses', ProseController.postMany);

router.put(
  '/prose/:id',
  validate([
    param('id').isUUID().withMessage(ERROR_MSG.NOT_FOUND),

    body('poet').optional().isUUID().withMessage(ERROR_MSG.POET),

    body('tags').optional().isString().escape().withMessage(ERROR_MSG.TAGS),

    body('qoute').optional().isString().withMessage(ERROR_MSG.QOUTE),

    body('reviewed').optional().isBoolean().withMessage(ERROR_MSG.REVIEWED),
  ]),
  ProseController.update,
);
router.delete(
  '/prose/:id',
  validate([param('id').isUUID().withMessage(ERROR_MSG.NOT_FOUND)]),
  ProseController.remove,
);

export const ProseRoute: IRoute = {
  router
}