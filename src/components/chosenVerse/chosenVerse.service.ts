// Types
import { AppDataSource } from '../../db';
// Entities
import { ChosenVerse } from './chosenVerse.entity';
// Utils
import { filterAsync } from '../../utils/asyncFilterAndMap';
// Schema
import { createSchema, updateSchema } from './chosenVerse.schema';
export class ChosenVerseService {
  private chosenVerseRepository = AppDataSource.getRepository(ChosenVerse);
  public async getAllWithPoetName(): Promise<ChosenVerse[] | false> {
    const chosenVerses = await this.chosenVerseRepository.find({
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
    if (chosenVerses.length === 0) return false;
    return chosenVerses;
  }

  public async getRandomWithPoetName(
    num: number,
  ): Promise<ChosenVerse[] | false> {
    const chosenVerses = await this.chosenVerseRepository
      .createQueryBuilder('chosenVerse')
      .select(['chosenVerse.id', 'chosenVerse.verses'])
      .orderBy('RANDOM()')
      .limit(num)
      .cache(false)
      .getMany();
    if (chosenVerses.length === 0) return false;
    return chosenVerses;
  }

  public async getOneWithPoetName(id: string): Promise<ChosenVerse | false> {
    const chosenVerse = await this.chosenVerseRepository.findOne({
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

    const newChosenVerse = await this.chosenVerseRepository.save(
      chosenVerseData,
    );
    if (!newChosenVerse) return false;
    return newChosenVerse;
  }

  public async postMany(
    chosenVersesData: ChosenVerse[],
  ): Promise<{newChosenVerses: ChosenVerse[], nonValidChosenVerses: ChosenVerse[]} | false> {
    
    let isValid = async (chosenVerseData: ChosenVerse) => await createSchema.isValid(chosenVerseData)
    let isNotValid = async (chosenVerseData: ChosenVerse) => await createSchema.isValid(chosenVerseData) === false

    const validChosenVerses: ChosenVerse[]  =  await filterAsync(chosenVersesData, isValid)
    const nonValidChosenVerses: ChosenVerse[]  =  await filterAsync(chosenVersesData, isNotValid)


    const newChosenVerses = await this.chosenVerseRepository.save(
      validChosenVerses
    );
    if (!newChosenVerses) return false;

    const result = {newChosenVerses, nonValidChosenVerses}
    return result;
  }

  public async update(
    id: string,
    chosenVerseData: ChosenVerse,
  ): Promise<number | false> {
    const isValid = await updateSchema.isValid(chosenVerseData);
    if (!isValid) return false;

    const newChosenVerse = await this.chosenVerseRepository.update(id, chosenVerseData);
    if (!newChosenVerse.affected) return false;
    return newChosenVerse.affected;
  }

  public async remove(id: string): Promise<number | false> {
    const chosenVerse = await this.chosenVerseRepository.delete(id);
    if (!chosenVerse.affected) return false;
    return chosenVerse.affected;
  }
}
