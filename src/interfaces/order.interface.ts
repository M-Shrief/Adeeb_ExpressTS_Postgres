import { Product, ProductGroup } from './__types__';

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
