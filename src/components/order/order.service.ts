// Repository
import {OrderDB} from './order.repository'
// Entities
import { Order } from './order.entity';
// Schema
import { createSchema, updateSchema } from './order.schema';

export const OrderService = {
  async getGuestOrders(name: string, phone: string): Promise<Order[] | false> {
    const orders = await OrderDB.getGuestOrders(name, phone);

    if (orders.length === 0) return false;
    return orders;
  },

  async getPartnerOrders(partnerId: string): Promise<Order[] | false> {
    const orders = await OrderDB.getPartnerOrders(partnerId);
    if (orders.length === 0) return false;
    return orders;
  },

  async post(orderData: Order): Promise<Order | false> {
    const isValid = await createSchema.isValid(orderData);
    if (!isValid) return false;

    const newOrder = await OrderDB.post(orderData);
    if (!newOrder) return false;
    return newOrder;
  },

  async update(id: string, orderData: Order): Promise<number | false> {
    const isValid = await updateSchema.isValid(orderData);
    if (!isValid) return false;
    const newOrder = await OrderDB.update(id, orderData);
    if (!newOrder.affected) return false;
    return newOrder.affected;
  },

  async remove(id: string): Promise<number | false> {
    const order = await OrderDB.remove(id);
    if (!order.affected) return false;
    return order.affected;
  },
};
