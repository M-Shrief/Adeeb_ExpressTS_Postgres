import { VerseType } from './__types__';
import { PoetType } from './poet.interface';
import { PoemType } from './poem.interface';

export enum ERROR_MSG {
  NOT_AVAILABLE = 'No chosenVerse available',
  NOT_FOUND = "chosenVerse's not found",
  NOT_VALID = 'Data for chosenVerse is not valid',
}

export interface ChosenVerseType {
  poet: string | PoetType['details'];
  poem: string | PoemType;
  tags: string;
  verses: VerseType[];
  reviewed: boolean;
}
