import { object, string, boolean } from 'yup';
import { Time_Period } from '../../interfaces/poet.interface';

export const createSchema = object({
  name: string().min(4).max(50).required(),
  time_period: string().oneOf(Time_Period).required(),
  bio: string().min(4).max(500).required(),
  reviewed: boolean().default(true),
});

export const updateSchema = object({
  name: string().optional().min(2).max(50),
  time_period: string().optional().oneOf(Time_Period),
  bio: string().optional().min(4).max(500),
  reviewed: boolean().optional(),
});
