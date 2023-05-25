import { config } from 'dotenv';
config();

export const DB = {
  // url: process.env.DB_URL,
  dbName: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
};

export const {
  NODE_ENV,
  PORT,
  SECRET_KEY,
  LOG_FORMAT,
  LOG_DIR,
  ORIGIN,
  JWT_PRIVATE,
} = process.env;
