import fs from 'fs'
import { logger } from '../utils/logger';

/**
 * Database config
 */
export const DB = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  name: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ca: process.env.CA_CERTIFICATE,
};

/**
 * Redis URL
 */
export const REDIS = process.env.REDIS;

/**
 * JWT Public key
 */
export let JWT_PUBLIC: string = '';

if (process.env.JWT_PUBLIC_FILE) {
  JWT_PUBLIC = fs.readFileSync(process.env.JWT_PUBLIC_FILE!).toString().trim()
} else {
  logger.warn("JWT Private and Public key are not defined")
}

export const {
  NODE_ENV,
  PORT,
  LOG_DIR,
  CORS_ORIGIN,
  SENTRY_DNS,
} = process.env;
