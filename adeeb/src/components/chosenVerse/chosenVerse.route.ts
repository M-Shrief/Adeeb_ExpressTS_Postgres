import { Router } from 'express';
import { body, query, param } from 'express-validator';
// Controller
import { ChosenVerseController } from './chosenVerse.controller';
// Types
import { ERROR_MSG } from './chosenVerse.entity';
// middlewares
import { validate } from '../../middlewares/validate.middleware';
import { setCache } from '../../middlewares/cache.middleware';

const router: Router = Router();

router.get('/chosenverses', setCache, ChosenVerseController.indexWithPoetName);
router.get(
  '/chosenverses/random',
  validate([query('num', ERROR_MSG.NUM).optional().isInt()]),
  ChosenVerseController.indexRandomWithPoetName,
);
router.get(
  '/chosenverse/:id',
  validate([param('id', ERROR_MSG.NOT_FOUND).isUUID(4)]),
  ChosenVerseController.indexOneWithPoetName,
);
router.post(
  '/chosenverse',
  validate([
    body('poet', ERROR_MSG.POET).isUUID(4),
    body('poem', ERROR_MSG.POEM).isUUID(4),
    body('tags', ERROR_MSG.TAGS).isString().escape(),
    body('verses', ERROR_MSG.VERSES).isArray(),
    body('verses.*.first', ERROR_MSG.VERSES).isString().escape(),
    body('verses.*.sec', ERROR_MSG.VERSES).isString().escape(),
    body('reviewed', ERROR_MSG.REVIEWED).optional().isBoolean(),
  ]),
  ChosenVerseController.post,
);

router.post('/chosenverses', ChosenVerseController.postMany);

router.put(
  '/chosenverse/:id',
  validate([
    param('id', ERROR_MSG.NOT_FOUND).isUUID(4),

    body('poet', ERROR_MSG.POET).optional().isUUID(4),

    body('poem', ERROR_MSG.POEM).optional().isUUID(4),

    body('tags', ERROR_MSG.TAGS).optional().isString().escape(),
    body('verses', ERROR_MSG.VERSES).optional().isArray(),
    body('verses.*.first', ERROR_MSG.VERSES).optional().isString().escape(),

    body('verses.*.sec', ERROR_MSG.VERSES).optional().isString().escape(),

    body('reviewed', ERROR_MSG.REVIEWED).optional().isBoolean(),
  ]),
  ChosenVerseController.update,
);
router.delete(
  '/chosenverse/:id',
  validate([param('id', ERROR_MSG.NOT_FOUND).isUUID(4)]),
  ChosenVerseController.remove,
);

/**
 * ChosenVerse's API routes
 *
 * @remarks
 * Handles:
 *
 * GET /chosenverses with {@link ChosenVerseController.indexOneWithPoetName}
 *
 * GET /chosenverses/random with {@link ChosenVerseController.indexRandomWithPoetName}
 *
 * GET /chosenverse/:id with {@link ChosenVerseController.indexOneWithPoetName}
 *
 * POST /chosenverse with {@link ChosenVerseController.post}
 *
 * POST /chosenverses with {@link ChosenVerseController.postMany}
 *
 * PUT /chosenverse/:id with {@link ChosenVerseController.update}
 *
 * DELETE /chosenverse/:id with {@link ChosenVerseController.remove}
 */
export const ChosenVerseRoute = router;
