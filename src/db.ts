import 'reflect-metadata';
import { DataSource } from 'typeorm';
// Config
import { DB } from './config';
// Entities
import { Poet } from '@poet/poet.entity';
import { Poem } from '@poem/poem.entity';
import { ChosenVerse } from '@chosenVerse/chosenVerse.entity';
import { Prose } from '@prose/prose.entity';
import { Partner } from '@partner/partner.entity';
import { Order } from '@order/order.entity';
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
  entities: [Poet, Poem, ChosenVerse, Prose, Partner, Order],
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
