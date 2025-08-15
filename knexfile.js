// Update with your config settings.
require('dotenv').config();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    searchPath: ['knex', 'public'],
    pool: {
      min: 2,
      max: 10,
    },
    migrations: { directory: 'db/migrations', tableName: 'knex_migrations' },
    seeds: { directory: './db/seeds' },
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    searchPath: ['knex', 'public'],
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: 'db/migrations',
      tableName: 'knex_migrations',
    },
    seeds: { directory: './db/seeds' },
  },
};
