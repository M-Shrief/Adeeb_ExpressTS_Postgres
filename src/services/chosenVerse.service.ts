// Models
import ChosenVerse from '../models/chosenVerse.model';
// Types
import ChosenVerseType from '../interfaces/chosenVerse.interface';

export default class chosenVerseService {
  public async getChosenVerseWithPoetName(): Promise<ChosenVerseType[]> {
    return await ChosenVerse.find(
      {},
      { reviewed: 1, tags: 1, verse: 1, poet: 1, poem: 1 }
    ).populate('poet', 'name');
  }
}
