import 'gudatagen/lib/helpers/password'
import { gen } from './fixtures'

// data: { user: [..] }
const data = gen.run({
  mode: 'server',
})

// console.log(data)

export default data
