import { ChosenVerseType } from './chosenVerse.interface';
import { PoemType } from './poem.interface';
import { ProseType } from './prose.interface';

export enum ERROR_MSG {
  NOT_AVAILABLE = 'No poet available',
  NOT_FOUND = "Poet's not found",
  NOT_VALID = 'Data for poet is not valid',
}
export interface PoetType {
  details: {
    _id: string;
    name: string;
    time_period: string;
    bio: string;
    reviewed: boolean;
  };
  authoredPoems: PoemType[];
  authoredChosenVerses: ChosenVerseType[];
  authoredProses: ProseType[];
}
