import mongoose from 'mongoose';
// Types
import ProseType from '../../interfaces/prose.interface';
const Schema = mongoose.Schema;

const proseShema = new Schema(
  {
    poet: {
      type: Schema.Types.ObjectId,
      ref: 'Poet',
      required: true,
    },
    tags: {
      type: String,
      required: true,
    },
    qoute: {
      type: String,
      required: true,
    },
    reviewed: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Prose = mongoose.model<ProseType>('Prose', proseShema);
export default Prose;
