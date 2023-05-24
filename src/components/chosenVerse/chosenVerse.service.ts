// Types
import { ChosenVerseType } from '../../interfaces/chosenVerse.interface';
// Utils
import { shuffle } from '../../utils/shuffle';
export class ChosenVerseService {
  public async getAllWithPoetName() {
    // if (chosenVerses.length === 0) return false;
    // return chosenVerses;
  }

  public async getRandomWithPoetName(num: number) {
    // if (chosenVerses.length === 0) return false;
    // return chosenVerses;
  }

  public async getOneWithPoetName(id: string) {
    // if (!chosenVerse) return false;
    // return chosenVerse;
  }

  public async post(chosenVerseData: ChosenVerseType) {
    // const chosenVerse = new ChosenVerse({
    //   poet: chosenVerseData.poet,
    //   poem: chosenVerseData.poem,
    //   tags: chosenVerseData.tags,
    //   verses: chosenVerseData.verses,
    //   reviewed: chosenVerseData.reviewed,
    // });
    // if (!newChosenVerse) return false;
    // return newChosenVerse;
  }

  public async update(id: string, chosenVerseData: ChosenVerseType) {
    // if (!chosenVerse) return false;
    // if (!newChosenVerse) return false;
    // return newChosenVerse;
  }

  public async remove(id: string) {
    // if (!poet) return false;
    // return poet;
  }
}
