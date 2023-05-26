import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
// Types
import { Time_Period } from '../../interfaces/poet.interface';
// Entities
import { Poem } from '../poem/poem.entity';

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

  @OneToMany((type) => Poem, (poem) => poem.poet)
  @JoinColumn({ name: 'poems' })
  poems!: Poem[];
}
