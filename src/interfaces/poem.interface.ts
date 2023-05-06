import { VerseType } from './__types__';
import { PoetType } from './poet.interface';

export enum ERROR_MSG {
  NOT_AVAILABLE = 'No poem available',
  NOT_FOUND = "Poem's not found",
  NOT_VALID = 'Data for poem is not valid',
}

export interface PoemType {
  intro: string;
  poet: string | PoetType['details'];
  verses: VerseType[];
  reviewed: boolean;
}
