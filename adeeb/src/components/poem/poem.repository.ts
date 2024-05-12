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

/**
 * Used to access Database's Poem repository.
 */
export const PoemDB = {
  /**
   * Returns an array of Poems with the poet name
   * @returns
   */
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
  /**
   * Returns an array of Poems' intros with the poet name
   * @returns
   */
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
  /**
   * Returns Poem data and its poet data
   * @param {string} id - poem's id
   * @returns
   */
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
  /**
   * Create a new Poem
   * @param {Poem} poemData - poem's data
   * @returns
   */
  async post(poemData: Poem): Promise<Poem> {
    return await db.save(poemData);
  },
  /**
   * Create new Poems
   * @param {Poem[]} poemsData - poem's data
   * @returns
   */
  async postMany(poemsData: Poem[]): Promise<Poem[]> {
    return await db.save(poemsData);
  },
  /**
   * Update a Poem's data
   * @param {string} id - poem's id
   * @param {Poem} poemData - poem's data
   * @returns
   */
  async update(id: string, poemData: Poem): Promise<UpdateResult> {
    const result = await db.update(id, poemData);
    logger.info(result);
    return result;
  },
  /**
   * Remove a Poem
   * @param {string} id - poem's id
   * @returns
   */
  async remove(id: string): Promise<DeleteResult> {
    return await db.delete(id);
  },
};

/**
 * control poems' data in cache
 */
export const PoemRedis = {
  /**
   * get a poem from cache
   * @param {string} id - poem's id
   * @returns
   */
  async get(id: string): Promise<string | null> {
    return await redisClient.get(`poem:${id}`);
  },
  /**
   * set a poem to cache
   * @param {string} id - poem's id
   * @param {Poem} poem - poem's data
   * @returns
   */
  async set(id: string, poem: Poem): Promise<string | Logger | null> {
    return await redisClient
      .set(`poem:${id}`, JSON.stringify(poem), "EX", 60 * 15)
      .catch((err) => logger.error(`CacheError: couldn't cache poem:${id}`));
  },
  /**
   * check if a poem exists
   * @param {string} id - poem's id
   * @returns
   */
  async exists(id: string): Promise<number> {
    return await redisClient.exists(`poem:${id}`);
  },
  /**
   * delete a poem from cache
   * @param {string} id - poem's id
   * @returns
   */
  async delete(id: string): Promise<number> {
    return await redisClient.del(`poem:${id}`);
  },
};
