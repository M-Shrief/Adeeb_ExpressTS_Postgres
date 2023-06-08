import { object, string, array } from 'yup';

export const createSchema = object({
  name: string().min(4).max(50).required(),
  phone: string().min(4).max(50).required(),
  addresses: array().of(string().min(8).max(100)).required(),
  password: string().min(4).max(100).required(),
});

export const updateSchema = object({
  name: string().min(4).max(50).optional(),
  phone: string().min(4).max(50).optional(),
  addresses: array().of(string().min(8).max(100)).optional(),
  password: string().min(4).max(100).optional(),
});
