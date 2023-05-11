import mongoose from 'mongoose';
// config
import { DB_NAME, DB_URL } from './config';
// Utils
import { logger } from './utils/logger';

mongoose
  .connect(DB_URL as string, {
    dbName: DB_NAME,
    // other option are no longer required for v6+
  })
  .then(() => logger.info('connected'))
  .catch(() => {
    logger.error("Database's not Connected");
  });
