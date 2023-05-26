import { VerseType } from './__types__';
import { PoetType } from './poet.interface';

export interface PoemType {
  id: string;
  intro: string;
  poet: string | PoetType['details'];
  verses: VerseType[];
  reviewed: boolean;
}

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
