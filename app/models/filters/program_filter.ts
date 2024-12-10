
import { BaseModelFilter } from 'adonis-lucid-filter'
import type { ModelQueryBuilderContract } from '@adonisjs/lucid/types/model'
import Program from '#models/program'

export default class ProgramFilter extends BaseModelFilter {
  declare $query: ModelQueryBuilderContract<typeof Program>

  name(value: string): void {
    this.$query.where('name', value)
  }
}