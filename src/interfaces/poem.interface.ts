import { VerseType } from './__types__';
import PoetType from './poet.interface';

export default interface PoemType {
  intro: string;
  poet: string | PoetType['details'];
  verses: VerseType[];
  reviewed: boolean;
}
