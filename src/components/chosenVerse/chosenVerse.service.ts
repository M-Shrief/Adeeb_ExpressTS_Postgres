// Models
import { ChosenVerse } from './chosenVerse.model';
// Types
import { ChosenVerseType } from '../../interfaces/chosenVerse.interface';
// Utils
import { shuffle } from '../../utils/shuffle';
export class ChosenVerseService {
  public async getAllWithPoetName(): Promise<ChosenVerseType[] | false> {
    const chosenVerses = await ChosenVerse.find(
      {},
      { reviewed: 1, tags: 1, verses: 1, poet: 1, poem: 1 },
    ).populate('poet', 'name');
    shuffle(chosenVerses);
    if (chosenVerses.length === 0) return false;
    return chosenVerses;
  }

  public async getRandomWithPoetName(
    num: number,
  ): Promise<ChosenVerseType[] | false> {
    const chosenVerses = await ChosenVerse.aggregate([
      { $sample: { size: num } },
      { $unset: ['_id', 'updatedAt', 'createdAt'] },
    ]);

    if (chosenVerses.length === 0) return false;
    return chosenVerses;
  }

  public async getOneWithPoetName(
    id: string,
  ): Promise<ChosenVerseType | false> {
    const chosenVerse = await ChosenVerse.findById(id, {
      reviewed: 1,
      tags: 1,
      verses: 1,
    }).populate('poet', 'name');
    if (!chosenVerse) return false;
    return chosenVerse;
  }

  public async post(
    chosenVerseData: ChosenVerseType,
  ): Promise<ChosenVerseType | false> {
    const chosenVerse = new ChosenVerse({
      poet: chosenVerseData.poet,
      poem: chosenVerseData.poem,
      tags: chosenVerseData.tags,
      verses: chosenVerseData.verses,
      reviewed: chosenVerseData.reviewed,
    });
    const newChosenVerse = await chosenVerse.save();
    if (!newChosenVerse) return false;
    return newChosenVerse;
  }

  public async update(
    id: string,
    chosenVerseData: ChosenVerseType,
  ): Promise<ChosenVerseType | false> {
    const chosenVerse = await ChosenVerse.findById(id);
    if (!chosenVerse) return false;
    const newChosenVerse = await chosenVerse.updateOne({
      $set: chosenVerseData,
    });
    if (!newChosenVerse) return false;
    return newChosenVerse;
  }

  public async remove(id: string): Promise<ChosenVerseType | false> {
    const poet = await ChosenVerse.findByIdAndRemove(id);
    if (!poet) return false;
    return poet;
  }
}
