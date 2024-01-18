// Database
import { AppDataSource } from '../../db';
// Entities
import { ChosenVerse } from './chosenVerse.entity';
// Types
import { DeleteResult, UpdateResult } from 'typeorm';

const db = AppDataSource.getRepository(ChosenVerse);

export const ChosenVerseDB = {
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

    async getRandomWithPoetName(
        num: number,
      ): Promise<ChosenVerse[]> {
        return await db
          .createQueryBuilder('chosenVerse')
          .select(['chosenVerse.id', 'chosenVerse.verses'])
          .orderBy('RANDOM()')
          .limit(num)
          .cache(false)
          .getMany();
    },

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

    async post(
        chosenVerseData: ChosenVerse,
      ): Promise<ChosenVerse> {
        return await db.save(
          chosenVerseData,
        );
    },

    async postMany(
        chosenVersesData: ChosenVerse[],
      ): Promise<ChosenVerse[]> {
        return await db.save(
          chosenVersesData,
        );
    },

    async update(id: string, chosenVerseData: ChosenVerse): Promise<UpdateResult> {
        return await db.update(id, chosenVerseData);
    },

    async remove(id: string): Promise<DeleteResult> {
        return await db.delete(id);
    },
}