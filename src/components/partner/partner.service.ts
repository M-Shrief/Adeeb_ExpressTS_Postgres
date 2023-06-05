import { AppDataSource } from '@/db';
// Entites
import { Partner } from './partner.entity';
// Utils
import { comparePassword, hashPassword } from '@/utils/auth';

export class PartnerService {
  public async getInfo(id: string): Promise<Partner | false> {
    const partner = await AppDataSource.getRepository(Partner).findOne({
      where: { id },
      select: {
        name: true,
        phone: true,
        addresses: true,
        orders: {
          id: true,
          // address: true,
          // reviewed: true,
          // completed: true,
        },
      },
      relations: { orders: true },
      cache: 1000 * 60,
    });
    if (!partner) return false;
    return partner;
  }

  public async signup(partnerData: Partner): Promise<Partner | false> {
    const password = await hashPassword(partnerData.password);
    const partner = new Partner();

    partner.name = partnerData.name;
    partner.phone = partnerData.phone;
    partner.addresses = partnerData.addresses;
    partner.password = password;

    const newPartner = await AppDataSource.getRepository(Partner).save(partner);
    if (!newPartner) return false;
    return partner;
  }

  public async login(
    phone: string,
    password: string,
  ): Promise<Partner | false> {
    const existingPartner = await AppDataSource.getRepository(
      Partner,
    ).findOneBy({ phone });
    if (!existingPartner) return false;
    const isValid = comparePassword(password, existingPartner.password);
    if (!isValid) return false;
    return existingPartner;
  }

  public async update(
    id: string,
    partnerData: Partner,
  ): Promise<Partner | false> {
    const partner = await AppDataSource.getRepository(Partner).findOneBy({
      id,
    });
    if (!partner) return false;
    AppDataSource.getRepository(Partner).merge(partner, partnerData);
    const newPartner = await AppDataSource.getRepository(Partner).save(partner);
    if (!newPartner) return false;
    return newPartner;
  }

  public async remove(id: string): Promise<number | false> {
    const partner = await AppDataSource.getRepository(Partner).delete(id);
    if (!partner.affected) return false;
    return partner.affected;
  }
}
