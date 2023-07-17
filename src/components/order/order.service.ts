// Database
import { AppDataSource } from '../../db';
// Redis
import redisClient from '../../redis';
import { logger } from '../../utils/logger';
// Entities
import { Order } from './order.entity';
// Schema
import { createSchema, updateSchema } from './order.schema';
export class OrderService {
  private orderRepository = AppDataSource.getRepository(Order);
  public async getGuestOrders(
    name: string,
    phone: string,
  ): Promise<Order[] | false> {
    let orders: Order[];
    
    const cached =  await redisClient.get(`orders:${name}:${phone}`);
    if(cached) {
      orders  = JSON.parse(cached);
    } else {
      orders = await this.orderRepository.find({
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
        // order: {
        //   createdAt: 'DESC'  
        // }
      });
  
      await redisClient.set(`orders:${name}:${phone}`, JSON.stringify(orders), {EX: 60*15})
      .catch(err => logger.error(err));
    }
    if (orders.length === 0) return false;
    return orders;
  }

  public async getPartnerOrders(partnerId: string): Promise<Order[] | false> {
    let orders: Order[];
    
    const cached =  await redisClient.get(`orders:partner:${partnerId}`);
    if(cached) {
      orders  = JSON.parse(cached);
    } else {
      orders = await this.orderRepository.find({
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
        // order: {
        //   createdAt: 'DESC'  
        // }
      });  

      await redisClient.set(`orders:partner:${partnerId}`, JSON.stringify(orders), {EX: 60*15})
      .catch(err => logger.error(err));
    }
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

    const newOrder = await this.orderRepository.save(order);
    if (!newOrder) return false;
    return newOrder;
  }

  public async update(id: string, orderData: Order): Promise<number | false> {
    const isValid = await updateSchema.isValid(orderData);
    if (!isValid) return false;
    const newOrder = await this.orderRepository.update(id, orderData);
    if (!newOrder.affected) return false;
    return newOrder.affected;
  }

  public async remove(id: string): Promise<number | false> {
    const order = await this.orderRepository.delete(id);
    if (!order.affected) return false;
    return order.affected;
  }
}
