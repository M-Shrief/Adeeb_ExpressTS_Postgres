// Repository
import {ChosenVerseDB} from './chosenVerse.repository'
// Entities
import { ChosenVerse } from './chosenVerse.entity';
// Utils
import { filterAsync } from '../../utils/asyncFilterAndMap';
// Schema
import { createSchema, updateSchema } from './chosenVerse.schema';

/**
 * Handle ChosenverseService calls
*/
export const ChosenVerseService = {
  /**
   * get all chosenVerses' data and poets' names. If data is not available, it returns false
   * @returns 
  */
  async getAllWithPoetName(): Promise<ChosenVerse[] | false> {
    const chosenVerses = await ChosenVerseDB.getAllWithPoetName();
    if (chosenVerses.length === 0) return false;
    return chosenVerses;
  },
  /**
   * get a random number of chosenVerses' data and poets' names. If data is not available, it returns false
   * @param {number} num - number of chosenVerses required
   * @returns 
  */
  async getRandomWithPoetName(
    num: number,
  ): Promise<ChosenVerse[] | false> {
    const chosenVerses = await ChosenVerseDB.getRandomWithPoetName(num);
    if (chosenVerses.length === 0) return false;
    return chosenVerses;
  },
  /**
   * get chosenVerse's data and poet data. If data is not available, it returns false
   * @param {string} id - chosenVerse's id.
   * @returns 
   */
  async getOneWithPoetName(id: string): Promise<ChosenVerse | false> {
    const chosenVerse = await ChosenVerseDB.getOneWithPoetName(id);
    if (!chosenVerse) return false;
    return chosenVerse;
  },
  /**
   * create a new chosenVerse. If data is not valid, it returns false
   * @param {ChosenVerse} chosenVerseData - chosenVerse's data.
   * @returns 
  */
  async post(
    chosenVerseData: ChosenVerse,
  ): Promise<ChosenVerse | false> {
    const isValid = await createSchema.isValid(chosenVerseData);
    if (!isValid) return false;

    const newChosenVerse = await ChosenVerseDB.post(chosenVerseData);
    if (!newChosenVerse) return false;
    return newChosenVerse;
  },
  /**
   * create new chosenVerses, eturns the valid and created ones, and the invalid and not-created ones.
   * If all data is invalid, it returns false.
   * @param {ChosenVerse[]} chosenVersesData - chosenVerses' data.
   * @returns 
  */
  async postMany(
    chosenVersesData: ChosenVerse[],
  ): Promise<
    | { newChosenVerses: ChosenVerse[]; inValidChosenVerses: ChosenVerse[] }
    | false
  > {
    let isValid = async (chosenVerseData: ChosenVerse) =>
      await createSchema.isValid(chosenVerseData);
    let isNotValid = async (chosenVerseData: ChosenVerse) =>
      (await createSchema.isValid(chosenVerseData)) === false;

    const validChosenVerses: ChosenVerse[] = await filterAsync(
      chosenVersesData,
      isValid,
    );
    const inValidChosenVerses: ChosenVerse[] = await filterAsync(
      chosenVersesData,
      isNotValid,
    );

    const newChosenVerses = await ChosenVerseDB.postMany(
      validChosenVerses,
    );
    if (!newChosenVerses) return false;

    const result = { newChosenVerses, inValidChosenVerses };
    return result;
  },
  /**
   * update a chosenVerse's data, returns false if chosenVerse's is not found or data isn't valid.
   * @param {string} id - chosenVerse's id.
   * @param {ChosenVerse} chosenVerseData - chosenVerse's data.
   * @returns 
  */
  async update(
    id: string,
    chosenVerseData: ChosenVerse,
  ): Promise<number | false> {
    const isValid = await updateSchema.isValid(chosenVerseData);
    if (!isValid) return false;

    const newChosenVerse = await ChosenVerseDB.update(
      id,
      chosenVerseData,
    );
    if (!newChosenVerse.affected) return false;
    return newChosenVerse.affected;
  },
  /**
   * delete a chosenVerse, returns false if chosenVerse's is not found.
   * @param {string} id - chosenVerse's id.
   * @returns 
  */
  async remove(id: string): Promise<number | false> {
    const chosenVerse = await ChosenVerseDB.remove(id);
    if (!chosenVerse.affected) return false;
    return chosenVerse.affected;
  },
}
