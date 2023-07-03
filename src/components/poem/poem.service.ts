import { AppDataSource } from '../../db';
// Entities
import { Poem } from './poem.entity';
// Schema
import { createSchema, updateSchema } from './poem.schema';
// Utils
import { filterAsync } from '../../utils/asyncFilterAndMap';

export class PoemService {
  private poemRepository = AppDataSource.getRepository(Poem);
  public async getAllWithPoetName(): Promise<Poem[] | false> {
    const poems = await this.poemRepository.find({
      select: {
        id: true,
        intro: true,
        verses: true,
        reviewed: true,
        poet: {
          id: true,
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
    const poems = await this.poemRepository.find({
      select: {
        id: true,
        intro: true,
        reviewed: true,
        poet: {
          id: true,
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
    const poem = await this.poemRepository.findOne({
      where: { id },
      select: {
        id: true,
        intro: true,
        verses: true,
        reviewed: true,
        poet: {
          id: true,
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
    const isValid = await createSchema.isValid(poemData);
    if (!isValid) return false;

    const newPoem = await this.poemRepository.save(poemData);
    if (!newPoem) return false;
    return newPoem;
  }

  public async postMany(
    PoemsData: Poem[],
  ): Promise<{newPoems: Poem[], nonValidPoems: Poem[]} | false> {
    let validPoems: Poem[] = [];
  let nonValidPoems: Poem[] = [];
    let isValid = async (PoemData: any) => await createSchema.isValid(PoemData)
    let isNotValid = async (PoemData: any) => await createSchema.isValid(PoemData) === false

    validPoems =  await filterAsync(PoemsData, isValid)
    nonValidPoems =  await filterAsync(PoemsData, isNotValid)


    const newPoems = await this.poemRepository.save(
      validPoems
    );
    if (!newPoems) return false;

    const result = {newPoems, nonValidPoems}
    return result;
  }

  public async update(id: string, poemData: Poem): Promise<number | false> {
    const isValid = await updateSchema.isValid(poemData);
    if (!isValid) return false;

    const newPoem = await this.poemRepository.update(id, poemData);
    if (!newPoem.affected) return false;
    return newPoem.affected;
  }

  public async remove(id: string): Promise<number | false> {
    const poem = await this.poemRepository.delete(id);
    if (!poem.affected) return false;
    return poem.affected;
  }
}
