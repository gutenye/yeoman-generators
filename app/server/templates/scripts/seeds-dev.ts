import 'pdjs'
import { loadFixtures } from '../src/vendor/typeormUtils'
import { createConnection } from 'typeorm'
import options from '../typeorm.config'
import * as path from 'path'

async function main() {
  const args = process.argv.slice(2)
  const fixtures = require(path.resolve(args[0]))

  const conn = await createConnection(options)
  console.log('>> Drop database')
  await conn.dropDatabase()
  console.log('>> Run synchronize')
  await conn.synchronize()
  console.log('>> Load fixtures')
  await loadFixtures(fixtures, { clear: false, logging: true })
  conn.close()
  console.log('>> DONE')
}

main()
