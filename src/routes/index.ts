import { Router } from 'express'
import { createUser } from '@controllers/UserController'
import { createSession } from '@controllers/SessionController'
import { authentication } from '@middlewares/auth'

const routes = Router()

routes.post('/session', createSession)
routes.post('/users', authentication, createUser)

export default routes
