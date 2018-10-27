const options = {
  type: 'postgres',
  url: process.env.DATABASE_URL || 'postgres://root:root@db/app',
  logging: true,
  entities: ['src/models/**/*.ts'],
  migrations: ['src/migration/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
}

if (process.env.NODE_ENV === 'test') {
  Object.assign(options, {
    url: process.env.DATABASE_URL || 'postgres://root:root@db/test',
    logging: false,
  })
}

module.exports = options
