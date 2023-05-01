// Models
import ChosenVerse from '../models/chosenVerse.model';
// Types
import ChosenVerseType from '../interfaces/chosenVerse.interface';
// Utils
import shuffle from '../utils/durstenfeldShuffle';
export default class ChosenVerseService {
  public async getAllWithPoetName(): Promise<ChosenVerseType[]> {
    const chosenVerses = await ChosenVerse.find(
      {},
      { reviewed: 1, tags: 1, verses: 1, poet: 1, poem: 1 }
    ).populate('poet', 'name');
    shuffle(chosenVerses);

    return chosenVerses;
  }

  public async getRandomWithPoetName(num: number): Promise<ChosenVerseType[]> {
    return await ChosenVerse.aggregate([
      { $sample: { size: num } },
      { $unset: ['_id', 'updatedAt', 'createdAt'] },
    ]);
  }

  public async getOneWithPoetName(id: string) {
    return await ChosenVerse.findById(id, {
      reviewed: 1,
      tags: 1,
      verses: 1,
    }).populate('poet', 'name');
  }

  public async post(chosenVerseData: ChosenVerseType) {
    const chosenVerse = new ChosenVerse({
      poet: chosenVerseData.poet,
      poem: chosenVerseData.poem,
      tags: chosenVerseData.tags,
      verses: chosenVerseData.verses,
      reviewed: chosenVerseData.reviewed,
    });
    return await chosenVerse.save();
  }

  public async update(id: string, chosenVerseData: ChosenVerseType) {
    const chosenVerse = await ChosenVerse.findById(id);
    return chosenVerse?.updateOne({ $set: chosenVerseData });
  }

  public async remove(id: string) {
    return await ChosenVerse.findByIdAndRemove(id);
  }
}
