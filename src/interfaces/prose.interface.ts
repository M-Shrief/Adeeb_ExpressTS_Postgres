import { PoetType } from './poet.interface';

export interface ProseType {
  poet: string | PoetType['details'];
  tags: string;
  qoute: string;
  reviewed: boolean;
}
