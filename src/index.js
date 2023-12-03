const app = require('./app');
const config = require('./utils/config');
const logger = require('./utils/logger');
const client = require('./utils/database');

let server;

client
  .connect()
  .then(() => {
    logger.info('Connected to POSTGRESQL');
    server = app.listen(config.port, () => {
      logger.info(`Listening to http://127.0.0.1:${config.port}`);
    });
  })
  .catch((err) => {
    logger.info('Error connecting to the database', err);
  });

const exitHandler = () => {
  if (server) {
    server.close();
    logger.info('Server closed');
    process.exit(1);
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM recieved');
  if (server) {
    server.close();
  }
});
