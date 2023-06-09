import { object, string } from 'yup';
import { nameSchema, phoneSchema, addressSchema } from '../../schemas';
const passwordSchema = string().min(4).max(100);

export const createSchema = object({
  name: nameSchema.required(),
  phone: phoneSchema.required(),
  address: addressSchema.required(),
  password: passwordSchema.required(),
});

export const updateSchema = object({
  name: nameSchema.optional(),
  phone: phoneSchema.optional(),
  address: addressSchema.optional(),
  password: passwordSchema.optional(),
});
