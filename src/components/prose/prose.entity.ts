import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
// Entities
import { Poet } from '../poet/poet.entity';

@Entity()
export class Prose {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne((type) => Poet, (poet) => poet.chosenVerses)
  @JoinColumn({ name: 'poet' })
  poet!: Poet;

  @Column({ type: 'varchar', length: 50 })
  tags!: string;

  @Column({ type: 'varchar', length: 300 })
  qoute!: string;

  @Column({ type: 'boolean', default: true })
  reviewed!: boolean;
}
