// Database
import { AppDataSource } from '../../db';
// Entities
import { Prose } from './prose.entity';
// Types
import { UpdateResult, DeleteResult } from 'typeorm';

const db = AppDataSource.getRepository(Prose);

/**
 * Used to access Database's Prose repository.
 */
export const ProseDB = {
  /**
   * Returns an array of Proses with the poet name
   * @returns 
   */
    async getAllWithPoetName(): Promise<Prose[]> {
       return await db.find({
          select: {
            id: true,
            poet: {
              id: true,
              name: true,
            },
            tags: true,
            qoute: true,
            reviewed: true,
          },
          relations: { poet: true },
          cache: true,
        });
    },
   /**
   * Returns a random array of Proses' with the poet name, with a specified lenght
   * @returns 
   */
    async getRandomWithPoetName(num: number): Promise<Prose[]> {
        return await db
          .createQueryBuilder('prose')
          .select(['prose.id', 'prose.qoute'])
          .orderBy('RANDOM()')
          .limit(num)
          .getMany();
    },
    /**
     * Returns Prose data and its poet data
     * @param {string} id - prose's id
     * @returns 
    */
    async getOneWithPoetName(id: string): Promise<Prose | null> {
        return await db.findOne({
          where: { id },
          select: {
            id: true,
            poet: {
              id: true,
              name: true,
            },
            tags: true,
            qoute: true,
            reviewed: true,
          },
          relations: { poet: true },
          cache: true,
        });
    },
    /**
     * Create a new Prose
     * @param {Prose} proseData - prose's data
     * @returns 
    */
    async post(proseData: Prose): Promise<Prose> {
        return await db.save(proseData);
    },
    /**
     * Create new Proses
     * @param {Prose[]} prosesData - prose's data
     * @returns 
    */
    async postMany(prosesData: Prose[]): Promise<Prose[]> {
        return await db.save(prosesData);
    },
    /**
     * Update a Prose
     * @param {string} id - prose's id
     * @param {Prose} proseData - prose's data
     * @returns 
    */
    async update(id: string, proseData: Prose): Promise<UpdateResult> {
        return await db.update(id, proseData);
    },
    /**
     * Delete a Prose
     * @param {string} id - prose's id
     * @returns 
    */
    async remove(id: string): Promise<DeleteResult> {
        return await db.delete(id);
    },
}