// Database
import { AppDataSource } from '../../db';
// Redis
import redisClient from '../../redis';
// Entities
import { Poem } from './poem.entity';
// Utils
import { logger } from '../../utils/logger';
// Types
import { DeleteResult, UpdateResult } from 'typeorm';
import { Logger } from 'winston';

const db = AppDataSource.getRepository(Poem);

export const PoemDB = {
  async getAllWithPoetName(): Promise<Poem[]> {
    return await db.find({
      select: {
        id: true,
        intro: true,
        verses: true,
        reviewed: true,
        poet: {
          id: true,
          name: true,
          time_period: true,
        },
      },
      relations: { poet: true },
      cache: true, // Default cache lifetime is equal to 1000 ms, this means that if users open the user page 150 times within 3 seconds, only three queries will be executed
      // skip: 10 // for offset
      // take: 10 // limit
    });
  },
  async getAllIntrosWithPoetName(): Promise<Poem[]> {
    return await db.find({
      select: {
        id: true,
        intro: true,
        reviewed: true,
        poet: {
          id: true,
          name: true,
        },
      },
      relations: { poet: true },
      cache: true, // Default cache lifetime is equal to 1000 ms, this means that if users open the user page 150 times within 3 seconds, only three queries will be executed
    });
  },
  async getOneWithPoet(id: string): Promise<Poem | null> {
    return await db.findOne({
      where: { id },
      select: {
        id: true,
        intro: true,
        verses: true,
        reviewed: true,
        poet: {
          id: true,
          name: true,
          time_period: true,
          bio: true,
        },
      },
      relations: { poet: true },
      cache: true, // Default cache lifetime is equal to 1000 ms, this means that if users open the user page 150 times within 3 seconds, only three queries will be executed
    });
  },
  async post(poemData: Poem): Promise<Poem> {
    return await db.save(poemData);
  },
  async postMany(poemsData: Poem[]): Promise<Poem[]> {
    return await db.save(poemsData);
  },
  async update(id: string, poemData: Poem): Promise<UpdateResult> {
    return await db.update(id, poemData);
  },
  async remove(id: string): Promise<DeleteResult> {
    return await db.delete(id);
  },
};

export const PoemRedis = {
  async get(id: string): Promise<string | null> {
    return await redisClient.get(`poem:${id}`);
  },
  async set(id: string, poem: Poem): Promise<string | Logger | null> {
    return await redisClient
      .set(`poem:${id}`, JSON.stringify(poem), { EX: 60 * 15 })
      .catch((err) => logger.error(`CacheError: couldn't cache poem:${id}`));
  },
};
