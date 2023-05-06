// Models
import { Poet } from './poet.model';
import { Poem } from '../poem/poem.model';
import { ChosenVerse } from '../chosenVerse/chosenVerse.model';
import { Prose } from '../prose/prose.mode';
// Types
import { PoetType } from '../../interfaces/poet.interface';
// Utils
import { logger } from '../../utils/logger';
export class PoetService {
  public async getAll(): Promise<PoetType['details'][] | false> {
    const poets = await Poet.find({}, { name: 1, time_period: 1 });
    if (poets.length === 0) return false;
    return poets;
  }

  public async getOneWithLiterature(id: string): Promise<PoetType | false> {
    const [poet, authoredPoems, authoredProses, authoredChosenVerses] =
      await Promise.all([
        Poet.findById(id, { name: 1, bio: 1, time_period: 1 }),
        Poem.find({ poet: id }, { intro: 1, reviewed: 1 }),
        Prose.find({ poet: id }, { tags: 1, qoute: 1 }),
        ChosenVerse.find(
          { poet: id },
          { reviewed: 1, tags: 1, verses: 1, poem: 1 },
        ),
      ]);
    if (!poet) return false;
    return {
      details: poet,
      authoredPoems,
      authoredProses,
      authoredChosenVerses,
    };
  }

  public async post(
    peotData: PoetType['details'],
  ): Promise<PoetType['details'] | false> {
    const poet = new Poet({
      name: peotData.name,
      time_period: peotData.time_period,
      bio: peotData.bio,
      reviewed: peotData.reviewed,
    });
    const newPoet = await poet.save();
    if (!newPoet) return false;
    return newPoet;
  }

  public async update(
    id: string,
    poetData: PoetType,
  ): Promise<PoetType['details'] | false> {
    const poet = await Poet.findById(id);
    if (!poet) return false;
    const newPoet = await poet.updateOne({ $set: poetData });
    if (!newPoet) return false;
    return newPoet;
  }

  public async remove(id: string): Promise<PoetType['details'] | false> {
    const poet = await Poet.findByIdAndRemove(id);
    if (!poet) return false;
    return poet;
  }
}
