import { VerseType } from './__types__';
import PoetType from './poet.interface';
import PoemType from './poem.interface';

export default interface ChosenVerseType {
  poet: string | PoetType['details'];
  poem: string | PoemType;
  tags: string;
  verses: VerseType[];
  reviewed: boolean;
}
