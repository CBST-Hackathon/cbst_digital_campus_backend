import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'programs'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 255).notNullable()
      table
        .integer('department_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('departments')
        .onDelete('CASCADE')
      table.integer('duration').notNullable()
      table.decimal('min_cgpa', 3, 2).notNullable()
      table.enum('degree_type', ['Bachelor', 'Master', 'PhD']).notNullable()
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
