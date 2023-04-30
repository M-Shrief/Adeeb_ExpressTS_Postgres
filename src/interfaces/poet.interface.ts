import ChosenVerseType from './chosenVerse.interface';
import PoemType from './poem.interface';
import ProseType from './prose.interface';
export default interface PoetType {
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
