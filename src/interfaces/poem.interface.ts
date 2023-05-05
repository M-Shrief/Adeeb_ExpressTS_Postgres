import { VerseType } from './__types__';
import { PoetType } from './poet.interface';

export interface PoemType {
  intro: string;
  poet: string | PoetType['details'];
  verses: VerseType[];
  reviewed: boolean;
}
