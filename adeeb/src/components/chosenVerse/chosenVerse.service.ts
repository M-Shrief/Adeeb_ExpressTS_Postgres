// Repository
import {ChosenVerseDB} from './chosenVerse.repository'
// Entities
import { ChosenVerse } from './chosenVerse.entity';
// Utils
import { filterAsync } from '../../utils/asyncFilterAndMap';
// Schema
import { createSchema, updateSchema } from './chosenVerse.schema';

export const ChosenVerseService = {
  async getAllWithPoetName(): Promise<ChosenVerse[] | false> {
    const chosenVerses = await ChosenVerseDB.getAllWithPoetName();
    if (chosenVerses.length === 0) return false;
    return chosenVerses;
  },

  async getRandomWithPoetName(
    num: number,
  ): Promise<ChosenVerse[] | false> {
    const chosenVerses = await ChosenVerseDB.getRandomWithPoetName(num);
    if (chosenVerses.length === 0) return false;
    return chosenVerses;
  },

  async getOneWithPoetName(id: string): Promise<ChosenVerse | false> {
    const chosenVerse = await ChosenVerseDB.getOneWithPoetName(id);
    if (!chosenVerse) return false;
    return chosenVerse;
  },

  async post(
    chosenVerseData: ChosenVerse,
  ): Promise<ChosenVerse | false> {
    const isValid = await createSchema.isValid(chosenVerseData);
    if (!isValid) return false;

    const newChosenVerse = await ChosenVerseDB.post(chosenVerseData);
    if (!newChosenVerse) return false;
    return newChosenVerse;
  },

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

  async remove(id: string): Promise<number | false> {
    const chosenVerse = await ChosenVerseDB.remove(id);
    if (!chosenVerse.affected) return false;
    return chosenVerse.affected;
  },
}
