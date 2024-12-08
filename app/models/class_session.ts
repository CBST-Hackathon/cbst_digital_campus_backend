import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Course from './course.ts'
import Faculty from './faculty.ts'
import Attendance from './attendance.ts'

export default class ClassSession extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare courseId: number

  @column()
  declare facultyId: number

  @column()
  declare date: Date

  @column()
  declare startTime: string

  @column()
  declare endTime: string

  @column()
  declare location: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Course)
  declare course: BelongsTo<typeof Course>

  @belongsTo(() => Faculty)
  declare faculty: BelongsTo<typeof Faculty>

  @hasMany(() => Attendance)
  declare attendances: HasMany<typeof Attendance>
}
