import { ChosenVerseType } from './chosenVerse.interface';
import { PoemType } from './poem.interface';
import { ProseType } from './prose.interface';

export interface PoetType {
  details: {
    id: string;
    name: string;
    time_period: Time_Period;
    bio: string;
    reviewed: boolean;
  };
  authoredPoems: PoemType[];
  authoredChosenVerses: ChosenVerseType[];
  authoredProses: ProseType[];
}

export type Time_Period =
  | 'جاهلي'
  | 'أموي'
  | 'عباسي'
  | 'أندلسي'
  | 'عثماني ومملوكي'
  | 'متأخر وحديث';

export enum ERROR_MSG {
  NOT_AVAILABLE = 'No poet available',
  NOT_FOUND = "Poet's not found",
  NOT_VALID = 'Data for poet is not valid',
  // Inner Properties
  NAME = 'name should be letters, and max 50 letters length',
  TIME_PERIOD = 'time_period should be letters, and max 50 letters length',
  BIO = 'bio should be letters, and max 300 letters length',
  REVIEWED = 'reviewed should be true or false',
}
