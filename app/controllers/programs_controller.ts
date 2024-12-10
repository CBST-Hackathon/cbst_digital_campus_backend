import errorHandler from '#exceptions/error_handler'
import Program from '#models/program'
import { programValidator } from '#validators/program'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProgramsController {
  async index(ctx: HttpContext) {
    const { request, response } = ctx
    const { page, limit, type, ...input } = request.qs()
    try {
      const dataQuery = Program.filter(input).orderBy('createdAt', 'desc')
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
      const program = await Program.query().where(id).firstOrFail()
      return response.json({ success: true, content: program })
    } catch (error) {
      errorHandler(error, ctx, 'Get Program by Id Error')
    }
  }

  async store(ctx: HttpContext) {
    const { request, response } = ctx
    try {
      const payload = await request.validateUsing(programValidator)
      const program = await Program.create(payload)
      return response.created({
        success: true,
        message: 'Program created successfully',
        content: program,
      })
    } catch (error) {
      errorHandler(error, ctx, 'Storing Program Error')
    }
  }

  async update(ctx: HttpContext) {
    const { request, response } = ctx
    const { id } = request.params()
    try {
      const program = await Program.findOrFail(id)
      const payload = await request.validateUsing(programValidator)
      await program.merge(payload).save()

      return response.created({
        success: true,
        message: 'Program updated successfully',
        content: program,
      })
    } catch (error) {
      errorHandler(error, ctx, 'Updating Program Error')
    }
  }

  async delete(ctx: HttpContext) {
    const { request, response } = ctx
    const { id } = request.params()
    try {
      const program = await Program.findOrFail(id)
      await program.delete()
      return response.ok({ success: true, message: 'Program deleted successfully' })
    } catch (error) {
      errorHandler(error, ctx, 'Deleting Program Error')
    }
  }
}
