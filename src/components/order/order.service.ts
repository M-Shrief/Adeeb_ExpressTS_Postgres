// Types
import { OrderType } from '../../interfaces/order.interface';

export class OrderService {
  public async getGuestOrders(name: string, phone: string) {
    // if (orders.length === 0) return false;
    // return orders;
  }

  public async getPartnerOrders(partner: string) {
    // if (orders.length === 0) return false;
    // return orders;
  }

  public async post(orderData: OrderType) {
    // let order;
    // if (orderData.partner) {
    //   order = new Order({
    //     partner: orderData.partner,
    //     name: orderData.name,
    //     phone: orderData.phone,
    //     address: orderData.address,
    //     reviewed: orderData.reviewed,
    //     completed: orderData.completed,
    //     products: orderData.products,
    //   });
    // } else {
    //   order = new Order({
    //     name: orderData.name,
    //     phone: orderData.phone,
    //     address: orderData.address,
    //     reviewed: orderData.reviewed,
    //     completed: orderData.completed,
    //     products: orderData.products,
    //   });
    // }
    // if (!newOrder) return false;
    // return newOrder;
  }

  public async update(id: string, orderData: OrderType) {
    // if (!order) return false;
    // if (!newOrder) return false;
    // return order;
  }

  public async remove(id: string) {
    // if (!order) return false;
    // return order;
  }
}
