const knex = require('../db/db');

const testConnection = async () => {
  try {
    const result = await knex.raw('SELECT NOW()');
    console.log('DB connected successfully at:', result.rows[0].now);
  } catch (err) {
    console.error('DB connection failed:', err);
  }
};

module.exports = { testConnection };
