import { object, string } from 'yup';

export const createSchema = object({
  name: string().min(4).max(50).required(),
  phone: string().min(4).max(50).required(),
  address: string().min(4).max(50).required(),
  password: string().min(4).max(100).required(),
});

export const updateSchema = object({
  name: string().min(4).max(50).optional(),
  phone: string().min(4).max(50).optional(),
  address: string().min(4).max(50).optional(),
  password: string().min(4).max(100).optional(),
});
