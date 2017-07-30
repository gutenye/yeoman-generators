import gen, { t, id, step, random, uid, faker, password } from 'gudatagen'
import { productName } from './helpers'

gen.locale = 'zh_CN'

export { gen }

export const user = {
  id,
  username: 'admin',
  password: password('admin'),
}

