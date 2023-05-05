import { PoetType } from './poet.interface';
import { PoemType } from './poem.interface';
// General and reused types
export interface VerseType {
  first: string;
  sec: string;
}

export interface Print {
  _id: string;
  peot?: string | PoetType;
  poem?: string | PoemType;
  reviewed: boolean;
  tags?: string;
  verse?: VerseType[];
  qoute?: string;
  first?: string;
  sec?: string;
}
export interface Product {
  _id: string;
  print: Print;
  fontType: string;
  fontColor: string;
  backgroundColor: string;
}
export interface ProductGroup {
  _id: string;
  prints: Print[];
  fontType: string;
  fontColor: string;
  backgroundColor: string;
}
