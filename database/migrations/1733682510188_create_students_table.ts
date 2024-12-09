import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'students'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('user_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
      table.string('enrollment_number', 100).notNullable().unique()
      table
        .integer('program_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('programs')
        .onDelete('CASCADE')
      table.decimal('cgpa', 3, 2).defaultTo(0.0)
      table.integer('year_of_admission').notNullable()
      table.integer('current_semester').notNullable()
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
