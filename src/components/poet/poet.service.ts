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
  public async getAll(): Promise<PoetType['details'][]> {
    return await Poet.find({}, { name: 1, time_period: 1 });
  }

  public async getOneWithLiterature(id: string): Promise<PoetType | void> {
    const [poet, authoredPoems, authoredProses, authoredChosenVerses] =
      await Promise.all([
        Poet.findById(id, { name: 1, bio: 1, time_period: 1 }),
        Poem.find({ poet: id }, { intro: 1, reviewed: 1 }),
        Prose.find({ poet: id }, { tags: 1, qoute: 1 }),
        ChosenVerse.find(
          { poet: id },
          { reviewed: 1, tags: 1, verses: 1, poem: 1 }
        ),
      ]);
    if (!poet) return;
    return {
      details: poet,
      authoredPoems,
      authoredProses,
      authoredChosenVerses,
    };
  }

  public async post(peotData: PoetType['details']) {
    const poet = new Poet({
      name: peotData.name,
      time_period: peotData.time_period,
      bio: peotData.bio,
      reviewed: peotData.reviewed,
    });

    try {
      return await poet.save();
    } catch (err) {
      return logger.error(err);
    }
  }

  public async update(id: string, poetData: PoetType) {
    const poet = await Poet.findById(id);

    if (poet) {
      return poet
        .updateOne({ $set: poetData })
        .catch((err) => logger.error(err));
    } else {
      logger.error(`Poet not found`);
    }
  }

  public async remove(id: string) {
    return await Poet.findByIdAndRemove(id);
  }
}
