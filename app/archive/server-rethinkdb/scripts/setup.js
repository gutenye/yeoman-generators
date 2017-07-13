#!/usr/bin/env babel-node

import RethinkDBDash from 'rethinkdbdash'
import { forEach } from 'lodash'
import rc from './src/rc'

const TABLES = {
  users: {},
  notes: {indexes: ['userId']},
}

const r = RethinkDBDash(rc.db)

async function main() {
  try {
    //// Create database
    await r.dbCreate(rc.db.db).run()
    console.log(`>>> database: ${rc.db.db}`)
  } catch (err) {
    console.log(err.msg)
  } finally {
    //// Create tables
    forEach(TABLES, async (config, tableName) => {
      try {
        await r.tableCreate(tableName).run()
        console.log(`>>> table: ${tableName}`)
      } catch (err) {
        console.log(err.msg)
      } finally {
        //// Create indexes
        config.indexes && config.indexes.forEach(async (indexName) => {
          try {
            await r.table(tableName).indexCreate(indexName).run()
            console.log(`>>> index: ${indexName}`)
          } catch (err) {
            console.log(err.msg)
          }
        })
      }
    })
  }
}

main()
