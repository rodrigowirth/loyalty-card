import * as card from './card';
import * as stamp from './stamp';

const wrap = fn => (...args) => fn(...args).catch(args[2]);

export default function (app) {
  app.get('/card', wrap(card.list));

  app.post('/stamp', wrap(stamp.create));
}
