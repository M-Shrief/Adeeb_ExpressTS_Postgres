import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
// Entities
import { Partner } from '../partner/partner.entity';
// Types
import { Product, ProductGroup } from '../../interfaces/__types__';
import { truncate } from 'fs';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne((type) => Partner, (partner) => partner.orders)
  @JoinColumn({ name: 'partner_id' })
  partner!: Partner;

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
