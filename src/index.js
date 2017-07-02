import bodyParser from 'body-parser';
import express from 'express';
import knex from 'knex';

import config from './config';
import knexConfig from './knex-config';

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  req.knex = knex(knexConfig);
  next();
});

app.post('/stamp', async (req, res) => {
  const { guid } = req.body;

  // Person
  let person = await req.knex('people')
    .where({ guid })
    .first();

  if (!person) {
    await req.knex('people')
      .insert({ guid });

    person = await req.knex('people')
      .where({ guid })
      .first();
  }

  // Fake company
  let company = await req.knex('companies')
    .where({ name: 'Fake Company' })
    .first();

  if (!company) {
    await req.knex('companies')
      .insert({
        name: 'Fake Company',
        email: 'fake@company.com',
      });

    company = await req.knex('companies')
      .where({ name: 'Fake Company' })
      .first();
  }

  // Stamp
  await req.knex('stamps')
    .insert({
      personId: person.id,
      companyId: company.id,
    });

  const stamps = await req.knex('stamps')
    .where({ personId: person.id })
    .select();

  console.log('stamps count ==> ', stamps.length);

  res.status(201).send();
});

app.listen(config.env.http.port, config.env.http.host, () => {
  /*eslint-disable*/
  console.info('Server started at [ http://%s:%s ]', config.env.http.host, config.env.http.port);
  console.info('Virtual host [ http://%s ]', config.env.virtualHost);
});
