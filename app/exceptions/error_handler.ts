import { Exception } from '@adonisjs/core/exceptions'
import { HttpContext } from '@adonisjs/core/http'
import { errors } from '@vinejs/vine'

export default function errorHandler(
  error: any,
  ctx: HttpContext,
  log: string = 'Controller Error'
) {
  ctx.logger.error(log + ': %j', error)

  if (error instanceof errors.E_VALIDATION_ERROR) {
    return ctx.response.status(422).json({ success: false, errors: error.messages })
  }

  if (error instanceof Exception) {
    return ctx.response.status(error.status).json({ success: false, message: error.message })
  }

  return ctx.response.internalServerError({
    success: false,
    message: error.message || 'An unexpected error occurred',
  })
}
