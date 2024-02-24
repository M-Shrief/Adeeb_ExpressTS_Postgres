import { object, boolean } from 'yup';
import { nameSchema, timePeriodSchema, bioSchema } from '../../utils/schemas';

/**
 * Schema for creating up a new poet
 * verifies Poet's (name, time_period, bio, reviewed)
*/
export const createSchema = object({
  name: nameSchema.required(),
  time_period: timePeriodSchema.required(),
  bio: bioSchema.required(),
  reviewed: boolean().default(true),
});

/**
 * Schema for updating up a poet's data
 * verifies Poet's (name, time_period, bio, reviewed), if any of them is provided
*/
export const updateSchema = object({
  name: nameSchema.optional(),
  time_period: timePeriodSchema.optional(),
  bio: bioSchema.optional(),
  reviewed: boolean().optional(),
});
