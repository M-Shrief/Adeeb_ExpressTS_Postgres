import { object, boolean } from 'yup';
import { uuidSchema, qouteSchema, tagsSchema } from '../../utils/schemas';

/**
 * Schema for creating a new prose
 * verifies prose's (poet, tags, qoute, reviewed)
*/
export const createSchema = object({
  poet: uuidSchema.required(),
  tags: tagsSchema.required(),
  qoute: qouteSchema.required(),
  reviewed: boolean().default(true),
});

/**
 * Schema for updating a prose's data
 * verifies prose's (poet, tags, qoute, reviewed), if any of them is provided
*/
export const updateSchema = object({
  poet: uuidSchema.optional(),
  tags: tagsSchema.optional(),
  qoute: qouteSchema.optional(),
  reviewed: boolean().optional(),
});
