import { PoetType } from './poet.interface';
import { PoemType } from './poem.interface';
// General and reused types
export interface VerseType {
  first: string;
  sec: string;
}

export interface Print {
  id?: string;
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
  print: Print;
  fontType: string;
  fontColor: string;
  backgroundColor: string;
}
export interface ProductGroup {
  prints: Print[];
  fontType: string;
  fontColor: string;
  backgroundColor: string;
}
