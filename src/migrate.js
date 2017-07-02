import knex from 'knex';

import knexConfig from './knex-config';

console.log('Migration started'); // eslint-disable-line
knex(knexConfig).migrate.latest().then(() => {
  console.log('Migration successful'); // eslint-disable-line
  process.exit();
});
