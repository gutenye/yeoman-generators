import Gen, {
  oneToOne,
  oneToOneJoin,
  oneToMany,
  manyToOne,
  manyToMany,
  link,
  t,
  seq,
  seqi,
  step,
  stepi,
  random,
  password,
  postBuild,
} from 'gudatagen'
import { userHelpe } from './helpers'

const gen = new Gen()
const { define, defineRecords, create } = gen

define('user', {
  username: seqi('admin', 'username'),
  password: password('admin'),
  name: seqi('Admin', 'Staff'),
})
create('user', 1)

export { gen }
