import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'course_faculties'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('course_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('courses')
        .onDelete('CASCADE')
      table
        .integer('faculty_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('faculties')
        .onDelete('CASCADE')
      table.date('assigned_date').nullable()
      table.enum('role', ['lead', 'assistant']).notNullable()
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
