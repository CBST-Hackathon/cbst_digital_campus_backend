import errorHandler from '#exceptions/error_handler'
import Course from '#models/course'
import { courseValidator } from '#validators/course'
import type { HttpContext } from '@adonisjs/core/http'

export default class CoursesController {
  async index(ctx: HttpContext) {
    const { request, response } = ctx
    const { page, limit, type, ...input } = request.qs()
    try {
      const dataQuery = Course.filter(input).orderBy('createdAt', 'desc')
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
      const course = await Course.query().where(id).firstOrFail()
      return response.json({ success: true, content: course })
    } catch (error) {
      errorHandler(error, ctx, 'Get Course by Id Error')
    }
  }

  async store(ctx: HttpContext) {
    const { request, response } = ctx
    try {
      const payload = await request.validateUsing(courseValidator)
      const course = await Course.create(payload)
      return response.created({
        success: true,
        message: 'Course created successfully',
        content: course,
      })
    } catch (error) {
      errorHandler(error, ctx, 'Storing Course Error')
    }
  }

  async update(ctx: HttpContext) {
    const { request, response } = ctx
    const { id } = request.params()
    try {
      const course = await Course.findOrFail(id)
      const payload = await request.validateUsing(courseValidator)
      await course.merge(payload).save()

      return response.created({
        success: true,
        message: 'Course updated successfully',
        content: course,
      })
    } catch (error) {
      errorHandler(error, ctx, 'Updating Course Error')
    }
  }

  async delete(ctx: HttpContext) {
    const { request, response } = ctx
    const { id } = request.params()
    try {
      const course = await Course.findOrFail(id)
      await course.delete()
      return response.ok({ success: true, message: 'Course deleted successfully' })
    } catch (error) {
      errorHandler(error, ctx, 'Deleting Course Error')
    }
  }
}
