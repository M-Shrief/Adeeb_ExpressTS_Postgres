// Repository
import {PartnerDB} from './partner.repository'
// Entites
import { Partner } from './partner.entity';
// Utils
import { comparePassword, hashPassword } from '../../utils/auth';
// Schema
import { createSchema, updateSchema } from './partner.schema';

export const PartnerService = {
  async getInfo(id: string): Promise<Partner | false> {
    const partner = await PartnerDB.getInfo(id);
    if (!partner) return false;
    return partner;
  },
}
