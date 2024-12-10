import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class RoleMiddleware {
  async handle(
    ctx: HttpContext,
    next: NextFn,
    options: {
      guards?: string[]
    } = {}
  ) {
    if (!options?.guards?.includes(ctx.auth.user?.role ?? '')) {
      return ctx.response.badRequest({ success: false, message: 'Unauthorized access' })
    }
    return next()
  }
}
