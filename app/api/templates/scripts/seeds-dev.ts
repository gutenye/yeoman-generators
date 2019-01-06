import 'pdjs'
import { loadFixtures } from '../src/vendor/typeormUtils'
import { createConnection } from 'typeorm'
import * as path from 'path'

async function main() {
  const args = process.argv.slice(2)
  const fixtures = require(path.resolve(args[0])).default

  const conn = await createConnection()
  console.log('>> Drop database')
  await conn.dropDatabase()
  console.log('>> Run synchronize')
  await conn.synchronize()
  console.log('>> Load fixtures')
  await loadFixtures(fixtures, { clear: false, logging: true })
  console.log('>> DONE')
  await conn.close()
  process.exit()
}

main()
