import { gen, product } from 'shared/fixtures'

global.GUDATAGEN_IS_CLIENT = true
const conn = nodes => ({ nodes, totalCount: nodes.length })

const products = gen(product, 10)

export default {
  products,
  productConn: conn(products),
}
