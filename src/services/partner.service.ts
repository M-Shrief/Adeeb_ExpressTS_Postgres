// Models
import Partner from '../models/partner.model';
// Types
import PartnerType from '../interfaces/partner.interface';
// Utils
import { comparePassword, hashPassword } from '../utils/auth';
import { logger } from '../utils/logger';

export default class PartnerService {
  public async getInfo(id: string): Promise<PartnerType> {
    return (await Partner.findById(id, {
      fullname: 1,
      address: 1,
      phone: 1,
    })) as PartnerType;
  }

  public async signup(partnerData: PartnerType) {
    const password = await hashPassword(partnerData.password);

    const partner = new Partner({
      name: partnerData.name,
      phone: partnerData.phone,
      address: partnerData.address,
      password,
    });

    return await partner.save();
  }

  public async login(phone: string, password: string) {
    const existingPartner = await Partner.findOne(
      { phone },
      { name: 1, phone: 1, address: 1, password: 1 }
    );
    if (!existingPartner) return false;

    const isValid = comparePassword(password, existingPartner.password);
    if (!isValid) return false;

    return existingPartner;
  }

  public async update(id: string, partnerData: PartnerType) {
    const partner = await Partner.findById(id);
    return partner?.updateOne({ $set: partnerData });
  }

  public async remove(id: string) {
    return await Partner.findByIdAndRemove(id);
  }
}
