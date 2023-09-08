import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
// Entities
import { Poet } from '../poet/poet.entity';
import { BaseEntity } from '../../shared/baseEntity';

@Entity()
export class Prose extends BaseEntity{
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne((type) => Poet, (poet) => poet.proses)
  @JoinColumn({ name: 'poet' })
  poet!: Poet;

  @Column({ type: 'varchar', length: 50 })
  tags!: string;

  @Column({ type: 'varchar', length: 300 })
  qoute!: string;

  @Column({ type: 'boolean', default: true })
  reviewed!: boolean;
}

export enum ERROR_MSG {
  NOT_AVAILABLE = 'No prose available',
  NOT_FOUND = "Prose's not found",
  NOT_VALID = 'Data for prose is not valid',
  // Query
  NUM = 'Accepts numbers only',
  // Inner properties
  POET = "Poet's not found",
  TAGS = 'tags should be letters, and max 50 letters length',
  QOUTE = 'qoute should be letters, and max 400 letters length',
  REVIEWED = 'reviewed must be true or false',
}
