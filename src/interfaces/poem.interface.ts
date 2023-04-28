import { VerseType } from './__types__';

export default interface PoemType {
  intro: string;
  poet: string;
  verses: VerseType[];
  reviewed: boolean;
}
