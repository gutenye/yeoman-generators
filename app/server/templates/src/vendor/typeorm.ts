import { createConnection } from 'typeorm'
import * as models from '../models'

/**
 * standalone file, used by server.ts, seeds-dev.ts
 *
 * import connection from 'vendor/typeorm'
 * const conn = await connection
 */

export default createConnection({
  type: 'postgres',
  url: process.env.DATABASE_URL || 'postgres://root:root@db/app',
  dropSchema: false,
  synchronize: false,
  logging: true,
  entities: Object.values(models),
  migrations: ['src/migration/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
})
