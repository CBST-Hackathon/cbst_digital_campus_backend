/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

import '../app/routes/auth_route.ts'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})
