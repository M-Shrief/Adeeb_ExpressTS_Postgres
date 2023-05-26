import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
// entities
import { Poet } from '../poet/poet.entity';
import { VerseType } from '../../interfaces/__types__';
@Entity()
export class Poem {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 50 })
  intro!: string;

  @ManyToOne((type) => Poet, (poet) => poet.poems)
  @JoinColumn({ name: 'poet' })
  poet!: Poet;

  @Column('jsonb', { nullable: false })
  verses!: VerseType[];

  @Column({ type: 'boolean', default: true })
  reviewed!: boolean;
}
