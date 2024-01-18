// Database
import { AppDataSource } from '../../db';
// Entities
import { Order } from './order.entity';
// Types
import { DeleteResult, UpdateResult } from 'typeorm';

const db = AppDataSource.getRepository(Order);

export const OrderDB = {
    async getGuestOrders(name: string, phone: string): Promise<Order[]> {
      return await db.find({
        where: { name, phone },
        select: {
          id: true,
          name: true,
          phone: true,
          address: true,
          products: true,
          reviewed: true,
          completed: true,
          created_at: true,
        },
        order: {
          created_at: 'DESC',
        },
      });
    },
  
    async getPartnerOrders(partnerId: string): Promise<Order[]> {
      return await db.find({
        where: { partnerId },
        select: {
          id: true,
          name: true,
          phone: true,
          address: true,
          products: true,
          reviewed: true,
          completed: true,
          partnerId: true,
          created_at: true,
        },
        order: {
          created_at: 'DESC',
        },
      });
    },
  
    async post(orderData: Order): Promise<Order> {
      return await db.save(orderData);
    },
  
    async update(id: string, orderData: Order): Promise<UpdateResult> {
      return  await db.update(id, orderData);
    },
  
    async remove(id: string): Promise<DeleteResult> {
      return await db.delete(id);
    },
  };