// Models
import Poet from '../models/poet.model';
import Poem from '../models/poem.model';
import ChosenVerse from '../models/chosenVerse.model';
import Prose from '../models/prose.mode';
// Types
import PoetType from '../interfaces/poet.interface';
// Utils
import { logger } from '../utils/logger';

export default class PoetService {
  public async getAll(): Promise<PoetType[]> {
    return await Poet.find({}, { name: 1, time_period: 1 });
  }

  public async getOneWithLiterature(id: string) {
    const [poet, authoredPoems, authoredProses, authoredChosenVerses] =
      await Promise.all([
        Poet.findById(id, { name: 1, bio: 1, time_period: 1 }),
        Poem.find({ poet: id }, { intro: 1, reviewed: 1 }),
        Prose.find({ poet: id }, { tags: 1, qoute: 1 }),
        ChosenVerse.find(
          { poet: id },
          { reviewed: 1, tags: 1, verse: 1, poem: 1 }
        ),
      ]);

    return {
      details: poet,
      authoredPoems,
      authoredProses,
      authoredChosenVerses,
    };
  }

  public async post(peotData: PoetType) {
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
