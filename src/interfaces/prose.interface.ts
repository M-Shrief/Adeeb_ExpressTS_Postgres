import { PoetType } from './poet.interface';

export enum ERROR_MSG {
  NOT_AVAILABLE = 'No prose available',
  NOT_FOUND = "Prose's not found",
  NOT_VALID = 'Data for prose is not valid',
}

export interface ProseType {
  poet: string | PoetType['details'];
  tags: string;
  qoute: string;
  reviewed: boolean;
}
