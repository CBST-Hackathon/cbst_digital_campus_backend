import errorHandler from '#exceptions/error_handler'
import Faculty from '#models/faculty'
import Student from '#models/student'
import User from '#models/user'
import { userValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  async index(ctx: HttpContext) {
    const { request, response } = ctx
    const { page, limit, type, ...input } = request.qs()
    try {
      const dataQuery = User.filter(input)
        .if(type, (query) => {
          if (type === 'student') return query.where('role', 'student')
          if (type === 'faculty') return query.where('role', 'faculty')
        })
        .orderBy('createdAt', 'desc')
      const data = page && limit ? await dataQuery.paginate(page, limit) : await dataQuery.exec()
      return response.json(data)
    } catch (error) {
      errorHandler(error, ctx, 'Index Users Error')
    }
  }

  async getById(ctx: HttpContext) {
    const { request, response } = ctx
    try {
      const { id } = request.params()
      const user = await User.query().where('id', id).firstOrFail()
      return response.json({ success: true, content: user })
    } catch (error) {
      errorHandler(error, ctx, 'Get User by Id Error')
    }
  }

  async store(ctx: HttpContext) {
    const { request, response } = ctx
    try {
      const payload = await request.validateUsing(userValidator)
      const { student, faculty, ...restPayload } = payload
      if (payload.role === 'student' && !student) {
        return response.abort({ success: false, message: 'Must need to provide student data' })
      }
      if (payload.role === 'faculty' && !faculty) {
        return response.abort({ success: false, message: 'Must need to provide faculty data' })
      }
      const user = await User.create(restPayload)
      if (payload.role === 'student' && student) {
        await user.related('student').create(student)
      }
      if (payload.role === 'faculty' && faculty) {
        await user.related('faculty').create(faculty)
      }

      return response.created({
        success: true,
        message: 'User created successfully',
        content: user,
      })
    } catch (error) {
      errorHandler(error, ctx, 'Storing User Error')
    }
  }

  async update(ctx: HttpContext) {
    const { request, response } = ctx
    const { id } = request.params()
    try {
      const user = await User.findByOrFail('id', id)
      const payload = await request.validateUsing(userValidator)
      const { student, faculty, ...restPayload } = payload
      if (payload.role === 'student' && !student) {
        return response.abort({ success: false, message: 'Must need to provide student data' })
      }
      if (payload.role === 'faculty' && !faculty) {
        return response.abort({ success: false, message: 'Must need to provide faculty data' })
      }
      await user.merge(restPayload).save()

      if (payload.role === 'student' && student) {
        await Student.updateOrCreate({ userId: user.id }, { userId: user.id, ...student })
      }
      if (payload.role === 'faculty' && faculty) {
        await Faculty.updateOrCreate({ userId: user.id }, { userId: user.id, ...faculty })
      }

      return response.created({
        success: true,
        message: 'User updated successfully',
        content: user,
      })
    } catch (error) {
      errorHandler(error, ctx, 'Updating User Error')
    }
  }

  async delete(ctx: HttpContext) {
    const { request, response } = ctx
    const { id } = request.params()
    try {
      const user = await User.findOrFail(id)
      await user.delete()
      return response.ok({ success: true, message: 'User deleted successfully' })
    } catch (error) {
      errorHandler(error, ctx, 'Deleting User Error')
    }
  }
}
