import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.enum('role', ['admin', 'faculty', 'student']).notNullable()
      table.string('first_name').nullable()
      table.string('last_name').nullable()
      table.string('email', 254).notNullable().unique()
      table.string('password').notNullable()
      table.string('phone').nullable()
      table.enum('gender', ['male', 'female']).nullable()
      table.date('dob').nullable()
      table.json('profile_image').nullable()
      table.boolean('active').defaultTo(false)
      table.string('address').nullable()

      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
