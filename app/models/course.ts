import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Department from './department.ts'
import CoursePrerequisite from './course_prerequisite.ts'
import CourseFaculty from './course_faculty.ts'
import Enrollment from './enrollment.ts'
import Grade from './grade.ts'
import ClassSession from './class_session.ts'
import { Filterable } from 'adonis-lucid-filter'
import { compose } from '@adonisjs/core/helpers'
import CourseFilter from './filters/course_filter.ts'

export default class Course extends compose(BaseModel, Filterable) {
  static $filter = () => CourseFilter

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare code: string

  @column()
  declare desciption: string | null

  @column()
  declare credits: number

  @column()
  declare departmentId: number

  @column()
  declare semester: 'Spring' | 'Fall' | 'Summer'

  @column()
  declare year: number

  @column()
  declare maxStudents: number

  @column()
  declare minCgpa: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Department)
  declare department: BelongsTo<typeof Department>

  @hasMany(() => CoursePrerequisite)
  declare coursePrerequisites: HasMany<typeof CoursePrerequisite>

  @hasMany(() => CourseFaculty)
  declare courseFaculties: HasMany<typeof CourseFaculty>

  @hasMany(() => Enrollment)
  declare enrollments: HasMany<typeof Enrollment>

  @hasMany(() => Grade)
  declare grades: HasMany<typeof Grade>

  @hasMany(() => ClassSession)
  declare classSessions: HasMany<typeof ClassSession>
}
