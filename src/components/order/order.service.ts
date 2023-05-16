import { OrderType } from '../../interfaces/order.interface';
import { Order } from './order.model';

export class OrderService {
  public async getGuestOrders(
    name: string,
    phone: string,
  ): Promise<OrderType[] | false> {
    const orders = await Order.find(
      { name, phone },
      { name: 1, phone: 1, address: 1, reviewed: 1, completed: 1, products: 1 },
    );
    if (orders.length === 0) return false;
    return orders;
  }

  public async getPartnerOrders(partner: string): Promise<OrderType[] | false> {
    const orders = await Order.find(
      { partner },
      {
        partner: 1,
        name: 1,
        phone: 1,
        address: 1,
        reviewed: 1,
        completed: 1,
        products: 1,
      },
    );
    if (orders.length === 0) return false;
    return orders;
  }

  public async post(orderData: OrderType): Promise<OrderType | false> {
    let order;
    if (orderData.partner) {
      order = new Order({
        partner: orderData.partner,
        name: orderData.name,
        phone: orderData.phone,
        address: orderData.address,
        reviewed: orderData.reviewed,
        completed: orderData.completed,
        products: orderData.products,
      });
    } else {
      order = new Order({
        name: orderData.name,
        phone: orderData.phone,
        address: orderData.address,
        reviewed: orderData.reviewed,
        completed: orderData.completed,
        products: orderData.products,
      });
    }

    const newOrder = await order.save();
    if (!newOrder) return false;
    return newOrder;
  }

  public async update(
    id: string,
    orderData: OrderType,
  ): Promise<OrderType | false> {
    const order = await Order.findById(id);
    if (!order) return false;
    const newOrder = await order.updateOne({ $set: orderData });
    if (!newOrder) return false;
    // return newOrder;
    return order;
  }

  public async remove(id: string): Promise<OrderType | false> {
    const order = await Order.findByIdAndRemove(id);
    if (!order) return false;
    return order;
  }
}
