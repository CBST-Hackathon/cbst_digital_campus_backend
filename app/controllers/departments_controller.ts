import errorHandler from '#exceptions/error_handler'
import Department from '#models/department'
import { departmentValidator } from '#validators/department'
import type { HttpContext } from '@adonisjs/core/http'

export default class DepartmentsController {
  async index(ctx: HttpContext) {
    const { request, response } = ctx
    const { page, limit, type, ...input } = request.qs()
    try {
      const dataQuery = Department.filter(input).orderBy('createdAt', 'desc')
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
      const department = await Department.query().where(id).firstOrFail()
      return response.json({ success: true, content: department })
    } catch (error) {
      errorHandler(error, ctx, 'Get Department by Id Error')
    }
  }

  async store(ctx: HttpContext) {
    const { request, response } = ctx
    try {
      const payload = await request.validateUsing(departmentValidator)
      const department = await Department.create(payload)
      return response.created({
        success: true,
        message: 'Department created successfully',
        content: department,
      })
    } catch (error) {
      errorHandler(error, ctx, 'Storing Department Error')
    }
  }

  async update(ctx: HttpContext) {
    const { request, response } = ctx
    const { id } = request.params()
    try {
      const department = await Department.findOrFail(id)
      const payload = await request.validateUsing(departmentValidator)
      await department.merge(payload).save()

      return response.created({
        success: true,
        message: 'Department updated successfully',
        content: department,
      })
    } catch (error) {
      errorHandler(error, ctx, 'Updating Department Error')
    }
  }

  async delete(ctx: HttpContext) {
    const { request, response } = ctx
    const { id } = request.params()
    try {
      const department = await Department.findOrFail(id)
      await department.delete()
      return response.ok({ success: true, message: 'Department deleted successfully' })
    } catch (error) {
      errorHandler(error, ctx, 'Deleting Department Error')
    }
  }
}
