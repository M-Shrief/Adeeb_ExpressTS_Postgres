import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
// Entities
import { BaseEntity } from '../../interfaces/baseEntity';
// Types
import { Product, ProductGroup } from '../../interfaces/__types__';

/**
 * Order's Entity
 */
@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'partner_id', nullable: true })
  partnerId!: string;

  @Column({ type: 'varchar', length: 50 })
  name!: string;

  @Column({ type: 'varchar', length: 50 })
  phone!: string;

  @Column({ type: 'varchar', length: 50 })
  address!: string;

  @Column({ type: 'jsonb', nullable: false })
  products!: Array<Product | ProductGroup>;

  @Column({ type: 'boolean', default: true })
  reviewed!: boolean;

  @Column({ type: 'boolean', default: true })
  completed!: boolean;
}

/**
 * An Enum of Order's error messages.
 */
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
