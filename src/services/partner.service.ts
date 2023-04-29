// Models
import Partner from '../models/partner.model';
// Types
import PartnerType from '../interfaces/partner.interface';

export default class PartnerService {
  public async getInfo(id: string): Promise<PartnerType> {
    return (await Partner.findById(id, {
      fullname: 1,
      address: 1,
      phone: 1,
    })) as PartnerType;
  }
}
