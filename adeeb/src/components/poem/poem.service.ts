// Repository
import { PoemDB, PoemRedis } from './poem.repository';
// Entity
import { Poem } from './poem.entity';
// Schema
import { createSchema, updateSchema } from './poem.schema';
// Utils
import { filterAsync } from '../../utils/asyncFilterAndMap';

/**
 * Handle PoemService requests
 */
export const PoemService = {
  /**
   * get all poems' data and poets' names. If data is not available, it returns false
   * @returns 
  */
  async getAllWithPoetName(): Promise<Poem[] | false> {
    const poems = await PoemDB.getAllWithPoetName();
    if (poems.length === 0) return false;
    return poems;
  },
  /**
   * get all poems' intros and poets' names. If data is not available, it returns false
   * @returns 
  */
  async getAllIntrosWithPoetName(): Promise<Poem[] | false> {
    const poems = await PoemDB.getAllIntrosWithPoetName();
    if (poems.length === 0) return false;
    return poems;
  },
  /**
   * get poem's data and poet data. If data is not available, it returns false
   * @param {string} id - poem's id.
   * @returns 
   */
  async getOneWithPoet(id: string): Promise<Poem | false> {
    let poem: Poem | null;

    const cached = await PoemRedis.get(id);
    if (cached) {
      poem = JSON.parse(cached);
    } else {
      poem = await PoemDB.getOneWithPoet(id);
    }

    if (!poem) return false;
    await PoemRedis.set(id, poem);
    return poem;
  },
  /**
   * create a new poem. If data is not valid, it returns false
   * @param {Poem} poemData - poem's data.
   * @returns 
  */
  async post(poemData: Poem): Promise<Poem | false> {
    const isValid = await createSchema.isValid(poemData);
    if (!isValid) return false;

    const newPoem = await PoemDB.post(poemData);
    if (!newPoem) return false;
    return newPoem;
  },
  /**
   * create new poems, returns the valid and created ones, and the invalid and not-created ones.
   * If all data is invalid, it returns false.
   * @param {Poem[]} poemsData - poems' data.
   * @returns 
  */
  async postMany(
    poemsData: Poem[],
  ): Promise<{ newPoems: Poem[]; inValidPoems: Poem[] } | false> {
    let isValid = async (PoemData: Poem) =>
      await createSchema.isValid(PoemData);
    let isNotValid = async (PoemData: Poem) =>
      (await createSchema.isValid(PoemData)) === false;

    const validPoems: Poem[] = await filterAsync(poemsData, isValid);
    const inValidPoems: Poem[] = await filterAsync(poemsData, isNotValid);

    const newPoems = await PoemDB.postMany(validPoems);
    if (!newPoems) return false;

    const result = { newPoems, inValidPoems };
    return result;
  },
  /**
   * update a poem's data, returns false if poem's is not found or data isn't valid.
   * @param {string} id - poem's id.
   * @param {Poem} poemData - poem's data.
   * @returns 
  */
  async update(id: string, poemData: Poem): Promise<number | false> {
    const isValid = await updateSchema.isValid(poemData);
    if (!isValid) return false;

    const newPoem = await PoemDB.update(id, poemData);
    if (!newPoem.affected) return false;
    if(await PoemRedis.exists(id) != 0) {
      // To update it I need to make 2 requests to return the raw in typeorm
      // So I need to replace it with something like Drizzle.
      // await PoemRedis.set(id, newPoem) 

      // Until I change it, I will delete it to make sure it's not in the cache
      await PoemRedis.delete(id);
    }
    return newPoem.affected;
  },
  /**
   * delete a poem, returns false if poem's is not found.
   * @param {string} id - poem's id.
   * @returns 
  */
  async remove(id: string): Promise<number | false> {
    const poem = await PoemDB.remove(id);
    if (!poem.affected) return false;
    await PoemRedis.delete(id)
    return poem.affected;
  },
};
