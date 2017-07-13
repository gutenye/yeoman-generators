import startServer from 'guserver'
import schema from './schema'
import apis from './apis'
import auth from './auth'

const app = {
  schema,
  auth,
  apis,
  namespace: '',
}

startServer(app)