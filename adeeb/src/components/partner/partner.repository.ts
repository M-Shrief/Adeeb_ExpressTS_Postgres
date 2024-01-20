import { AppDataSource } from '../../db';
// Entites
import { Partner } from './partner.entity';
// Types
import { DeleteResult, UpdateResult } from 'typeorm';

const db = AppDataSource.getRepository(Partner);

export const PartnerDB = {
    async getInfo(id: string): Promise<Partner | null> {
      return await db.findOne({
        where: { id },
        select: {
          id: true,
          name: true,
          phone: true,
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
    },
  
    async signup(partnerData: Partner): Promise<Partner> {
      return await db.save(partnerData);
    },
  
    async login(
      phone: string,
    ): Promise<Partner | null> {
      return await db.findOneBy({ phone });
    },
  
    async update(
      id: string,
      partnerData: Partner,
    ): Promise<UpdateResult> {
      return await db.update(id, partnerData);
    },
  
    async remove(id: string): Promise<DeleteResult> {
      return await db.delete(id);
    }
  }
  