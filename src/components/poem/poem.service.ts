import { AppDataSource } from '../../db';
// Entities
import { Poem } from './poem.entity';
export class PoemService {
  public async getAllWithPoetName(): Promise<Poem[] | false> {
    const poems = await AppDataSource.getRepository(Poem).find({
      select: {
        id: true,
        intro: true,
        verses: true,
        reviewed: true,
        poet: {
          name: true,
          time_period: true,
        },
      },
      relations: { poet: true },
      cache: true, // Default cache lifetime is equal to 1000 ms, this means that if users open the user page 150 times within 3 seconds, only three queries will be executed
      // skip: 10 // for offset
      // take: 10 // limit
    });
    if (poems.length === 0) return false;
    return poems;
  }

  public async getAllIntrosWithPoetName(): Promise<Poem[] | false> {
    const poems = await AppDataSource.getRepository(Poem).find({
      select: {
        id: true,
        intro: true,
        reviewed: true,
        poet: {
          name: true,
        },
      },
      relations: { poet: true },
      cache: true, // Default cache lifetime is equal to 1000 ms, this means that if users open the user page 150 times within 3 seconds, only three queries will be executed
    });
    if (poems.length === 0) return false;
    return poems;
  }

  public async getOneWithPoet(id: string): Promise<Poem | false> {
    const poem = await AppDataSource.getRepository(Poem).findOne({
      where: { id },
      select: {
        id: true,
        intro: true,
        verses: true,
        reviewed: true,
        poet: {
          name: true,
          time_period: true,
          bio: true,
        },
      },
      relations: { poet: true },
      cache: true, // Default cache lifetime is equal to 1000 ms, this means that if users open the user page 150 times within 3 seconds, only three queries will be executed
    });

    if (!poem) return false;
    return poem;
  }

  public async post(poemData: Poem): Promise<Poem | false> {
    const poem = new Poem();
    poem.intro = poemData.intro;
    poem.poet = poemData.poet;
    poem.verses = poemData.verses;
    poem.reviewed = poemData.reviewed;

    const newPoem = await AppDataSource.getRepository(Poem).save(poem);
    if (!newPoem) return false;
    return newPoem;
  }

  public async update(id: string, poemData: Poem): Promise<Poem | false> {
    const poem = await AppDataSource.getRepository(Poem).findOneBy({ id });
    if (!poem) return false;
    AppDataSource.getRepository(Poem).merge(poem, poemData);
    const newPoem = await AppDataSource.getRepository(Poem).save(poem);
    if (!newPoem) return false;
    return newPoem;
  }

  public async remove(id: string): Promise<number | false> {
    const poem = await AppDataSource.getRepository(Poem).delete(id);
    if (!poem.affected) return false;
    return poem.affected;
  }
}
