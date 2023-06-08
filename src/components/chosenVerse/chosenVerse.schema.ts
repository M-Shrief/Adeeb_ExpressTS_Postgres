import { object, string, boolean, array } from 'yup';

export const createSchema = object({
  poet: string().uuid().required(),
  poem: string().uuid().required(),
  tags: string().min(4).max(50).required(),
  verses: array()
    .of(
      object().shape({
        first: string().min(4).max(50).required(),
        sec: string().min(4).max(50).required(),
      }),
    )
    .required(),
  reviewed: boolean().default(true),
});

export const updateSchema = object({
  poet: string().uuid().optional(),
  poem: string().uuid().optional(),
  tags: string().min(4).max(50).optional(),
  verses: array()
    .of(
      object().shape({
        first: string().min(4).max(50).required(),
        sec: string().min(4).max(50).required(),
      }),
    )
    .optional(),
  reviewed: boolean().optional(),
});
