import { VerseType } from './__types__';

export default interface ChosenVerseType {
  poet: string;
  poem: string;
  tags: string;
  verses: VerseType[];
  reviewed: boolean;
}
