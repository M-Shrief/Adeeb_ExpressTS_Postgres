import { object, boolean } from 'yup';
import { versesSchema, uuidSchema, tagsSchema } from '../../schemas';

export const createSchema = object({
  poet: uuidSchema.required(),
  poem: uuidSchema.required(),
  tags: tagsSchema.required(),
  verses: versesSchema.required(),
  reviewed: boolean().default(true),
});

export const updateSchema = object({
  poet: uuidSchema.optional(),
  poem: uuidSchema.optional(),
  tags: tagsSchema.optional(),
  verses: versesSchema.optional(),
  reviewed: boolean().optional(),
});
