import router from '@adonisjs/core/services/router'
const ProgramsController = () => import('#controllers/programs_controller')
import { middleware } from '#start/kernel'

router
  .group(() => {
    router.get('/', [ProgramsController, 'index'])
    router.get('/:id', [ProgramsController, 'getById'])
    router.post('/', [ProgramsController, 'store'])
    router.put('/:id', [ProgramsController, 'update'])
    router.delete('/:id', [ProgramsController, 'delete'])
  })
  .prefix('api/admin/programs')
  .use(middleware.auth({ guards: ['api'] }))
  .use(middleware.role({ guards: ['admin'] }))
