import mongoose from 'mongoose';
// Types
import ChosenVerseType from '../interfaces/chosenVerse.interface';
import { VerseType } from '../interfaces/__types__';
const Schema = mongoose.Schema;

const ChosenVerseSchema = new Schema(
  {
    poet: {
      type: Schema.Types.ObjectId,
      ref: 'Poet',
      required: true,
    },
    poem: {
      type: Schema.Types.ObjectId,
      ref: 'Poem',
      required: true,
    },
    tags: {
      type: String,
      required: true,
    },
    verses: [] as VerseType[],
    reviewed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const ChosenVerse = mongoose.model<ChosenVerseType>(
  'ChosenVerse',
  ChosenVerseSchema
);
export default ChosenVerse;
