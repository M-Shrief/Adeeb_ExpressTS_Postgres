import { VerseType } from './__types__';
import { PoetType } from './poet.interface';
import { PoemType } from './poem.interface';

export interface ChosenVerseType {
  poet: string | PoetType['details'];
  poem: string | PoemType;
  tags: string;
  verses: VerseType[];
  reviewed: boolean;
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
