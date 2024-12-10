import vine from '@vinejs/vine'

export const programValidator = vine.compile(
  vine.object({
    name: vine.string(),
    departmentId: vine.number().exists(async (db, value) => {
      return db.from('departments').where('id', value).first() || false
    }),
    duration: vine.number(),
    minCgpa: vine.number(),
    degreeType: vine.enum(['Bachelor', 'Master', 'PhD']),
  })
)
