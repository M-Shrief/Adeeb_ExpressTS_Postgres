// Repository
import {ProseDB} from './prose.repository'
// Entities
import { Prose } from './prose.entity';
// Utils
import { filterAsync } from '../../utils/asyncFilterAndMap';
// Schema
import { createSchema, updateSchema } from './prose.schema';

export const ProseService = {
  async getAllWithPoetName(): Promise<Prose[] | false> {
    const proses = await ProseDB.getAllWithPoetName()
    if (proses.length === 0) return false;
    return proses;
  },

  async getRandomWithPoetName(num: number): Promise<Prose[] | false> {
    const proses = await ProseDB.getRandomWithPoetName(num);
    if (proses.length === 0) return false;
    return proses;
  },

  async getOneWithPoetName(id: string): Promise<Prose | false> {
    const prose = await ProseDB.getOneWithPoetName(id);
    if (!prose) return false;
    return prose;
  },

  async post(proseData: Prose): Promise<Prose | false> {
    const isValid = await createSchema.isValid(proseData);
    if (!isValid) return false;

    const newProse = await ProseDB.post(proseData);
    if (!newProse) return false;
    return newProse;
  },

  async postMany(
    ProsesData: Prose[],
  ): Promise<{ newProses: Prose[]; inValidProses: Prose[] } | false> {
    let isValid = async (ProseData: Prose) =>
      await createSchema.isValid(ProseData);
    let isNotValid = async (ProseData: Prose) =>
      (await createSchema.isValid(ProseData)) === false;

    const validProses: Prose[] = await filterAsync(ProsesData, isValid);
    const inValidProses: Prose[] = await filterAsync(ProsesData, isNotValid);

    const newProses = await ProseDB.postMany(validProses);
    if (!newProses) return false;

    const result = { newProses, inValidProses };
    return result;
  },

  async update(id: string, proseData: Prose): Promise<number | false> {
    const isValid = await updateSchema.isValid(proseData);
    if (!isValid) return false;
    const newProse = await ProseDB.update(id, proseData);
    if (!newProse.affected) return false;
    return newProse.affected;
  },

  async remove(id: string): Promise<number | false> {
    const prose = await ProseDB.remove(id);
    if (!prose.affected) return false;
    return prose.affected;
  },
};
