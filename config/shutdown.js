const knex = require('../db/db');

const setupShutdown = (server) => {
  const shutdown = async () => {
    console.log('shutting down gracefully...');
    server.close(async () => {
      console.log('HTTP server closed');
      try {
        await knex.destroy(); //close DB pool
        console.log('database pool close');
        process.exit(0);
      } catch (err) {
        console.error('Error closeing DB pool:', err);
        process.exit(1);
      }
    });
  };
  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
};

module.exports = setupShutdown;
