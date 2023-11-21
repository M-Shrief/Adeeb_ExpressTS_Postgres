// Repository
import {PoetDB, PoetRedis} from './poet.repository'
// Entities
import { Poet } from './poet.entity';
// Schema
import { createSchema, updateSchema } from './poet.schema';
// Utills
import { filterAsync } from '../../utils/asyncFilterAndMap';
import { logger } from '../../utils/logger';
 
export const PoetService = {
  async getAll(): Promise<Poet[] | false> {
    const poets = await PoetDB.getAll()
    if (poets.length === 0) return false;
    return poets;
  },

  async getOneWithLiterature(id: string): Promise<Poet | false> {
    let poet: Poet | null;
    const cached = await PoetRedis.get(id)
    if(cached) {
      poet = JSON.parse(cached);
    } else {
      poet = await PoetDB.getOneWithLiterature(id)
    }
    if (!poet) return false;
    await PoetRedis.set(id, poet)
    return poet;
  },

  async post(poetData: Poet): Promise<Poet | false> {
    const isValid = await createSchema.isValid(poetData);
    if (!isValid) return false;

    const newPoet = await PoetDB.post(poetData);
    if (!newPoet) return false;
    return newPoet;
  },

  async postMany(
    PoetsData: Poet[],
  ): Promise<{newPoets: Poet[], notValidPoets: Poet[]} | false> {

    let isValid = async (PoetData: Poet) => await createSchema.isValid(PoetData)
    let isNotValid = async (PoetData: Poet) => await createSchema.isValid(PoetData) === false

    const validPoets: Poet[]  =  await filterAsync(PoetsData, isValid)
    const notValidPoets: Poet[] =  await filterAsync(PoetsData, isNotValid)


    const newPoets = await PoetDB.postMany(
      validPoets
    );
    if (!newPoets) return false;

    const result = {newPoets, notValidPoets}
    return result;
  },

  async update(id: string, poetData: Poet): Promise<number | false> {
    const isValid = await updateSchema.isValid(poetData);
    if (!isValid) return false;

    const newPoet = await PoetDB.update(id, poetData);
    if (!newPoet.affected) return false;
    return newPoet.affected;
  },

  async remove(id: string): Promise<number | false> {
    const poet = await PoetDB.remove(id);
    if (!poet.affected) return false;
    return poet.affected;
  }
}
