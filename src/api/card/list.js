import { BadRequestError } from 'meaning-error';

export default async (req, res) => {
  const guid = req.query.guid;

  if (!guid) {
    throw new BadRequestError('Missing guid param');
  }

  const person = await req.knex('people')
    .where({ guid })
    .first();

  const stamps = await req.knex('stamps')
    .leftJoin('companies', 'stamps.companyId', 'companies.id')
    .where({ personId: person.id })
    .select();

  const cards = stamps.reduce((result, stamp) => {
    if (result[stamp.companyId] && result[stamp.companyId].count === 10) {
      let fullCard = result[stamp.companyId];
      let fullCardIndex = 0;
      while (fullCard) {
        fullCardIndex += 1;
        fullCard = result[`${fullCardIndex}_${stamp.companyId}`];
      }

      result[`${fullCardIndex}_${stamp.companyId}`] = result[stamp.companyId]; // eslint-disable-line
      result[stamp.companyId] = null; // eslint-disable-line
    }

    let card = result[stamp.companyId];

    if (!card) {
      card = {
        count: 0,
        company: {
          name: stamp.name,
        },
      };

      result[stamp.companyId] = card; // eslint-disable-line
    }

    card.count += 1;

    return result;
  }, {});

  const list = Object.keys(cards)
    .map(key => cards[key]);

  res.status(200).send(list);
};
