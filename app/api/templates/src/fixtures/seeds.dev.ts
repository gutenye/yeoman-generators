import 'gudatagen/lib/helpers/password'
import { gen } from './fixtures'

const data = gen.run({
  mode: 'server',
})
// console.log(data.order)
module.exports = data
