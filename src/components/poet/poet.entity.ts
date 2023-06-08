import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { TimePeriodType } from '../../interfaces/poet.interface';
// Entities
import { Poem } from '../poem/poem.entity';
import { ChosenVerse } from '../chosenVerse/chosenVerse.entity';
import { Prose } from '../prose/prose.entity';

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
