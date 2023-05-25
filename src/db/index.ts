import { Sequelize } from 'sequelize';
// Config
import { DB, NODE_ENV } from '../config';
// Utils
import { logger } from '../utils/logger';

const sequelize = new Sequelize(
  DB.database as string,
  DB.user as string,
  DB.password as string,
  {
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    // define: {},
    pool: {
      min: 0,
      max: 5,
    },
    logQueryParameters: NODE_ENV === 'development',
    logging: (query, time) => {
      logger.info(time + ' --- ' + query);
    },
    benchmark: true,
  },
);

(async function connectDB() {
  try {
    await sequelize.authenticate();
    logger.info('Connection has been established successfully.');
  } catch (error) {
    logger.error('Unable to connect to the database:', error);
  }
})();
