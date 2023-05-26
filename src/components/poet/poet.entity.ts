import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
// Types
import { Time_Period } from '../../interfaces/poet.interface';

@Entity()
export class Poet {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  name!: string;

  @Column({
    type: 'enum',
    enum: ['جاهلي', 'أموي', 'عباسي', 'أندلسي', 'عثماني ومملوكي', 'متأخر وحديث'],
  })
  time_period!: Time_Period;

  @Column({
    type: 'varchar',
    length: 400,
  })
  bio!: string;

  @Column('boolean', { default: true })
  reviewed!: boolean;
}
