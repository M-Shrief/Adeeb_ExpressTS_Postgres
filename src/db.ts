import 'reflect-metadata';
import { DataSource } from 'typeorm';
// Config
import { DB } from './config';
// Entities
import { Poet } from './components/poet/poet.entity';
// Utils
import { logger } from './utils/logger';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: DB.user,
  password: DB.password,
  database: DB.name,
  synchronize: true,
  logging: true,
  entities: [Poet],
  migrations: [],
  subscribers: [],
});

const connectDB = async () => {
  try {
    await AppDataSource.initialize();
    logger.info('Connected To Postgres database correctly');
  } catch (error) {
    logger.error('Failed to connect to database');
    process.exit(1);
  }
};

connectDB();

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', async () => {
  await AppDataSource.destroy();
  logger.info(
    'Postgres default connection disconnected through app termination',
  );

  process.exit(0);
});
