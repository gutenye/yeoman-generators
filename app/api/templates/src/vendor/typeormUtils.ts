import * as models from 'models'
import { getConnection } from 'typeorm'
import { upperFirst } from 'lodash'
import * as mapSeries from 'promise-map-series'

const defaultOptions = {
  clear: true,
  logging: false,
}

interface Options {
  clear?: boolean
  logging?: boolean
}

/**
 * await loadFixtures({ post: [] }, {
 *   clear: true*     // clear data before load fixtures
 * })
 */
export async function loadFixtures(
  fixtures: any[],
  options: Options = {}
): Promise<void> {
  options = Object.assign({}, defaultOptions, options)
  if (options.clear) {
    await clearData()
  }
  const conn = getConnection()
  const type = conn.options.type as string
  await mapSeries(Object.entries(fixtures), async fixture => {
    const [key, values] = fixture
    if (options.logging) {
      console.log(`>> Load ${key}`)
    }
    const Model = models[upperFirst(key)]
    const { tableName } = Model.getRepository().metadata
    await conn.transaction(async () => {
      if (type === 'postgres') {
        await conn.query(`ALTER TABLE "${tableName}" DISABLE TRIGGER ALL`)
      }
      await Model.createQueryBuilder()
        .insert()
        .values(values)
        .execute()
      if (type === 'postgres') {
        await conn.query(`ALTER TABLE "${tableName}" ENABLE TRIGGER ALL`)
      }
    })
  })
}

export async function clearData(): Promise<void> {
  const conn = getConnection()
  const type = conn.options.type
  const tables = Object.values(models).map(
    v => v.getRepository().metadata.tableName
  )
  if (type === 'sqlite') {
    //return await mapSeries(tables, (tableName) => conn.query(`DELETE FROM "${tableName}`))
    await Promise.all(
      tables.map(tableName => conn.query(`DELETE FROM "${tableName}"`))
    )
  } else if (type === 'mysql') {
    await conn.transaction(async () => {
      if (type === 'mysql') {
        await conn.query('SET FOREIGN_KEY_CHECKS=0')
      }
      await Promise.all(
        tables.map(tableName => conn.query(`TRUNCATE "${tableName}"`))
      )
      if (type === 'mysql') {
        await conn.query('SET FOREIGN_KEY_CHECKS=1')
      }
    })
  }
}
