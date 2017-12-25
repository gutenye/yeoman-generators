import { t, id, step, random, uid, password } from 'gudatagen'
import { productName } from './helpers'
import faker from 'faker'

// faker.locale = 'zh_CN'

export const user = {
  id,
  username: 'admin',
  password: password('admin'),
}

