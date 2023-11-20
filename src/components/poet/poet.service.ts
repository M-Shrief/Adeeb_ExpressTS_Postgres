// Database
import { AppDataSource } from '../../db';
// Redis
import redisClient  from '../../redis';
// Entities
import { Poet } from './poet.entity';
// Schema
import { createSchema, updateSchema } from './poet.schema';
// Utills
import { filterAsync } from '../../utils/asyncFilterAndMap';
import { logger } from '../../utils/logger';
 
const poetRepository = AppDataSource.getRepository(Poet);

export const PoetService = {
  async getAll(): Promise<Poet[] | false> {
    const poets = await poetRepository.find({
      select: {
        id: true,
        name: true,
        time_period: true,
      },
      relations: { poems: false },
      cache: true,
    });
    if (poets.length === 0) return false;
    return poets;
  },

  async getOneWithLiterature(id: string): Promise<Poet | false> {
    let poet: Poet | null;
    const cached = await redisClient.get(`poet:${id}`);
    if(cached) {
      poet = JSON.parse(cached);
    } else {
      poet = await poetRepository.findOne({
        where: { id },
        select: {
          id: true,
          name: true,
          time_period: true,
          bio: true,
          poems: {
            id: true,
            intro: true,
          },
          chosenVerses: {
            id: true,
            poem: {
              id: true,
            },
            verses: true,
            tags: true,
          },
          proses: {
            id: true,
            qoute: true,
            tags: true,
          },
        },
        relations: ['poems', 'chosenVerses', 'chosenVerses.poem','proses'],
        cache: 1000 * 5,
      });

      await redisClient.set(`poet:${id}`, JSON.stringify(poet), {EX: 60*15})
      .catch(err => logger.error(err));
    }

    if (!poet) return false;
    return poet;
  },

  async post(poetData: Poet): Promise<Poet | false> {
    const isValid = await createSchema.isValid(poetData);
    if (!isValid) return false;

    const newPoet = await poetRepository.save(poetData);
    if (!newPoet) return false;
    return newPoet;
  },

  async postMany(
    PoetsData: Poet[],
  ): Promise<{newPoets: Poet[], nonValidPoets: Poet[]} | false> {

    let isValid = async (PoetData: Poet) => await createSchema.isValid(PoetData)
    let isNotValid = async (PoetData: Poet) => await createSchema.isValid(PoetData) === false

    const validPoets: Poet[]  =  await filterAsync(PoetsData, isValid)
    const nonValidPoets: Poet[] =  await filterAsync(PoetsData, isNotValid)


    const newPoets = await poetRepository.save(
      validPoets
    );
    if (!newPoets) return false;

    const result = {newPoets, nonValidPoets}
    return result;
  },

  async update(id: string, poetData: Poet): Promise<number | false> {
    const isValid = await updateSchema.isValid(poetData);
    if (!isValid) return false;

    const newPoet = await poetRepository.update(id, poetData);
    if (!newPoet.affected) return false;
    return newPoet.affected;
  },

  async remove(id: string): Promise<number | false> {
    const poet = await poetRepository.delete(id);
    if (!poet.affected) return false;
    return poet.affected;
  }
}
