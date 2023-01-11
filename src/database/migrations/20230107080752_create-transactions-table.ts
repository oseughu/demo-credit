import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('transactions', (table: Knex.TableBuilder) => {
    table.uuid('id').notNullable().primary().unique().defaultTo(knex.raw('(UUID())'))
    table.decimal('amount', 14, 2).notNullable()
    table.string('description')
    table.string('type').notNullable().checkIn(['deposit', 'withdrawal', 'transfer']) //deposit, withdrawal, transfer (change to enum)
    table.string('recipient').notNullable()
    table.uuid('user_id').references('id').inTable('users').notNullable()
    table.timestamps(true, false)
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('transactions')
}
