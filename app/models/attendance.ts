import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Student from './student.ts'
import ClassSession from './class_session.ts'

export default class Attendance extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare classSessionId: number

  @column()
  declare studentId: number

  @column()
  declare status: 'present' | 'absent' | 'excused'

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => ClassSession)
  declare classSession: BelongsTo<typeof ClassSession>

  @belongsTo(() => Student)
  declare student: BelongsTo<typeof Student>
}
