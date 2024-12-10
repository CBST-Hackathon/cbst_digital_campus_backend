import router from '@adonisjs/core/services/router'
const UsersController = () => import('#controllers/users_controller')
import { middleware } from '#start/kernel'

router
  .group(() => {
    router.get('/', [UsersController, 'index'])
    router.get('/:id', [UsersController, 'getById'])
    router.post('/', [UsersController, 'store'])
    router.put('/:id', [UsersController, 'update'])
    router.delete('/:id', [UsersController, 'delete'])
  })
  .prefix('/api/admin/users')
  .use(middleware.auth({ guards: ['api'] }))
  .use(middleware.role({ guards: ['admin'] }))
