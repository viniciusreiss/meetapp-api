import './loadenv'
import Express from 'express'
import { isDbConnected } from '@database/sequelize'
import routes from '@routes/index'

const app = Express()

/**
 * middlewares
 */
app.use(Express.json())

/**
 * routes
 */

app.use('/api', routes)

/**
 * server initialization
 */
const initServer = async () => {
  try {
    await isDbConnected()
    app.listen(4000, () => console.log('server running on localhost:4000'))
  } catch (error) {
    console.log('Error!', error)
  }
}

initServer()
