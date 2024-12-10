import vine from '@vinejs/vine'

export const userValidator = vine.compile(
  vine.object({
    role: vine.enum(['admin', 'student', 'faculty']),
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
    password: vine.string().trim().minLength(8),
    address: vine.string().trim(),
    phone: vine.string().trim(),
    gender: vine.enum(['male', 'female']),
    dob: vine.date(),
    // profileImage: vine
    //   .file({
    //     size: '5mb',
    //     extnames: ['jpg', 'png', 'jpeg', 'webp'],
    //   })
    //   .nullable()
    //   .optional(),
    student: vine
      .object({
        programId: vine.number().exists(async (db, value) => {
          return db.from('programs').where('id', value).first() || false
        }),
        yearOfAdmission: vine.number(),
        currentSemester: vine.number(),
        cgpa: vine.number().optional(),
      })
      .optional(),
    faculty: vine
      .object({
        designation: vine.string(),
        departmentId: vine.number().exists(async (db, value) => {
          return db.from('departments').where('id', value).first() || false
        }),
        joiningDate: vine.date(),
        officeLocation: vine.string(),
      })
      .optional(),
  })
)
