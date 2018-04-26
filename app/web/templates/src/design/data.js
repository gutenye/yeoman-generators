import { forOwn } from 'lodash'
import { gen } from 'shared/fixtures'

const result = gen.run({
  mode: 'client',
  count: 10,
})

// { post: [] } -> {post, posts, postConn}
function convertToClient(result) {
  const ret = {}
  forOwn(result, (v, k) => {
    ret[k] = v[0]
    ret[`${k}s`] = v
    ret[`${k}Conn`] = { nodes: v, totalCount: v.length, pages: 10 }
  })
  return ret
}

export default convertToClient(result)
