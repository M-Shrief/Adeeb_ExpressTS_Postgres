import { Sequelize } from 'sequelize-typescript';
// import { Sequelize } from 'sequelize-typescript';
// Config
import { DB, NODE_ENV } from '../config';
// Utils
import { logger } from '../utils/logger';

export const sequelize = new Sequelize(
  DB.dbName as string,
  DB.user as string,
  DB.password as string,
  {
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    pool: {
      min: 0,
      max: 5,
    },
    models: [__dirname + '/models'],
    logging: (query, time) => {
      logger.info(time + ' --- ' + query);
    },
    benchmark: true,
  },
);

export const syncForce = async () => await sequelize.sync({ force: true });
export const syncAlter = async () => await sequelize.sync({ alter: true });

(async function connectDB() {
  try {
    await sequelize.authenticate();
    sequelize.sync({ alter: true });
    logger.info('Connection has been established successfully.');
  } catch (error) {
    logger.error('Unable to connect to the database:', error);
    // process.exit(1);
  }
})();

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', async () => {
  await sequelize.close();
  logger.info(
    'Sequelize default connection disconnected through app termination',
  );
  process.exit(0);
});
