import { object, string, boolean, array } from 'yup';

export const createSchema = object({
  intro: string().min(4).max(50).required(),
  poet: string().uuid().required(),
  verses: array().of(
    object().shape({
      first: string().min(4).max(50).required(),
      sec: string().min(4).max(50).required(),
    }),
  ),
  reviewed: boolean().optional().default(true),
});

export const updateSchema = object({
  intro: string().min(4).max(50).optional(),
  poet: string().uuid().optional(),
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
