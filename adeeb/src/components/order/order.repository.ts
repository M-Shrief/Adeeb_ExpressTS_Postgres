// Database
import { AppDataSource } from '../../db';
// Entities
import { Order } from './order.entity';
// Types
import { DeleteResult, UpdateResult } from 'typeorm';

const db = AppDataSource.getRepository(Order);

/**
 * Used to access Database's Order repository.
 */
export const OrderDB = {
  /**
   * Returns an array of Guest's orders
   * @param {string} name - guest's name
   * @param {string} phone - guest's phone
   * @returns
   */
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
  /**
   * Returns an array of Partner's orders
   * @param {string} partnerId - Partner's id
   * @returns
   */
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
  /**
   * Create an Order
   * @param {Order} orderData - order's data
   * @returns
   */
  async post(orderData: Order): Promise<Order> {
    return await db.save(orderData);
  },
  /**
   * Update an Order
   * @param {string} id - order's id
   * @param {Order} orderData - order's data
   * @returns
   */
  async update(id: string, orderData: Order): Promise<UpdateResult> {
    return await db.update(id, orderData);
  },
  /**
   * Delete an Order
   * @param {string} id - order's id
   * @returns
   */
  async remove(id: string): Promise<DeleteResult> {
    return await db.delete(id);
  },
};
