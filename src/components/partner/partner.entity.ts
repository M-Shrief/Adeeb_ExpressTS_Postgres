import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from '../order/order.entity';

@Entity()
export class Partner {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 50 })
  name!: string;

  @Column({ type: 'varchar', length: 50 })
  phone!: string;

  @Column({ type: 'varchar', array: true, nullable: false })
  addresses!: string[];

  @Column({ type: 'varchar', length: 100 })
  password!: string;

  @OneToMany((type) => Order, (order) => order.partner)
  @JoinColumn({ name: 'orders' })
  orders!: Order;
}
