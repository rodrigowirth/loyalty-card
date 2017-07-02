import path from 'path';

import config from './config';

const { db } = config.env;

console.log('dirname ==> ', __dirname);

export default {
  client: 'mysql',
  connection: {
    // debug: true,
    multipleStatements: true,
    host: db.host,
    user: db.user,
    password: db.password,
    port: db.port,
    database: db.database,
  },
  migrations: {
    directory: path.join(__dirname, '/db/migrations'),
  },
  seeds: {
    directory: path.join(__dirname, '/db/seeds'),
  },
};
