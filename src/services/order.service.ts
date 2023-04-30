import OrderType from '../interfaces/order.interface';
import Order from '../models/order.model';

export default class OrderService {
  public async getGuestOrders(
    name: string,
    phone: string
  ): Promise<OrderType[]> {
    return await Order.find({ name, phone }, {});
  }

  public async getPartnerOrders(partner: string): Promise<OrderType[]> {
    return await Order.find({ partner });
  }

  public async post(orderData: OrderType) {
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

    return await order.save();
  }

  public async update(id: string, orderData: OrderType) {
    const order = Order.findById(id);

    return await order.updateOne({ $set: orderData });
  }

  public async remove(id: string) {
    return await Order.findByIdAndRemove(id);
  }
}
