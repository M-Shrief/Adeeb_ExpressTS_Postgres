import { object, string, boolean } from 'yup';
import { Time_Period } from './poet.constants';

export const uuidSchema = string().uuid().required();

export const createSchema = object({
  name: string().defined(),
  time_period: string().oneOf(Time_Period),
  bio: string().min(4).max(500),
  reviewed: boolean().optional(),
});

export const updateSchema = object({
  name: string().optional().defined().min(2).max(50),
  time_period: string().optional().oneOf(Time_Period),
  bio: string().optional().min(4).max(500),
  reviewed: boolean().optional(),
});
