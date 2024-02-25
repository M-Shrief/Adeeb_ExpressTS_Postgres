// Database
import { AppDataSource } from '../../db';
// Entities
import { ChosenVerse } from './chosenVerse.entity';
// Types
import { DeleteResult, UpdateResult } from 'typeorm';

const db = AppDataSource.getRepository(ChosenVerse);

/**
 * Used to access Database's ChosenVerse repository.
 */
export const ChosenVerseDB = {
  /**
   * Returns an array of ChosenVerses with the poet name
   * @returns
   */
  async getAllWithPoetName(): Promise<ChosenVerse[]> {
    return await db.find({
      select: {
        id: true,
        poet: {
          id: true,
          name: true,
        },
        poem: {
          id: true,
        },
        tags: true,
        verses: true,
        reviewed: true,
      },
      relations: { poet: true, poem: true },
      cache: true,
    });
  },
  /**
   * Returns a random array of ChosenVerses' with the poet name, with a specified length
   * @returns
   */
  async getRandomWithPoetName(num: number): Promise<ChosenVerse[]> {
    return await db
      .createQueryBuilder('chosenVerse')
      .select(['chosenVerse.id', 'chosenVerse.verses'])
      .orderBy('RANDOM()')
      .limit(num)
      .cache(false)
      .getMany();
  },
  /**
   * Returns ChosenVerse data and its poet data
   * @param {string} id - chosenVerse's id
   * @returns
   */
  async getOneWithPoetName(id: string): Promise<ChosenVerse | null> {
    return await db.findOne({
      where: { id },
      select: {
        id: true,
        poet: {
          id: true,
          name: true,
        },
        poem: {
          id: true,
        },
        tags: true,
        verses: true,
        reviewed: true,
      },
      relations: { poet: true, poem: true },
      cache: true,
    });
  },
  /**
   * Create a new ChosenVerse
   * @param {ChosenVerse} chosenVerseData - ChosenVerse's data
   * @returns
   */
  async post(chosenVerseData: ChosenVerse): Promise<ChosenVerse> {
    return await db.save(chosenVerseData);
  },
  /**
   * Create new ChosenVerses
   * @param {ChosenVerse[]} chosenVersesData - ChosenVerse's data
   * @returns
   */
  async postMany(chosenVersesData: ChosenVerse[]): Promise<ChosenVerse[]> {
    return await db.save(chosenVersesData);
  },
  /**
   * Update a ChosenVerse
   * @param {string} id - ChosenVerse's id
   * @param {ChosenVerse} chosenVerseData - ChosenVerse's data
   * @returns
   */
  async update(
    id: string,
    chosenVerseData: ChosenVerse,
  ): Promise<UpdateResult> {
    return await db.update(id, chosenVerseData);
  },
  /**
   * Delete a ChosenVerse
   * @param {string} id - ChosenVerse's id
   * @returns
   */
  async remove(id: string): Promise<DeleteResult> {
    return await db.delete(id);
  },
};
