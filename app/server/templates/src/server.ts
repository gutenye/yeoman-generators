import 'pdjs'
import * as fs from 'fs-extra'
import startServer from 'guserver'
import db from './db'
import schema from './models/indexSchema'
import apis from './apis'
import auth from './auth'
import connection from './vendor/typeorm'

;(async function main() {
  fs.ensureDirSync('uploads/processed')

  const conn = await connection
  startServer({
    context: { conn },
    db,
    schema,
    auth,
    apis,
  })
})()
