// Types
import { AppDataSource } from '../../db';
// Entities
import { ChosenVerse } from './chosenVerse.entity';
// Utils
import { shuffle } from '../../utils/shuffle';
// Schema
import { createSchema, updateSchema } from './chosenVerse.schema';
export class ChosenVerseService {
  public async getAllWithPoetName(): Promise<ChosenVerse[] | false> {
    const chosenVerses = await AppDataSource.getRepository(ChosenVerse).find({
      select: {
        id: true,
        poet: {
          id: true,
          name: true,
        },
        poem: {
          id: true,
        },
        tags: true,
        verses: true,
        reviewed: true,
      },
      relations: { poet: true, poem: true },
      cache: true,
    });
    // shuffle the ChosenVerse[]
    shuffle(chosenVerses);
    if (chosenVerses.length === 0) return false;
    return chosenVerses;
  }

  public async getRandomWithPoetName(
    num: number,
  ): Promise<ChosenVerse[] | false> {
    const chosenVerses = await AppDataSource.getRepository(ChosenVerse)
      .createQueryBuilder('chosen_verses')
      .orderBy('RANDOM()')
      .limit(num)
      .cache(false)
      .getMany();
    if (chosenVerses.length === 0) return false;
    return chosenVerses;
  }

  public async getOneWithPoetName(id: string): Promise<ChosenVerse | false> {
    const chosenVerse = await AppDataSource.getRepository(ChosenVerse).findOne({
      where: { id },
      select: {
        id: true,
        poet: {
          id: true,
          name: true,
        },
        poem: {
          id: true,
        },
        tags: true,
        verses: true,
        reviewed: true,
      },
      relations: { poet: true, poem: true },
      cache: true,
    });
    if (!chosenVerse) return false;
    return chosenVerse;
  }

  public async post(
    chosenVerseData: ChosenVerse,
  ): Promise<ChosenVerse | false> {
    const isValid = await createSchema.isValid(chosenVerseData);
    if (!isValid) return false;

    const chosenVerse = new ChosenVerse();
    chosenVerse.poet = chosenVerseData.poet;
    chosenVerse.poem = chosenVerseData.poem;
    chosenVerse.tags = chosenVerseData.tags;
    chosenVerse.verses = chosenVerseData.verses;
    chosenVerse.reviewed = chosenVerseData.reviewed;
    const newChosenVerse = await AppDataSource.getRepository(ChosenVerse).save(
      chosenVerse,
    );
    if (!newChosenVerse) return false;
    return newChosenVerse;
  }

  public async update(
    id: string,
    chosenVerseData: ChosenVerse,
  ): Promise<ChosenVerse | false> {
    const isValid = await updateSchema.isValid(chosenVerseData);
    if (!isValid) return false;

    const chosenVerse = await AppDataSource.getRepository(
      ChosenVerse,
    ).findOneBy({
      id,
    });
    if (!chosenVerse) return false;
    AppDataSource.getRepository(ChosenVerse).merge(
      chosenVerse,
      chosenVerseData,
    );
    const newChosenVerse = await AppDataSource.getRepository(ChosenVerse).save(
      chosenVerse,
    );
    if (!newChosenVerse) return false;
    return newChosenVerse;
  }

  public async remove(id: string): Promise<number | false> {
    const chosenVerse = await AppDataSource.getRepository(ChosenVerse).delete(
      id,
    );
    if (!chosenVerse.affected) return false;
    return chosenVerse.affected;
  }
}
