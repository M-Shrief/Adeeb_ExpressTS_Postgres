import { Router } from 'express';
import { body, param, query } from 'express-validator';
// Controller
import { ProseController } from './prose.controller';
// Types
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
    query('num', ERROR_MSG.NUM).optional().isInt(),
  ]),
  ProseController.indexRandomWithPoetName,
);
router.get(
  '/prose/:id',
  validate([param('id', ERROR_MSG.NOT_FOUND).isUUID(4)]),
  ProseController.indexOneWithPoetName,
);
router.post(
  '/prose',
  validate([
    body('poet', ERROR_MSG.POET).isUUID(4),
    body('tags', ERROR_MSG.TAGS).isString().escape(),
    body('qoute', ERROR_MSG.QOUTE).isString(),
    body('reviewed', ERROR_MSG.REVIEWED).optional().isBoolean(),
  ]),
  ProseController.post,
);

router.post('/proses', ProseController.postMany);

router.put(
  '/prose/:id',
  validate([
    param('id', ERROR_MSG.NOT_FOUND).isUUID(4),

    body('poet', ERROR_MSG.POET).optional().isUUID(4),

    body('tags', ERROR_MSG.TAGS).optional().isString().escape(),

    body('qoute', ERROR_MSG.QOUTE).optional().isString(),

    body('reviewed', ERROR_MSG.REVIEWED).optional().isBoolean(),
  ]),
  ProseController.update,
);
router.delete(
  '/prose/:id',
  validate([param('id', ERROR_MSG.NOT_FOUND).isUUID(4)]),
  ProseController.remove,
);

/**
 * Poem's API routes
 * 
 * @remarks
 * Handles:
 * 
 * GET /proses with {@link ProseController.indexOneWithPoetName} 
 * 
 * GET /proses/random with {@link ProseController.indexRandomWithPoetName}
 * 
 * GET /prose/:id with {@link ProseController.indexOneWithPoetName}
 * 
 * POST /prose with {@link ProseController.post} 
 *  
 * POST /proses with {@link ProseController.postMany} 
 * 
 * PUT /prose/:id with {@link ProseController.update}
 * 
 * DELETE /prose/:id with {@link ProseController.remove} 
*/
export const ProseRoute = router;