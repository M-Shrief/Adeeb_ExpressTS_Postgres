// Repository
import { ProseDB } from './prose.repository';
// Entities
import { Prose } from './prose.entity';
// Utils
import { filterAsync } from '../../utils/asyncFilterAndMap';
// Schema
import { createSchema, updateSchema } from './prose.schema';

/**
 * Handle ProseService calls
 */
export const ProseService = {
  /**
   * get all proses' data and poets' names. If data is not available, it returns false
   * @returns
   */
  async getAllWithPoetName(): Promise<Prose[] | false> {
    const proses = await ProseDB.getAllWithPoetName();
    if (proses.length === 0) return false;
    return proses;
  },
  /**
   * get a random number of proses' data and poets' names. If data is not available, it returns false
   * @param {number} num - number of proses required
   * @returns
   */
  async getRandomWithPoetName(num: number): Promise<Prose[] | false> {
    const proses = await ProseDB.getRandomWithPoetName(num);
    if (proses.length === 0) return false;
    return proses;
  },
  /**
   * get prose's data and poet data. If data is not available, it returns false
   * @param {string} id - prose's id.
   * @returns
   */
  async getOneWithPoetName(id: string): Promise<Prose | false> {
    const prose = await ProseDB.getOneWithPoetName(id);
    if (!prose) return false;
    return prose;
  },
  /**
   * create a new prose. If data is not valid, it returns false
   * @param {Prose} proseData - prose's data.
   * @returns
   */
  async post(proseData: Prose): Promise<Prose | false> {
    const isValid = await createSchema.isValid(proseData);
    if (!isValid) return false;

    const newProse = await ProseDB.post(proseData);
    if (!newProse) return false;
    return newProse;
  },
  /**
   * create new proses, eturns the valid and created ones, and the invalid and not-created ones.
   * If all data is invalid, it returns false.
   * @param {Prose[]} prosesData - proses' data.
   * @returns
   */
  async postMany(
    prosesData: Prose[],
  ): Promise<{ newProses: Prose[]; inValidProses: Prose[] } | false> {
    let isValid = async (ProseData: Prose) =>
      await createSchema.isValid(ProseData);
    let isNotValid = async (ProseData: Prose) =>
      (await createSchema.isValid(ProseData)) === false;

    const validProses: Prose[] = await filterAsync(prosesData, isValid);
    const inValidProses: Prose[] = await filterAsync(prosesData, isNotValid);

    const newProses = await ProseDB.postMany(validProses);
    if (!newProses) return false;

    const result = { newProses, inValidProses };
    return result;
  },
  /**
   * update a prose's data, returns false if prose's is not found or data isn't valid.
   * @param {string} id - prose's id.
   * @param {Prose} proseData - prose's data.
   * @returns
   */
  async update(id: string, proseData: Prose): Promise<number | false> {
    const isValid = await updateSchema.isValid(proseData);
    if (!isValid) return false;
    const newProse = await ProseDB.update(id, proseData);
    if (!newProse.affected) return false;
    return newProse.affected;
  },
  /**
   * delete a prose, returns false if prose's is not found.
   * @param {string} id - prose's id.
   * @returns
   */
  async remove(id: string): Promise<number | false> {
    const prose = await ProseDB.remove(id);
    if (!prose.affected) return false;
    return prose.affected;
  },
};
