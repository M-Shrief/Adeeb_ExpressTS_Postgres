// Database
import { AppDataSource } from '../../db';
// Entities
import { Prose } from './prose.entity';
// Types
import { UpdateResult, DeleteResult } from 'typeorm';

const db = AppDataSource.getRepository(Prose);

export const ProseDB = {
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
    async getRandomWithPoetName(num: number): Promise<Prose[]> {
        return await db
          .createQueryBuilder('prose')
          .select(['prose.id', 'prose.qoute'])
          .orderBy('RANDOM()')
          .limit(num)
          .getMany();
    },
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
    async post(proseData: Prose): Promise<Prose> {
        return await db.save(proseData);
    },
    async postMany(prosesData: Prose[]): Promise<Prose[]> {
        return await db.save(prosesData);
    },
    async update(id: string, proseData: Prose): Promise<UpdateResult> {
        return await db.update(id, proseData);
    },
    async remove(id: string): Promise<DeleteResult> {
        return await db.delete(id);
    },
}