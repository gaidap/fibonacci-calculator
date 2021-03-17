const connectionKeys = require('./connection-keys');
const { Pool } = require('pg');

const createNewPgClient = () => {
  return new Pool({
    user: connectionKeys.pgUser,
    password: connectionKeys.pgPassword,
    host: connectionKeys.pgHost,
    port: connectionKeys.pgPort,
    database: connectionKeys.pgDatabase
  });
};

const initPgClientConnection = (pgClient) => {
  pgClient.on('connect', () => {
    pgClient
      .query('CREATE TABLE IF NOT EXISTS values (number INT);')
      .catch((error) => console.log(error));
  });
};

module.exports = {
  createNewPgClient: createNewPgClient,
  initPgClientConnection: initPgClientConnection
};