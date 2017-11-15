// @flow
import * as q from './queryUtils'
import { resolver as _resolver } from '@gutenye/graphql-sequelize'
import { isNil, omitBy } from 'lodash'

/*
 * - pagination: (page: Int, limit: Int)
 * - default: limit is 10
 *
 * resolver(Post, (q, {search}) => {
 *   if (search)
 *     return {...q, where: {a: search}}
 *   return q
 * }, r => {
 *   return r
 * }, options)
 *
 *
 * query(gql, {variables: {limit: null|undefined}})
 */
export default function resolver(
  model: any,
  _before: any,
  after: any,
  options: any = {}
): any {
  const before = async (query, args, context, info) => {
    try {
      query.where = query.where || {}
      args = omitBy(args, isNil)

      query = q.pagination({ defaultLimit: 10 })(query, args)

      if (_before) {
        query = await _before(query, args, context, info)
        query = omitBy(query, isNil)
      }
      return query
    } catch (e) {
      console.error(e)
      return null
    }
  }
  return _resolver(model, { before, after, ...options })
}
