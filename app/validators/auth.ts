import vine from '@vinejs/vine'

export const registerValidator = vine.compile(
  vine.object({
    firstName: vine.string().trim(),
    lastName: vine.string().trim(),
    email: vine
      .string()
      .trim()
      .email()
      .unique(async (db, value) => {
        const user = await db.from('users').where('email', value).first()
        return !user
      }),
    password: vine.string().trim().minLength(8).confirmed({
      confirmationField: 'confirmPassword',
    }),
    address: vine.string().trim(),
    phone: vine.string().trim(),
    gender: vine.enum(['male', 'female']),
    dob: vine.date(),
  })
)

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().trim().email(),
    password: vine.string().trim().minLength(8),
  })
)
