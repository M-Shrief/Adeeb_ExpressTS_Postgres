import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
// Entities
import { Poet } from '../poet/poet.entity';
import { Poem } from '../poem/poem.entity';
// Types
import { VerseType } from '../../interfaces/__types__';

@Entity()
export class ChosenVerse {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne((type) => Poet, (poet) => poet.chosenVerses)
  @JoinColumn({ name: 'poet' })
  poet!: Poet;

  @ManyToOne((type) => Poem, (poem) => poem.chosenVerses)
  @JoinColumn({ name: 'poem' })
  poem!: Poem;

  @Column({ type: 'varchar', length: 50 })
  tags!: string;

  @Column('jsonb', { nullable: false })
  verses!: VerseType[];

  @Column({ type: 'boolean', default: true })
  reviewed!: boolean;
}
