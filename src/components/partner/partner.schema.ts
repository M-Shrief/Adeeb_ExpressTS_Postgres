import { object, string } from 'yup';
import { nameSchema, phoneSchema, addressSchema } from '../../shared/schemas';
const passwordSchema = string().min(4).max(100);

export const createSchema = object({
  name: nameSchema.required(),
  phone: phoneSchema.required(),
  password: passwordSchema.required(),
});

export const updateSchema = object({
  name: nameSchema.optional(),
  phone: phoneSchema.optional(),
  password: passwordSchema.optional(),
});
