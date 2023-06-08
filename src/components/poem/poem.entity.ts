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
// Types
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

  @OneToMany((type) => ChosenVerse, (chosenVerse) => chosenVerse.poem)
  @JoinColumn({ name: 'chosenverses' })
  chosenVerses!: ChosenVerse[];

  @Column('jsonb', { nullable: false })
  verses!: VerseType[];

  @Column({ type: 'boolean', default: true })
  reviewed!: boolean;
}
