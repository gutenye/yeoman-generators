import '../src/models'
import { sequelize } from '../src/vendor'
import { mock } from 'mockjs'
// Mockjs extension //{{{1
//
// /[a-z]{3}\d{3}/
// @name email url domain ip paragraph sentence word title
// 'chance|1,min-max': boolean
// 'random|1': array,  'repeat|n/min-max'
//user: [{'id|+1': 1, 'username|+1': alphas, password: '@password'}]

import { Random, RE } from 'mockjs'
import { nth } from 'lodash'
import bcrypt from 'bcrypt'

Random.extend({
  id() {
    const index = nth(this.id.options.context.path, -2)
    return index + 1
  },
  i(name) {
    const index = nth(this.i.options.context.path, -2)
    return `${name}${index+1}`
  },
  int() { return this.integer(0, 1000) },
  slug() { return this.word() },
  password(text) { return bcrypt.hashSync(text, 10) },
})
//}}}1

const FIXTURES = mock({
  'user': [{username: 'admin', password: '@password("admin")'}],
  //'post|10': [{title: '@i("title")', description: '', tags: ['tag1', 'tag2']}],
})

sequelize.sync({force: true}).then(() => {
  if (sequelize.QUERY) sequelize.query(sequelize.QUERY)
  Object.values(sequelize.models).filter(v => !!v.QUERY).map(v => sequelize.query(v.QUERY))
  Object.keys(FIXTURES).reduce((p, key) => p.then(() => {
    console.log(`>> Load ${key}`)
    return sequelize.models[key].bulkCreate(FIXTURES[key])
  }), Promise.resolve())
})

// vim: fdm=marker
