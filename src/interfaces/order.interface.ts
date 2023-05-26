import { Product, ProductGroup } from './__types__';
export interface OrderType {
  id: string;
  partner?: string;
  products: Product[] | ProductGroup[];
  name: string;
  phone: string;
  address: string;
  reviewed: boolean;
  completed: boolean;
}

export enum ERROR_MSG {
  NOT_AVAILABLE = 'No Order available',
  NOT_FOUND = "Order's not found",
  NOT_VALID = 'Data for Order is not valid',
  // Inner Properties
  NAME = 'name should be letters, and max 50 letters and minimum 4 letters',
  PHONE = 'phone not right or not supported',
  PARTNER = "Partner's not found",
  ADDRESS = 'address can not be empty',
  REVIEWED = 'reviewed should be true or false',
  COMPLETED = 'completed should be true or false',
  PRODUCTS = 'Order must have products',
}
