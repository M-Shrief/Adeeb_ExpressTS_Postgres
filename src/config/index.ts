import fs from 'fs'
import { logger } from '../utils/logger';

export const DB = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  name: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ca: process.env.CA_CERTIFICATE,
};

export const REDIS = process.env.REDIS;

if (!process.env.JWT_PRIVATE_FILE) {
  logger.error("JWT Private key is not defined")
  process.exit(1)
}
export const JWT_PRIVATE = fs.readFileSync(process.env.JWT_PRIVATE_FILE).toString().trim()

export const {
  NODE_ENV,
  PORT,
  LOG_DIR,
  CORS_ORIGIN,
  SENTRY_DNS,
} = process.env;
