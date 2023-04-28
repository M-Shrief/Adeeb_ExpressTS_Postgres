import mongoose from 'mongoose';
// Types
import PoemType from '../interfaces/poem.interface';
import { VerseType } from '../interfaces/__types__';
const Schema = mongoose.Schema;

const poemSchema = new Schema(
  {
    intro: {
      type: String,
      required: true,
    },
    poet: { type: Schema.Types.ObjectId, ref: 'Poet', required: true },
    verses: [] as VerseType[],
    reviewed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Poem = mongoose.model<PoemType>('Poem', poemSchema);
export default Poem;
