import 'pdjs'
import createDbConnection from 'vendor/typeorm'
import { loadFixtures } from 'vendor/typeormUtils'

global.loadFixtures = loadFixtures

let conn

beforeAll(async () => {
  conn = await createDbConnection
  await conn.dropDatabase()
  await conn.synchronize()
})

afterAll(async () => {
  await conn.close()
})