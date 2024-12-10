import { BaseModelFilter } from 'adonis-lucid-filter'
import type { ModelQueryBuilderContract } from '@adonisjs/lucid/types/model'
import Department from '#models/department'

export default class DepartmentFilter extends BaseModelFilter {
  declare $query: ModelQueryBuilderContract<typeof Department>

  name(value: string): void {
    this.$query.where('name', value)
  }
}
