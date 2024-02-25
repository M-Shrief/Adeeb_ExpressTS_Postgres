import { object, boolean } from 'yup';
import { uuidSchema, versesSchema, introSchema } from '../../utils/schemas';

/**
 * Schema for creating a new poem
 * verifies Poem's (intro, poet, verses, reviewed)
 */
export const createSchema = object({
  intro: introSchema.required(),
  poet: uuidSchema.required(),
  verses: versesSchema.required(),
  reviewed: boolean().default(true),
});

/**
 * Schema for updating a poem's data
 * verifies Poem's (intro, poet, verses, reviewed), if any of them is provided
 */
export const updateSchema = object({
  intro: introSchema.optional(),
  poet: uuidSchema.optional(),
  verses: versesSchema.optional(),
  reviewed: boolean().optional(),
});
