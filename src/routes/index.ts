import { Router } from 'express'
import { createUser } from '@controllers/UserController'

const routes = Router({
  mergeParams: true
})

routes.post('/users', createUser)

export default routes
