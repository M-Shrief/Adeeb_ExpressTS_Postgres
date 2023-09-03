import { DataSource } from 'typeorm';
// Config
import { DB } from './config';
// Entities
import { Poet } from './components/poet/poet.entity';
import { Poem } from './components/poem/poem.entity';
import { ChosenVerse } from './components/chosenVerse/chosenVerse.entity';
import { Prose } from './components/prose/prose.entity';
import { Partner } from './components/partner/partner.entity';
import { Order } from './components/order/order.entity';
// Utils
import { logger } from './utils/logger';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: DB.host,
  port: Number(DB.port),
  username: DB.user,
  password: DB.password,
  database: DB.name,
  ssl: DB.ca ? {
    rejectUnauthorized: false,
    ca: DB.ca,
  }
  : false,
  synchronize: true,
  logging: true,
  entities: [Poet, Poem, ChosenVerse, Prose, Partner, Order],
  migrations: [],
  subscribers: [],
});

const connectDB = async () => {
  try {
    await AppDataSource.initialize();
    logger.info(`Connected To Postgres database correctly, Host: ${DB.host}`);
  } catch (error) {
    logger.error('Failed to connect to database');
    process.exit(1);
  }
};

connectDB();

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', async () => {
  await AppDataSource.destroy().catch(err => logger.error(`${err}`));
  logger.info(
    'Postgres default connection disconnected through app termination',
  );

  process.exit(0);
});
