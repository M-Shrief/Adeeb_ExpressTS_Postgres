// Models
import Poem from '../models/poem.model';
// Types
import PoemType from '../interfaces/poem.interface';
// Utils
import { logger } from '../utils/logger';

export default class PoemService {
  private Poem = new Poem();

  public async getPoemsWithPoetName(): Promise<PoemType[]> {
    return await Poem.find(
      {},
      { intro: 1, poet: 1, verses: 1, reviewed: 1 }
    ).populate('poet', 'name');
  }

  public async getPoemsIntrosWithPoetName(): Promise<PoemType[]> {
    return await Poem.find({}, { intro: 1, poet: 1, reviewed: 1 }).populate(
      'poet',
      'name'
    );
  }

  public async getPoemWithPoet(id: string): Promise<PoemType> {
    return (await Poem.findById(id, {
      intro: 1,
      poet: 1,
      verses: 1,
      reviewed: 1,
    }).populate('poet', ['name', 'bio', 'time_period'])) as PoemType;
  }

  public async post(poemData: PoemType) {
    const poem = new Poem({
      intro: poemData.intro,
      poet: poemData.poet,
      verses: poemData.verses,
      reviewed: poemData.reviewed,
    });
    try {
      return await poem.save();
    } catch (err) {
      return logger.error(err);
    }
  }

  public async update(id: string, poemData: PoemType) {
    const poem = await Poem.findById(id);
    if (poem) {
      return poem
        .updateOne({ $set: poemData })
        .catch((err) => logger.error(err));
    } else {
      logger.error(`Poet not found`);
    }
  }

  public async remove(id: string) {
    return await Poem.findByIdAndRemove(id);
  }
}
