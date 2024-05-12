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

/**
 * Used to access Database's Poet repository.
 */
export const PoetDB = {
  /**
   * Returns an array of Poet's data
   * @returns
   */
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
  /**
   * Returns Poet data and literature (poems, chosenVerses, proses)
   * @param {string} id - poet's id
   * @returns
   */
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
  /**
   * Create a Poet
   * @param {Poet} poetData - poet's data
   * @returns
   */
  async post(poetData: Poet): Promise<Poet> {
    return await db.save(poetData);
  },
  /**
   * Create a Poets
   * @param {Poet[]} poetsData - poets' data
   * @returns
   */
  async postMany(poetsData: Poet[]): Promise<Poet[]> {
    return await db.save(poetsData);
  },
  /**
   * update a Poet data
   * @param {string} id - poet's id
   * @param {Poet} poetData - poet's data
   * @returns
   */
  async update(id: string, poetData: Poet): Promise<UpdateResult> {
    return await db.update(id, poetData);
  },
  /**
   * remove a Poet
   * @param {string} id - poet's id
   * @returns
   */
  async remove(id: string): Promise<DeleteResult> {
    return await db.delete(id);
  },
};

/**
 * control poets' data in cache
 */
export const PoetRedis = {
  /**
   * get a poet from cache
   * @param {string} id - poet's id
   * @returns
   */
  async get(id: string): Promise<string | null> {
    return await redisClient.get(`poet:${id}`);
  },
  /**
   * set a poet to cache
   * @param {string} id - poet's id
   * @param {Poet} poet - poet's data
   * @returns
   */
  async set(id: string, poet: Poet): Promise<string | Logger | null> {
    return await redisClient
      .set(`poet:${id}`, JSON.stringify(poet), "EX", 60 * 15 )
      .catch((err) => logger.error(`CacheError: couldn't cache poet:${id}`));
  },
  /**
   * check if a poet exists
   * @param {string} id - poet's id
   * @returns
   */
  async exists(id: string): Promise<number> {
    return await redisClient.exists(`poet:${id}`);
  },
  /**
   * delete a poet from cache
   * @param {string} id - poet's id
   * @returns
   */
  async delete(id: string): Promise<number> {
    return await redisClient.del(`poet:${id}`);
  },
};
