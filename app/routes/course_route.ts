import router from '@adonisjs/core/services/router'
const CoursesController = () => import('#controllers/courses_controller')
import { middleware } from '#start/kernel'

router
  .group(() => {
    router.get('/', [CoursesController, 'index'])
    router.get('/:id', [CoursesController, 'getById'])
    router.post('/', [CoursesController, 'store'])
    router.put('/:id', [CoursesController, 'update'])
    router.delete('/:id', [CoursesController, 'delete'])
  })
  .prefix('api/admin/courses')
  .use(middleware.auth({ guards: ['api'] }))
  .use(middleware.role({ guards: ['admin'] }))
