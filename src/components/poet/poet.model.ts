import mongoose from 'mongoose';
// Types
import { PoetType } from '../../interfaces/poet.interface';

const Schema = mongoose.Schema;
const poetSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    time_period: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    reviewed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Poet = mongoose.model<PoetType['details']>('Poet', poetSchema);
