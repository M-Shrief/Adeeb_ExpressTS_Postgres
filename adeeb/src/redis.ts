import Redis from "iovalkey"
// Config
import { REDIS } from './config';
// Utils
import { logger } from './utils/logger';

/**
 * Used to initialize Redis connection on Adeeb entry: src/index.ts
 */
const redisClient = REDIS
  ? new Redis(REDIS)
  : new Redis();

redisClient.on('connect', () => logger.info('Cache is connecting'));
redisClient.on('ready', () => logger.info('Cache is ready'));
redisClient.on('end', () => logger.info('Cache disconnected'));
redisClient.on('reconnecting', () => logger.info(`Cache is reconnecting.`));
redisClient.on('error', (e) => logger.error(e));

/**
 *  If the Node process ends, close the Cache connection
 */
process.on('SIGINT', async () => {
  await redisClient.disconnect();
  logger.info('Redis default connection disconnected through app termination');
});

/**
 * Used to access Redis cache in components repository.
 *
 * ```ts
 * redisClient.get(string);
 * ```
 */
export default redisClient;
