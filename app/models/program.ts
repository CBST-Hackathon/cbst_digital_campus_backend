import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Department from './department.ts'
import Student from './student.ts'
import { compose } from '@adonisjs/core/helpers'
import { Filterable } from 'adonis-lucid-filter'
import ProgramFilter from './filters/program_filter.ts'

export default class Program extends compose(BaseModel, Filterable) {
  static $filter = () => ProgramFilter

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare departmentId: number

  @column()
  declare duration: number

  @column()
  declare minCgpa: number

  @column()
  declare degreeType: 'Bachelor' | 'Master' | 'PhD'

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Department)
  declare department: BelongsTo<typeof Department>

  @hasMany(() => Student)
  declare students: HasMany<typeof Student>
}
