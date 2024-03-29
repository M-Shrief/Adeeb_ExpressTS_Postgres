import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';

// Entities
import { Poem } from '../poem/poem.entity';
import { ChosenVerse } from '../chosenVerse/chosenVerse.entity';
import { Prose } from '../prose/prose.entity';
import { BaseEntity } from '../../interfaces/baseEntity';
export type TimePeriodType =
  | 'جاهلي'
  | 'أموي'
  | 'عباسي'
  | 'أندلسي'
  | 'عثماني ومملوكي'
  | 'متأخر وحديث';

/**
 * Poet's Entity
 */
@Entity()
export class Poet extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  name!: string;

  @Column({
    type: 'enum',
    enum: ['جاهلي', 'أموي', 'عباسي', 'أندلسي', 'عثماني ومملوكي', 'متأخر وحديث'],
  })
  time_period!: TimePeriodType;

  @Column({
    type: 'varchar',
    length: 500,
  })
  bio!: string;

  @Column('boolean', { default: true })
  reviewed!: boolean;

  @OneToMany((type) => Poem, (poem) => poem.poet)
  @JoinColumn({ name: 'poems' })
  poems!: Poem[];

  @OneToMany((type) => ChosenVerse, (chosenVerse) => chosenVerse.poet)
  @JoinColumn({ name: 'chosenverses' })
  chosenVerses!: ChosenVerse[];

  @OneToMany((type) => Prose, (prose) => prose.poet)
  @JoinColumn({ name: 'proses' })
  proses!: Prose[];
}

/**
 * An Enum of Poet's error messages.
 */
export enum ERROR_MSG {
  NOT_AVAILABLE = 'No poet available',
  NOT_FOUND = "Poet's not found",
  NOT_VALID = 'Data for poet is not valid',
  // Inner Properties
  NAME = 'name should be letters, and max 50 letters length',
  TIME_PERIOD = 'time_period should be letters, and max 50 letters length',
  BIO = 'bio should be letters, and max 500 letters length',
  REVIEWED = 'reviewed should be true or false',
}
