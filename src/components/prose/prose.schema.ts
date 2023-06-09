import { object, boolean } from 'yup';
import { uuidSchema, qouteSchema, tagsSchema } from '../../schemas';

export const createSchema = object({
  poet: uuidSchema.required(),
  tags: tagsSchema.required(),
  qoute: qouteSchema.required(),
  reviewed: boolean().default(true),
});

export const updateSchema = object({
  poet: uuidSchema.optional(),
  tags: tagsSchema.optional(),
  qoute: qouteSchema.optional(),
  reviewed: boolean().optional(),
});
