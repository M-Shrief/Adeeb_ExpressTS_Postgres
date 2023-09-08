import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
// Entites
import { Order } from '../order/order.entity';
import { BaseEntity } from '../../interfaces/baseEntity';

@Entity()
export class Partner extends BaseEntity{
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 50 })
  name!: string;

  @Column({ type: 'varchar', length: 50 })
  phone!: string;

  @Column({ type: 'varchar', length: 100 })
  password!: string;

  @OneToMany((type) => Order, (order) => order.partner)
  @JoinColumn({ name: 'orders' })
  orders!: Order;
}

export enum ERROR_MSG {
  NOT_FOUND = "Partner's not found",
  NOT_VALID = 'Data for partner is not valid',
  // Inner properties
  NAME = 'name should be contain letters, and less than 50 in length',
  PHONE = 'phone not right or not supported',
  ADDRESS = 'address can not be empty',
  PASSWORD = 'Password should contain: lowercase and uppercase letters, numbers, and symbols(*&^%%$#!@)',
}
