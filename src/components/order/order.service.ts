import { AppDataSource } from '../../db';
// Entities
import { Order } from './order.entity';
// Schema
import { createSchema, updateSchema } from './order.schema';
export class OrderService {
  public async getGuestOrders(
    name: string,
    phone: string,
  ): Promise<Order[] | false> {
    const orders = await AppDataSource.getRepository(Order).find({
      where: { name, phone },
      select: {
        id: true,
        name: true,
        phone: true,
        address: true,
        products: true,
        reviewed: true,
        completed: true,
      },
    });
    if (orders.length === 0) return false;
    return orders;
  }

  public async getPartnerOrders(partnerId: string): Promise<Order[] | false> {
    const orders = await AppDataSource.getRepository(Order).find({
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
      },
    });
    if (orders.length === 0) return false;
    return orders;
  }

  public async post(orderData: Order): Promise<Order | false> {
    const isValid = await createSchema.isValid(orderData);
    if (!isValid) return false;

    const order = new Order();
    if (orderData.partner) order.partner = orderData.partner;
    order.name = orderData.name;
    order.phone = orderData.phone;
    order.address = orderData.address;
    order.reviewed = orderData.reviewed;
    order.completed = orderData.completed;
    order.products = orderData.products;

    const newOrder = await AppDataSource.getRepository(Order).save(order);
    if (!newOrder) return false;
    return newOrder;
  }

  public async update(id: string, orderData: Order): Promise<number | false> {
    const isValid = await updateSchema.isValid(orderData);
    if (!isValid) return false;
    const newOrder = await AppDataSource.getRepository(Order).update(
      id,
      orderData,
    );
    if (!newOrder.affected) return false;
    return newOrder.affected;
  }

  public async remove(id: string): Promise<number | false> {
    const order = await AppDataSource.getRepository(Order).delete(id);
    if (!order.affected) return false;
    return order.affected;
  }
}
