import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('sessions', (table: Knex.TableBuilder) => {
    table.uuid('session-id').primary().unique().defaultTo(knex.raw('(UUID())'))
    table.json('sess')
    table.datetime('expired')
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('sessions')
}
