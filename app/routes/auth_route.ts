import router from '@adonisjs/core/services/router'
const AuthController = () => import('#controllers/auth_controller')
import { middleware } from '#start/kernel'

router
  .group(() => {
    router.post('/register', [AuthController, 'register'])
    router.post('/login', [AuthController, 'login'])
    router.get('/check', [AuthController, 'checkAuth']).use(middleware.auth({ guards: ['api'] }))
    router.post('/logout', [AuthController, 'logout']).use(middleware.auth({ guards: ['api'] }))
    // router.post('/forgot-password', [AuthController, 'forgotPassword'])
    // router.post('/reset-password', [AuthController, 'resetPassword'])
  })
  .prefix('/api/auth')
