export default async (req, res) => {
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

  // Fake companies
  let company1 = await req.knex('companies')
    .where({ name: 'Fake Company' })
    .first();

  if (!company1) {
    await req.knex('companies')
      .insert({
        name: 'Fake Company',
        email: 'fake@company.com',
      });

    company1 = await req.knex('companies')
      .where({ name: 'Fake Company' })
      .first();
  }

  const company2 = await req.knex('companies')
    .where({ name: 'Fake Company 2' })
    .first();

  if (!company2) {
    await req.knex('companies')
      .insert({
        name: 'Fake Company 2',
        email: 'fake-2@company.com',
      });
  }

  // Stamp
  await req.knex('stamps')
    .insert({
      personId: person.id,
      companyId: company1.id,
    });

  res.status(201).send();
};
