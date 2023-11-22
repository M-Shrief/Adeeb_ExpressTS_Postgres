// Repository
import { PoemDB, PoemRedis } from './poem.repository';
// Entity
import { Poem } from './poem.entity';
// Schema
import { createSchema, updateSchema } from './poem.schema';
// Utils
import { filterAsync } from '../../utils/asyncFilterAndMap';
import { logger } from '../../utils/logger';

export const PoemService = {
  async getAllWithPoetName(): Promise<Poem[] | false> {
    const poems = await PoemDB.getAllWithPoetName();
    if (poems.length === 0) return false;
    return poems;
  },

  async getAllIntrosWithPoetName(): Promise<Poem[] | false> {
    const poems = await PoemDB.getAllIntrosWithPoetName();
    if (poems.length === 0) return false;
    return poems;
  },

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

  async post(poemData: Poem): Promise<Poem | false> {
    const isValid = await createSchema.isValid(poemData);
    if (!isValid) return false;

    const newPoem = await PoemDB.post(poemData);
    if (!newPoem) return false;
    return newPoem;
  },

  async postMany(
    PoemsData: Poem[],
  ): Promise<{ newPoems: Poem[]; inValidPoems: Poem[] } | false> {
    let isValid = async (PoemData: Poem) =>
      await createSchema.isValid(PoemData);
    let isNotValid = async (PoemData: Poem) =>
      (await createSchema.isValid(PoemData)) === false;

    const validPoems: Poem[] = await filterAsync(PoemsData, isValid);
    const inValidPoems: Poem[] = await filterAsync(PoemsData, isNotValid);

    const newPoems = await PoemDB.postMany(validPoems);
    if (!newPoems) return false;

    const result = { newPoems, inValidPoems };
    return result;
  },

  async update(id: string, poemData: Poem): Promise<number | false> {
    const isValid = await updateSchema.isValid(poemData);
    if (!isValid) return false;

    const newPoem = await PoemDB.update(id, poemData);
    if (!newPoem.affected) return false;
    return newPoem.affected;
  },

  async remove(id: string): Promise<number | false> {
    const poem = await PoemDB.remove(id);
    if (!poem.affected) return false;
    return poem.affected;
  },
};
