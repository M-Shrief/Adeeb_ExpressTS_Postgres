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

  async signup(partnerData: Partner): Promise<Partner | false> {
    const isValid = await createSchema.isValid(partnerData);
    if (!isValid) return false;

    const password = await hashPassword(partnerData.password);
    const partner = new Partner();

    partner.name = partnerData.name;
    partner.phone = partnerData.phone;
    partner.password = password;

    const newPartner = await PartnerDB.signup(partner);
    if (!newPartner) return false;
    return newPartner;
  },

  async login(
    phone: string,
    password: string,
  ): Promise<Partner | false> {
    const existingPartner = await PartnerDB.login(phone);
    if (!existingPartner) return false;
    const isValid = await comparePassword(password, existingPartner.password);
    if (!isValid) return false;
    return existingPartner;
  },

  async update(
    id: string,
    partnerData: Partner,
  ): Promise<number | false> {
    const isValid = await updateSchema.isValid(partnerData);
    if (!isValid) return false;

    const newPartner = await PartnerDB.update(id, partnerData);
    if (!newPartner.affected) return false;
    return newPartner.affected;
  },

  async remove(id: string): Promise<number | false> {
    const partner = await PartnerDB.remove(id);
    if (!partner.affected) return false;
    return partner.affected;
  }
}