import * as models from './models'

const options = {
  type: 'postgres',
  url: process.env.DATABASE_URL || 'postgres://root:root@db/app',
  dropSchema: false,
  synchronize: false,
  logging: true,
  entities: Object.values(models),
  migrations: ['src/migration/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
}

if (process.env.NODE_ENV === 'test') {
  Object.assign(options, {
    type: 'sqlite',
    database: ':memory:',
    logging: false,
  })
}

export default options as any
