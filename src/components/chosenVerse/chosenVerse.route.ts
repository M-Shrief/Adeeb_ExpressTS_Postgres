import { Router } from 'express';
import { body, query, param } from 'express-validator';
// Controller
import { ChosenVerseController } from './chosenVerse.controller';
// Types
import { IRoute } from '../../interfaces/route.interface';
import { ERROR_MSG } from './chosenVerse.entity';
// middlewares
import { validate } from '../../middlewares/validate.middleware';
import { setCache } from '../../middlewares/cache.middleware';

const router: Router = Router();

router.get('/chosenverses', setCache, ChosenVerseController.indexWithPoetName);
router.get(
  '/chosenverses/random',
  validate([query('num').optional().isInt().withMessage(ERROR_MSG.NUM)]),
  ChosenVerseController.indexRandomWithPoetName,
);
router.get(
  '/chosenverse/:id',
  validate([param('id').isUUID().withMessage(ERROR_MSG.NOT_FOUND)]),
  ChosenVerseController.indexOneWithPoetName,
);
router.post(
  '/chosenverse',
  validate([
    body('poet').isUUID().withMessage(ERROR_MSG.POET),
    body('poem').isUUID().withMessage(ERROR_MSG.POEM),
    body('tags').isString().escape().withMessage(ERROR_MSG.TAGS),
    body('verses').isArray().withMessage(ERROR_MSG.VERSES),
    body('verses.*.first').isString().escape().withMessage(ERROR_MSG.VERSES),
    body('verses.*.sec').isString().escape().withMessage(ERROR_MSG.VERSES),
    body('reviewed').optional().isBoolean().withMessage(ERROR_MSG.REVIEWED),
  ]),
  ChosenVerseController.post,
);

router.post('/chosenverses', ChosenVerseController.postMany);

router.put(
  '/chosenverse/:id',
  validate([
    param('id').isUUID().withMessage(ERROR_MSG.NOT_FOUND),

    body('poet').optional().isUUID(4).withMessage(ERROR_MSG.POET),

    body('poem').optional().isUUID(4).withMessage(ERROR_MSG.POEM),

    body('tags').optional().isString().escape().withMessage(ERROR_MSG.TAGS),
    body('verses').optional().isArray().withMessage(ERROR_MSG.VERSES),
    body('verses.*.first')
      .optional()
      .isString()
      .escape()
      .withMessage(ERROR_MSG.VERSES),

    body('verses.*.sec')
      .optional()
      .isString()
      .escape()
      .withMessage(ERROR_MSG.VERSES),

    body('reviewed').optional().isBoolean().withMessage(ERROR_MSG.REVIEWED),
  ]),
  ChosenVerseController.update,
);
router.delete(
  '/chosenverse/:id',
  validate([param('id').isUUID().withMessage(ERROR_MSG.NOT_FOUND)]),
  ChosenVerseController.remove,
);

export const ChosenVerseRoute: IRoute = {
  router,
};
