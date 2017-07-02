export function up (knex) {
  return knex
    .schema

    .dropTable('stamps')
    .dropTable('companies')
    .dropTable('people')

    .createTable('people', (table) => {
      table.increments('id').primary();
      table.string('guid').unique();
      table.timestamp('createdAt').defaultTo(knex.fn.now());
      table.timestamp('updatedAt').defaultTo(knex.fn.now());
    })

    .createTable('companies', (table) => {
      table.increments('id').primary();
      table.text('name');
      table.string('email').unique();
      table.timestamp('createdAt').defaultTo(knex.fn.now());
      table.timestamp('updatedAt').defaultTo(knex.fn.now());
    })

    .createTable('stamps', (table) => {
      table.increments('id').primary();
      table.integer('personId')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('people');
      table.integer('companyId')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('companies');
      table.timestamp('createdAt').defaultTo(knex.fn.now());
    });
}

export function down (knex) {
  return knex
    .schema
    .dropTable('stamps')
    .dropTable('companies')
    .dropTable('people');
}
