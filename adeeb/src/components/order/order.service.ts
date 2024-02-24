// Repository
import {OrderDB} from './order.repository'
// Entities
import { Order } from './order.entity';
// Schema
import { createSchema, updateSchema } from './order.schema';

/**
 * Handle OrderService calls
 */
export const OrderService = {
  /**
   * get all guest's orders. If data is not available, it returns false
   * @returns 
  */
  async getGuestOrders(name: string, phone: string): Promise<Order[] | false> {
    const orders = await OrderDB.getGuestOrders(name, phone);

    if (orders.length === 0) return false;
    return orders;
  },
  /**
   * get all partner's orders. If data is not available, it returns false
   * @returns 
  */
  async getPartnerOrders(partnerId: string): Promise<Order[] | false> {
    const orders = await OrderDB.getPartnerOrders(partnerId);
    if (orders.length === 0) return false;
    return orders;
  },
  /**
   * create a new order. If data is not valid, it returns false
   * @param {Order} orderData - order's data.
   * @returns 
  */
  async post(orderData: Order): Promise<Order | false> {
    const isValid = await createSchema.isValid(orderData);
    if (!isValid) return false;

    const newOrder = await OrderDB.post(orderData);
    if (!newOrder) return false;
    return newOrder;
  },
  /**
   * update a order's data, returns false if order's is not found or data isn't valid.
   * @param {string} id - order's id.
   * @param {Order} orderData - order's data.
   * @returns 
  */
  async update(id: string, orderData: Order): Promise<number | false> {
    const isValid = await updateSchema.isValid(orderData);
    if (!isValid) return false;
    const newOrder = await OrderDB.update(id, orderData);
    if (!newOrder.affected) return false;
    return newOrder.affected;
  },
  /**
   * delete a order, returns false if order's is not found.
   * @param {string} id - order's id.
   * @returns 
  */
  async remove(id: string): Promise<number | false> {
    const order = await OrderDB.remove(id);
    if (!order.affected) return false;
    return order.affected;
  },
};
