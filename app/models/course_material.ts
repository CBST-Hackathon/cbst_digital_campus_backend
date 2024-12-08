import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import { attachment, Attachmentable } from '@jrmc/adonis-attachment'
import { compose } from '@adonisjs/core/helpers'
import type { Attachment } from '@jrmc/adonis-attachment/types/attachment'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Course from './course.ts'

export default class CourseMaterial extends compose(BaseModel, Attachmentable) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare courseId: number

  @column()
  declare type: 'image' | 'document' | 'text' | 'link'

  @attachment({ preComputeUrl: true })
  declare image: Attachment | null

  @attachment({ preComputeUrl: true })
  declare document: Attachment | null

  @column()
  declare text: string | null

  @column()
  declare link: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Course)
  declare course: BelongsTo<typeof Course>
}
