import { PoetType } from './poet.interface';

export interface ProseType {
  poet: string | PoetType['details'];
  tags: string;
  qoute: string;
  reviewed: boolean;
}

export enum ERROR_MSG {
  NOT_AVAILABLE = 'No prose available',
  NOT_FOUND = "Prose's not found",
  NOT_VALID = 'Data for prose is not valid',
  // Query
  NUM = 'Accepts numbers only',
  // Inner properties
  POET = "Poet's not found",
  TAGS = 'tags should be letters, and max 50 letters length',
  QOUTE = 'qoute should be letters, and max 400 letters length',
  REVIEWED = 'reviewed must be true or false',
}
