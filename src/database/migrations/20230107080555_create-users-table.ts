import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', (table: Knex.TableBuilder) => {
    table.uuid('id').notNullable().primary().unique().defaultTo(knex.raw('(UUID())'))
    table.string('email').notNullable().unique()
    table.string('first_name', 255).notNullable()
    table.string('last_name', 255).notNullable()
    table.string('password').notNullable()
    table.decimal('balance', 14, 2).defaultTo(0)
    table.timestamps(true, true)
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users')
}
