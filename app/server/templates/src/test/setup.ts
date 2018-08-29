import 'pdjs'
import { createConnection } from 'typeorm'
import { loadFixtures } from 'vendor/typeormUtils'

global.loadFixtures = loadFixtures

let conn

beforeAll(async () => {
  conn = await createConnection()
  await conn.dropDatabase()
  await conn.synchronize()
})

afterAll(async () => {
  await conn.close()
})
