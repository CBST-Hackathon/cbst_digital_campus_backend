import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import User from './user.ts'
import Department from './department.ts'
import CourseFaculty from './course_faculty.ts'
import ClassSession from './class_session.ts'

export default class Faculty extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare designation: string

  @column()
  declare departmentId: number

  @column()
  declare joiningDate: Date | null

  @column()
  declare officeLocation: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Department)
  declare department: BelongsTo<typeof Department>

  @hasMany(() => CourseFaculty)
  declare courseFaculties: HasMany<typeof CourseFaculty>

  @hasMany(() => ClassSession)
  declare classSessions: HasMany<typeof ClassSession>
}
