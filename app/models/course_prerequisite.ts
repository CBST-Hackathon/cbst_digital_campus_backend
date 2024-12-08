import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Course from './course.ts'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class CoursePrerequisite extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare courseId: number

  @column()
  declare prerequisiteCourseId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Course, { foreignKey: 'prerequisiteCourseId' })
  declare prerequisiteCourse: BelongsTo<typeof Course>
}
