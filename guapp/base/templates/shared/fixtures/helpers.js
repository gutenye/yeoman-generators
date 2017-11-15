import { step, faker } from 'gudatagen'

export function productName() {
  return function() {
    const names = ['a', 'b']
    return step(names, () => faker.commerce.productName()).call(this)
  }
}
