import { step } from 'gudatagen'
import * as faker from 'faker'

faker.locale = 'zh_CN'

export const userHelper = {
  name: () => faker.name.findName(),
  phoneNumber: () => faker.phone.phoneNumber(),
  region: () => faker.address.city(),
  address: () => faker.address.streetAddress(true),
}
