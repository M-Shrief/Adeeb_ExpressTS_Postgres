import { Router } from 'express';
import { body, param } from 'express-validator';
// Controller
import { PoemController } from './poem.controller';
// Types
import { ERROR_MSG } from './poem.entity';
// middlewares
import { validate } from '../../middlewares/validate.middleware';
import { setCache } from '../../middlewares/cache.middleware';

const router: Router = Router();

router.get('/poems', setCache, PoemController.indexWithPoetName);
router.get('/poems_intros', setCache, PoemController.indexIntrosWithPoetName);
router.get(
  '/poem/:id',
  [validate([param('id', ERROR_MSG.NOT_FOUND).isUUID(4)]), setCache],
  PoemController.indexOneWithPoet,
);
router.post(
  '/poem',
  validate([
    body('intro', ERROR_MSG.INTRO).isString().escape(),

    body('poet', ERROR_MSG.POET).isUUID(4),

    body('verses', ERROR_MSG.VERSES).isArray(),

    body('verses.*.first', ERROR_MSG.VERSES).isString().escape(),

    body('verses.*.sec', ERROR_MSG.VERSES).isString().escape(),

    body('reviewed', ERROR_MSG.REVIEWED).optional().isBoolean(),
  ]),
  PoemController.post,
);

router.post('/poems', PoemController.postMany);

router.put(
  '/poem/:id',
  validate([
    param('id', ERROR_MSG.NOT_FOUND).isUUID(4),

    body('intro', ERROR_MSG.INTRO).optional().isString().escape(),

    body('poet', ERROR_MSG.POET).optional().isUUID(4),

    body('verses', ERROR_MSG.VERSES).optional().isArray(),

    body('verses.*.first', ERROR_MSG.VERSES).optional().isString().escape(),
    body('verses.*.sec', ERROR_MSG.VERSES).optional().isString().escape(),
    body('reviewed', ERROR_MSG.REVIEWED).optional().isBoolean(),
  ]),
  PoemController.update,
);

router.delete(
  '/poem/:id',
  validate([param('id', ERROR_MSG.NOT_FOUND).optional().isUUID(4)]),
  PoemController.remove,
);

/**
 * Poem's API routes
 *
 * @remarks
 * Handles:
 *
 * GET /poems with {@link PoemController.indexWithPoetName}
 *
 * GET /poems_intros with {@link PoemController.indexIntrosWithPoetName}
 *
 * GET /poem/:id with {@link PoemController.indexOneWithPoet}
 *
 * POST /poem with {@link PoemController.post}
 *
 * POST /poems with {@link PoemController.postMany}
 *
 * PUT /poem/:id with {@link PoemController.update}
 *
 * DELETE /poem/:id with {@link PoemController.remove}
 */
export const PoemRoute = router;
