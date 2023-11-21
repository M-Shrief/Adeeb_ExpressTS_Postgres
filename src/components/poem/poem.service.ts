// Database
import { AppDataSource } from '../../db';
// Redis
import redisClient from '../../redis';
// Entities
import { Poem } from './poem.entity';
// Schema
import { createSchema, updateSchema } from './poem.schema';
// Utils
import { filterAsync } from '../../utils/asyncFilterAndMap';
import { logger } from '../../utils/logger';

const poemRepository = AppDataSource.getRepository(Poem);

export const PoemService =  {
   async getAllWithPoetName(): Promise<Poem[] | false> {
    const poems = await poemRepository.find({
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
  },

  async getAllIntrosWithPoetName(): Promise<Poem[] | false> {
    const poems = await poemRepository.find({
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
  },

  async getOneWithPoet(id: string): Promise<Poem | false> {
    let poem: Poem | null;
    
    const cached = await redisClient.get(`poem:${id}`);
    if(cached) {
      poem = JSON.parse(cached);
    } else {
      poem = await poemRepository.findOne({
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
      
      await redisClient.set(`poem:${id}`, JSON.stringify(poem), {EX: 60*15})
      .catch(err => logger.error(err));
    }


    if (!poem) return false;
    return poem;
  },

  async post(poemData: Poem): Promise<Poem | false> {
    const isValid = await createSchema.isValid(poemData);
    if (!isValid) return false;

    const newPoem = await poemRepository.save(poemData);
    if (!newPoem) return false;
    return newPoem;
  },

  async postMany(
    PoemsData: Poem[],
  ): Promise<{newPoems: Poem[], nonValidPoems: Poem[]} | false> {
    
    let isValid = async (PoemData: Poem) => await createSchema.isValid(PoemData)
    let isNotValid = async (PoemData: Poem) => await createSchema.isValid(PoemData) === false

    const validPoems: Poem[] =  await filterAsync(PoemsData, isValid)
    const nonValidPoems: Poem[]  =  await filterAsync(PoemsData, isNotValid)


    const newPoems = await poemRepository.save(
      validPoems
    );
    if (!newPoems) return false;

    const result = {newPoems, nonValidPoems}
    return result;
  },

  async update(id: string, poemData: Poem): Promise<number | false> {
    const isValid = await updateSchema.isValid(poemData);
    if (!isValid) return false;

    const newPoem = await poemRepository.update(id, poemData);
    if (!newPoem.affected) return false;
    return newPoem.affected;
  },

  async remove(id: string): Promise<number | false> {
    const poem = await poemRepository.delete(id);
    if (!poem.affected) return false;
    return poem.affected;
  }
}
