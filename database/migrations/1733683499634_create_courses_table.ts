import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'courses'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 255).notNullable()
      table.string('code', 100).notNullable().unique()
      table.text('desciption').nullable()
      table.integer('credits').notNullable()
      table
        .integer('department_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('departments')
        .onDelete('CASCADE')
      table.enum('semester', ['Spring', 'Fall', 'Summer']).notNullable()
      table.integer('year').notNullable()
      table.integer('max_students').notNullable()
      table.decimal('min_cgpa', 3, 2).defaultTo(0.0)
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
