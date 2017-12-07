// @flow
import QueryUtils, { hasNextPage } from '../schema/queryUtils'
import { resolver as _resolver } from '@gutenye/graphql-sequelize'
import { isPlainObject, omitBy, isNil } from 'lodash'

/*
 * resolver(Post, (query, {search}) => {
 *   query = query
 *     .q({fields: ['name']})
 *     .query
 *   if (search)
 *     query.where = { .. }
 *   return query
 * }, afterFn)
 */
export default function resolver(
  model: any,
  _before: any,
  _after: any,
  options: any = {}
): any {
  const before = async (query, args, context, info) => {
    try {
      let q = new QueryUtils(query, args).pagination()
      if (_before) {
        q = await _before(q, args, context, info)
      }
      query = isPlainObject(q) ? q : q.query
      query = omitBy(query, isNil)
      return query
    } catch (e) {
      console.error(e)
      return null
    }
  }
  const after = (result, args, context, info) => {
    if (result.totalCount) {
      result.hasNextPage = hasNextPage(result.totalCount, args)
    }
    if (_after) {
      result = _after(result, args, context, info)
    }
    return result
  }
  return _resolver(model, { before, after, ...options })
}
