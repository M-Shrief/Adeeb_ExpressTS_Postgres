import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
// entities
import { Poet } from '../poet/poet.entity';
import { ChosenVerse } from '../chosenVerse/chosenVerse.entity';
import { BaseEntity } from '../../interfaces/baseEntity';
// Types
import { Verse } from '../../interfaces/__types__';

/**
 * Poem's Entity
 */
@Entity()
export class Poem extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  intro!: string;

  @ManyToOne((type) => Poet, (poet) => poet.poems)
  @JoinColumn({ name: 'poet' })
  poet!: Poet;

  @OneToMany((type) => ChosenVerse, (chosenVerse) => chosenVerse.poem)
  @JoinColumn({ name: 'chosenverses' })
  chosenVerses!: ChosenVerse[];

  @Column('jsonb', { nullable: false })
  verses!: Verse[];

  @Column({ type: 'boolean', default: true })
  reviewed!: boolean;
}

/**
 * An Enum of Poem's error messages.
 */
export enum ERROR_MSG {
  NOT_AVAILABLE = 'No poem available',
  NOT_FOUND = "Poem's not found",
  NOT_VALID = 'Data for poem is not valid',
  // for inner Properties
  INTRO = 'intro should be letters, and max 50 letters length',
  POET = "Poet's not found",
  VERSES = "Verses must be strings, and can't be empty.",
  REVIEWED = 'reviewed should be true or false',
}
