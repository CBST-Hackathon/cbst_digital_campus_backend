import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import User from './user.ts'
import Program from './program.ts'
import Enrollment from './enrollment.ts'
import Grade from './grade.ts'
import Attendance from './attendance.ts'

export default class Student extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare enrollmentNumber: string

  @column()
  declare programId: number

  @column()
  declare cgpa: number

  @column()
  declare yearOfAdmission: number

  @column()
  declare current_semester: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Program)
  declare program: BelongsTo<typeof Program>

  @hasMany(() => Enrollment)
  declare enrollments: HasMany<typeof Enrollment>

  @hasMany(() => Grade)
  declare grades: HasMany<typeof Grade>

  @hasMany(() => Attendance)
  declare attendances: HasMany<typeof Attendance>
}
