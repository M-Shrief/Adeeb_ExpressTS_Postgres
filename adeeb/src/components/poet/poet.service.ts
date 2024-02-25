// Repository
import { PoetDB, PoetRedis } from './poet.repository';
// Entities
import { Poet } from './poet.entity';
// Schema
import { createSchema, updateSchema } from './poet.schema';
// Utills
import { filterAsync } from '../../utils/asyncFilterAndMap';

/**
 * Handle PoetService calls
 */
export const PoetService = {
  /**
   * get all poets' data. If data is not available, it returns false
   * @returns
   */
  async getAll(): Promise<Poet[] | false> {
    const poets = await PoetDB.getAll();
    if (poets.length === 0) return false;
    return poets;
  },

  /**
   * get poet's data and literature (poems, chosenVerses, proses). If data is not available, it returns false
   * @param {string} id - poet's id.
   * @returns
   */
  async getOneWithLiterature(id: string): Promise<Poet | false> {
    let poet: Poet | null;
    const cached = await PoetRedis.get(id);
    if (cached) {
      poet = JSON.parse(cached);
    } else {
      poet = await PoetDB.getOneWithLiterature(id);
    }
    if (!poet) return false;
    await PoetRedis.set(id, poet);
    return poet;
  },

  /**
   * create a new poet. If data is not valid, it returns false
   * @param {Poet} poetData - poet's data.
   * @returns
   */
  async post(poetData: Poet): Promise<Poet | false> {
    const isValid = await createSchema.isValid(poetData);
    if (!isValid) return false;

    const newPoet = await PoetDB.post(poetData);
    if (!newPoet) return false;
    return newPoet;
  },

  /**
   * create new poets, returns the valid and created ones, and the invalid and not-created ones.
   * If all data is invalid, it returns false.
   * @param {Poet[]} poetsData - poets' data.
   * @returns
   */
  async postMany(
    poetsData: Poet[],
  ): Promise<{ newPoets: Poet[]; inValidPoets: Poet[] } | false> {
    let isValid = async (PoetData: Poet) =>
      await createSchema.isValid(PoetData);
    let isNotValid = async (PoetData: Poet) =>
      (await createSchema.isValid(PoetData)) === false;

    const validPoets: Poet[] = await filterAsync(poetsData, isValid);
    const inValidPoets: Poet[] = await filterAsync(poetsData, isNotValid);

    const newPoets = await PoetDB.postMany(validPoets);
    if (newPoets.length == 0) return false;

    const result = { newPoets, inValidPoets };
    return result;
  },

  /**
   * update a poet's data, returns false if poet's is not found or data isn't valid.
   * @param {string} id - poet's id.
   * @param {Poet} poetData - poet's data.
   * @returns
   */
  async update(id: string, poetData: Poet): Promise<number | false> {
    const isValid = await updateSchema.isValid(poetData);
    if (!isValid) return false;

    const newPoet = await PoetDB.update(id, poetData);
    if (!newPoet.affected) return false;
    if ((await PoetRedis.exists(id)) != 0) {
      // To update it I need to make 2 requests to return the raw in typeorm
      // So I need to replace it with something like Drizzle.
      // await PoemRedis.set(id, newPoem)

      // Until I change it, I will delete it to make sure it's not in the cache
      await PoetRedis.delete(id);
    }
    return newPoet.affected;
  },
  /**
   * delete a poet, returns false if poet's is not found.
   * @param {string} id - poet's id.
   * @returns
   */
  async remove(id: string): Promise<number | false> {
    const poet = await PoetDB.remove(id);
    if (!poet.affected) return false;
    await PoetRedis.delete(id);
    return poet.affected;
  },
};
