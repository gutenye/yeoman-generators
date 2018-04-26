import 'pdjs'
import startServer from 'guserver'
import fs from 'fs-extra'
import db from './db'
import schema from './schema'
import apis from './apis'
import auth from './auth'

fs.ensureDirSync('uploads/processed')

startServer({
  db,
  schema,
  auth,
  apis
})
