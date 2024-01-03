import { Router } from 'express';
import { body, param } from 'express-validator';
// Controller
import { PoetController } from './poet.controller';
// Types
import { ERROR_MSG } from './poet.entity';
// middlewares
import { validate } from '../../middlewares/validate.middleware';
import { setCache } from '../../middlewares/cache.middleware';

const router: Router = Router();

router.get('/poets', setCache, PoetController.index);

router.get(
  '/poet/:id',
  [
    validate([param('id').isUUID(4).withMessage(ERROR_MSG.NOT_FOUND)]),
    setCache,
  ],
  PoetController.indexOneWithLiterature,
);

router.post(
  '/poet',
  validate([
    body('name', ERROR_MSG.NAME).isString().escape(),
    body('time_period', ERROR_MSG.TIME_PERIOD).isString().escape(),
    body('bio', ERROR_MSG.BIO).isString().escape(),
    body('reviewed', ERROR_MSG.REVIEWED).optional().isBoolean(),
  ]),
  PoetController.post,
);

router.post('/poets', PoetController.postMany);

router.put(
  '/poet/:id',
  validate([
    param('id', ERROR_MSG.NOT_FOUND).isUUID(4),

    body('name', ERROR_MSG.NAME).optional().isString().escape(),

    body('time_period',ERROR_MSG.TIME_PERIOD)
      .optional()
      .isString()
      .escape(),

    body('bio', ERROR_MSG.BIO).optional().isString().escape(),

    body('reviewed', ERROR_MSG.REVIEWED).optional().isBoolean(),
  ]),
  PoetController.update,
);

router.delete(
  '/poet/:id',
  [validate([param('id', ERROR_MSG.NOT_FOUND).isUUID(4)])],
  PoetController.remove,
);

export const PoetRoute= router;
