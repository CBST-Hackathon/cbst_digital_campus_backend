import vine from '@vinejs/vine'

export const departmentValidator = vine.compile(
  vine.object({
    headId: vine.number().exists(async (db, value) => {
      return db.from('user').where('id', value).first() || false
    }),
    name: vine.string(),
    location: vine.string(),
  })
)
