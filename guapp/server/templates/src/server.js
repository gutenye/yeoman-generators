import startServer from 'guserver'
import db from './db'
import schema from './schema'
import apis from './apis'
import auth from './auth'

startServer({
  db,
  schema,
  auth,
  apis
})
