import { UpdateResult, DeleteResult } from 'typeorm';
// Database
import { AppDataSource } from '../../db';
// Entities
import { Poet } from './poet.entity';
// Redis
import redisClient from '../../redis';
import { logger } from '../../utils/logger';
import { Logger } from 'winston';

const db = AppDataSource.getRepository(Poet);

export const PoetDB = {
  async getAll(): Promise<Poet[]> {
    return await db.find({
      select: {
        id: true,
        name: true,
        time_period: true,
      },
      relations: { poems: false },
      cache: true,
    });
  },
  async getOneWithLiterature(id: string): Promise<Poet | null> {
    return db.findOne({
      where: { id },
      select: {
        id: true,
        name: true,
        time_period: true,
        bio: true,
        poems: {
          id: true,
          intro: true,
        },
        chosenVerses: {
          id: true,
          poem: {
            id: true,
          },
          verses: true,
          tags: true,
        },
        proses: {
          id: true,
          qoute: true,
          tags: true,
        },
      },
      relations: ['poems', 'chosenVerses', 'chosenVerses.poem', 'proses'],
      cache: 1000 * 5,
    });
  },
  async post(poetData: Poet): Promise<Poet> {
    return await db.save(poetData);
  },
  async postMany(poetsData: Poet[]): Promise<Poet[]> {
    return await db.save(poetsData);
  },
  async update(id: string, poetData: Poet): Promise<UpdateResult> {
    return await db.update(id, poetData);
  },
  async remove(id: string): Promise<DeleteResult> {
    return await db.delete(id);
  },
};

export const PoetRedis = {
  async get(id: string): Promise<string | null> {
    return await redisClient.get(`poet:${id}`);
  },
  async set(id: string, poet: Poet): Promise<string | Logger | null> {
    return await redisClient
      .set(`poet:${id}`, JSON.stringify(poet), { EX: 60 * 15 })
      .catch((err) => logger.error(`CacheError: couldn't cache poet:${id}`));
  },
};
