import { t, id, step, random, uid, faker, password } from 'gudatagen'
import { productName } from './helpers'

export const user = {
  id,
  username: 'admin',
  password: password('admin'),
}

