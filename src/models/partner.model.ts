import mongoose from 'mongoose';
// Types
import PartnerType from '../interfaces/partner.interface';
const Schema = mongoose.Schema;

const partnerSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
      maxlength: 100,
    },
    phone: {
      type: String,
      required: true,
    },
    addresses: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Partner = mongoose.model<PartnerType>('Partner', partnerSchema);
export default Partner;
