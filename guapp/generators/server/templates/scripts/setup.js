import '../src/vendor/pd'
import { sequelize } from '../src/models'
import bcrypt from 'bcrypt'

const force = process.env.DATABASE_FORCE

function password(text) { return bcrypt.hashSync(text, 10) }

const FIXTURES = {
  'user': [
    {username: 'admin', password: password('admin') },
  ],
}

sequelize.sync({force}).then(() => {
  if (sequelize.QUERY) sequelize.query(sequelize.QUERY)
  Object.values(sequelize.models).filter(v => !!v.QUERY).map(v => sequelize.query(v.QUERY))
  Promise.all(Object.keys(FIXTURES).map(key => sequelize.models[key].bulkCreate(FIXTURES[key])))
  console.log('Setup database completed.')
}).catch((err) => {
  console.log('Setup database error:', err)
})

// vim: fdm=marker
