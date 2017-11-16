import { gen, product } from 'shared/fixtures'

global.GUDATAGEN_IS_CLIENT = true

const products = gen(product, 10)

export default {
  productConn: {
    nodes: products,
    totalCount: products.length,
  },
  products,
}
