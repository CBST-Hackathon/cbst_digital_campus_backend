import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Course from './course.ts'
import Student from './student.ts'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Enrollment extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare courseId: number

  @column()
  declare studentId: number

  @column()
  declare enrollmentDate: Date

  @column()
  declare status: 'active' | 'dropped' | 'completed'

  @column()
  declare dropDate: Date | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Course)
  declare course: BelongsTo<typeof Course>

  @belongsTo(() => Student)
  declare student: BelongsTo<typeof Student>
}
