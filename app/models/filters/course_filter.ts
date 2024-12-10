import { BaseModelFilter } from 'adonis-lucid-filter'
import type { ModelQueryBuilderContract } from '@adonisjs/lucid/types/model'
import Course from '#models/course'

export default class CourseFilter extends BaseModelFilter {
  declare $query: ModelQueryBuilderContract<typeof Course>

  name(value: string): void {
    this.$query.where('name', value)
  }
}
