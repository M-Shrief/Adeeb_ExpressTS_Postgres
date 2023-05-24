// eslint-disable-next-line @typescript-eslint/no-var-requires
const { logger } = require('./src/utils/logger');

const logConfig = {
  warn(message) {
    logger.warn(message);
  },
  error(message) {
    logger.error(message);
  },
  deprecate(message) {
    logger.warn(message);
  },
  debug(message) {
    logger.debug(message);
  },
};

/**
 * @type {Knex}
 */
modele.exports = {
  development: {
    client: 'pg',
    version: '15',
    connection: {
      host: '127.0.0.1',
      port: 5432,
      user: 'postgres',
      password: 'postgres',
      database: 'adeeb',
    },
    migrations: {
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds/dev',
    },
    pool: { min: 0, max: 10 },
    debug: true,
    asyncStackTraces: true,
    acquireConnectionTimeout: 10000,
    log: logConfig,
  },
  test: {
    client: 'pg',
    version: '15',
    connection: {
      host: '127.0.0.1',
      port: 5432,
      user: 'postgres',
      password: 'postgres',
      database: 'adeeb_test',
    },
    migrations: {
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds/dev',
    },
    pool: { min: 0, max: 10 },
    debug: true,
    asyncStackTraces: true,
    acquireConnectionTimeout: 10000,
    log: logConfig,
  },

  // staging: {},
  // production: {},
};
