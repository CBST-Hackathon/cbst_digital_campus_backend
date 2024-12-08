import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, computed, hasMany, hasOne } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import type { HasMany, HasOne } from '@adonisjs/lucid/types/relations'
import Token from './token.ts'
import { attachment, Attachmentable } from '@jrmc/adonis-attachment'
import type { Attachment } from '@jrmc/adonis-attachment/types/attachment'
import Faculty from './faculty.ts'
import Student from './student.ts'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder, Attachmentable) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare role: 'admin' | 'faculty' | 'student'

  @column()
  declare firstName: string | null

  @column()
  declare lastName: string | null

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare phone: string | null

  @column()
  declare gender: 'male' | 'female'

  @column()
  declare dob: Date | null

  @attachment({ preComputeUrl: true })
  declare profileImage: Attachment | null

  @column()
  declare address: string | null

  @column()
  declare active: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  static accessTokens = DbAccessTokensProvider.forModel(User)

  @hasOne(() => Faculty)
  declare faculty: HasOne<typeof Faculty>

  @hasOne(() => Student)
  declare student: HasOne<typeof Student>

  @hasMany(() => Token)
  declare tokens: HasMany<typeof Token>

  @hasMany(() => Token, {
    onQuery: (query) => query.where('type', 'PASSWORD_RESET'),
  })
  declare passwordResetTokens: HasMany<typeof Token>

  @computed()
  get fullName(): string {
    return `${this.firstName ?? ''} ${this.lastName ?? ''}`.trim()
  }
}
