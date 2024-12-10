import vine from '@vinejs/vine'

export const courseValidator = vine.compile(
  vine.object({
    name: vine.string(),
    code: vine.string(),
    desciption: vine.string().nullable(),
    credits: vine.number(),
    departmentId: vine.number().exists(async (db, value) => {
      return db.from('departments').where('id', value).first() || false
    }),
    semester: vine.enum(['Spring', 'Fall', 'Summer']),
    year: vine.number(),
    maxStudents: vine.number(),
    minCgpa: vine.number(),
    location: vine.string(),
    prerequisiteCourses: vine.array(
      vine
        .number()
        .exists(async (db, value) => {
          return db.from('courses').where('id', value).first() || false
        })
        .optional()
    ),
  })
)
