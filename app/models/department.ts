import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Faculty from './faculty.ts'
import Course from './course.ts'
import { Filterable } from 'adonis-lucid-filter'
import { compose } from '@adonisjs/core/helpers'
import DepartmentFilter from './filters/department_filter.ts'

export default class Department extends compose(BaseModel, Filterable) {
  static $filter = () => DepartmentFilter

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare headId: number | null

  @column()
  declare name: string

  @column()
  declare location: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Faculty)
  declare faculties: HasMany<typeof Faculty>

  @hasMany(() => Course)
  declare courses: HasMany<typeof Course>
}
