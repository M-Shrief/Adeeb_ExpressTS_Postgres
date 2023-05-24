// Types
import { PartnerType } from '../../interfaces/partner.interface';
// Utils
import { comparePassword, hashPassword } from '../../utils/auth';

export class PartnerService {
  public async getInfo(id: string) {
    // if (!partner) return false;
    // return partner;
  }

  public async signup(partnerData: PartnerType) {
    // const password = await hashPassword(partnerData.password);
    // const partner = new Partner({
    //   name: partnerData.name,
    //   phone: partnerData.phone,
    //   address: partnerData.address,
    //   password,
    // });
    // if (!newPartner) return false;
    // return partner;
  }

  public async login(phone: string, password: string) {
    // if (!existingPartner) return false;
    // const isValid = comparePassword(password, existingPartner.password);
    // if (!isValid) return false;
    // return existingPartner;
  }

  public async update(id: string, partnerData: PartnerType) {
    // if (!partner) return false;
    // if (!newPartner) return false;
    // return newPartner;
  }

  public async remove(id: string) {
    // if (!partner) return false;
    // return partner;
  }
}
