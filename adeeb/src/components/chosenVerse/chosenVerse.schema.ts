import { object, boolean } from 'yup';
import { versesSchema, uuidSchema, tagsSchema } from '../../utils/schemas';

/**
 * Schema for creating a new chosenverse
 * verifies chosenverse's (poet, poem, tags, verses, reviewed)
*/
export const createSchema = object({
  poet: uuidSchema.required(),
  poem: uuidSchema.required(),
  tags: tagsSchema.required(),
  verses: versesSchema.required(),
  reviewed: boolean().default(true),
});

/**
 * Schema for updating a chosenverse
 * verifies chosenverse's (poet, poem, tags, verses, reviewed), if any of them is provided
*/
export const updateSchema = object({
  poet: uuidSchema.optional(),
  poem: uuidSchema.optional(),
  tags: tagsSchema.optional(),
  verses: versesSchema.optional(),
  reviewed: boolean().optional(),
});
