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
import { BaseEntity } from '../../shared/baseEntity';
// Types
import { VerseType } from '../../interfaces/__types__';

@Entity()
export class ChosenVerse extends BaseEntity{
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


export enum ERROR_MSG {
  NOT_AVAILABLE = 'No chosenVerse available',
  NOT_FOUND = "chosenVerse's not found",
  NOT_VALID = 'Data for chosenVerse is not valid',
  // query
  NUM = 'Accepts numbers only',
  // Inner properties
  POET = "poet's not found",
  POEM = "poem's not found",
  TAGS = 'tags should be letters, and max 50 letters length',
  VERSES = "Verses must be strings, and can't be empty.",
  REVIEWED = 'reviewed should be true or false',
}
