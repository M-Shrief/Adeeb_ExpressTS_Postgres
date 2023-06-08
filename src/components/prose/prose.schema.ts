import { object, string, boolean } from 'yup';

export const createSchema = object({
  poet: string().uuid().required(),
  tags: string().min(4).max(50).required(),
  qoute: string().min(4).max(300).required(),
  reviewed: boolean().default(true),
});

export const updateSchema = object({
  poet: string().uuid().optional(),
  tags: string().min(4).max(50).optional(),
  qoute: string().min(4).max(300).optional(),
  reviewed: boolean().optional(),
});
