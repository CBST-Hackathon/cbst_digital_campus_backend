import router from '@adonisjs/core/services/router'
const DepartmentsController = () => import('#controllers/departments_controller')
import { middleware } from '#start/kernel'

router
  .group(() => {
    router.get('/', [DepartmentsController, 'index'])
    router.get('/:id', [DepartmentsController, 'getById'])
    router.post('/', [DepartmentsController, 'store'])
    router.put('/:id', [DepartmentsController, 'update'])
    router.delete('/:id', [DepartmentsController, 'delete'])
  })
  .prefix('api/admin/departments')
  .use(middleware.auth({ guards: ['api'] }))
  .use(middleware.role({ guards: ['admin'] }))
