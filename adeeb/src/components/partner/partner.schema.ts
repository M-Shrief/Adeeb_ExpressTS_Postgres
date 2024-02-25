import { object, string } from 'yup';
import { nameSchema, phoneSchema, addressSchema } from '../../utils/schemas';
const passwordSchema = string().min(4).max(100);

/**
 * Schema for signing up a new partner
 * verifies Partner's (name, phone, password)
 */
export const createSchema = object({
  name: nameSchema.required(),
  phone: phoneSchema.required(),
  password: passwordSchema.required(),
});

/**
 * Schema for updating a partner's data
 * verifies Partner's (name, phone, password) if any of them is provided
 */
export const updateSchema = object({
  name: nameSchema.optional(),
  phone: phoneSchema.optional(),
  password: passwordSchema.optional(),
});
