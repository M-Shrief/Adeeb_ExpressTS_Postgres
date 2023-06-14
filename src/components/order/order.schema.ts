import { object, string, boolean, array } from 'yup';
import {
  nameSchema,
  uuidSchema,
  phoneSchema,
  addressSchema,
  versesSchema,
  qouteSchema,
} from '../../schemas';

const customizationSchema = string().min(1).max(10);
const printSchema = object({
  id: uuidSchema.optional(),
  poem: uuidSchema.optional(),
  verses: versesSchema.optional(),
  qoute: qouteSchema.optional(),
});

const productsSchema = array().of(
  object().shape({
    fontType: customizationSchema.required(),
    fontColor: customizationSchema.required(),
    backgroundColor: customizationSchema.required(),
    print: printSchema.optional(),
    prints: array().of(printSchema).optional(),
  }),
);

export const createSchema = object({
  partner: uuidSchema.optional(),
  name: nameSchema.required(),
  phone: phoneSchema.required(),
  address: addressSchema.required(),
  products: productsSchema.required(),
  reviewed: boolean().default(false),
  completed: boolean().default(false),
});

export const updateSchema = object({
  partner: uuidSchema.optional(),
  name: nameSchema.optional(),
  phone: phoneSchema.optional(),
  address: addressSchema.optional(),
  products: productsSchema.optional(),
  reviewed: boolean().optional(),
  completed: boolean().optional(),
});
