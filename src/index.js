import bodyParser from 'body-parser';
import express from 'express';
import knex from 'knex';
import errorMeaning from 'meaning-error-middleware';

import api from './api';
import config from './config';
import knexConfig from './knex-config';

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  req.knex = knex(knexConfig);
  next();
});

api(app);

app.use(errorMeaning);

app.listen(config.env.http.port, config.env.http.host, () => {
  /*eslint-disable*/
  console.info('Server started at [ http://%s:%s ]', config.env.http.host, config.env.http.port);
  console.info('Virtual host [ http://%s ]', config.env.virtualHost);
});
