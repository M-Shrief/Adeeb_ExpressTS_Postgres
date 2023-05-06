import { Product, ProductGroup } from './__types__';
export enum ERROR_MSG {
  NOT_AVAILABLE = 'No Order available',
  NOT_FOUND = "Order's not found",
  NOT_VALID = 'Data for Order is not valid',
}
export interface OrderType {
  _id: string;
  partner?: string;
  products: Product[] | ProductGroup[];
  name: string;
  phone: string;
  address: string;
  reviewed: boolean;
  completed: boolean;
}
