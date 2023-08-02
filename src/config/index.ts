import { config } from 'dotenv';
config();

export const DB = {
  // url: process.env.DB_URL,
  name_dev: process.env.DB_NAME,
  name_test: process.env.DB_NAME_TEST,
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
