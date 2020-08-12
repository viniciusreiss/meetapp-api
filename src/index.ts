import Express from 'express'

const app = Express()

/**
 * middlewares
 */
app.use(Express.json())

/**
 * routes
 */

/**
 * server initialization
 */
const initServer = async () => {
  try {
    app.listen(4000, () => console.log('server running'))
  } catch (error) {
    console.log('Error!')
  }
}

initServer()
