#!/usr/bin/env babel-node

import RethinkDBDash from 'rethinkdbdash'
import { forEach } from 'lodash'
import rc from './src/rc'

const USER = {
  id: '1',
  username: 'gutenye',
}

const NOTE = {
  id: '1',
  uid: 'a',
  userId: '1',
  "raw": { "blocks": [ { "data": { } , "depth": 0 , "entityRanges": [ ], "inlineStyleRanges": [ ], "key":  "7mvd8" , "text":  "a" , "type":  "unstyled" } ] , "entityMap": { } } ,
}

const FIXTURES = {
  users: [
    {...USER, id: '1', username: 'gutenye'},
  ],
  notes: [
    {...NOTE, id: '1', uid: 'a', userId: '1'},
    {...NOTE, id: '2', uid: 'b', userId: '1'},
  ]
}

const r = RethinkDBDash(rc.db)

forEach(FIXTURES, async (items, tableName) => {
  try {
    await r.table(tableName).delete().run()
    await r.table(tableName).insert(items).run()
    console.log(tableName)
  } catch (err) {
    console.log(err)
  }
})
