// @flow
import Sequelize from 'sequelize'
import rc from '../rc'
import { resolver as _resolver } from '@gutenye/graphql-sequelize'
import { isNil, omitBy } from 'lodash'
import * as a from './queryUtils'
import * as t from 'sequelize'
export { t, a }

export const sequelize = new Sequelize(rc.db.url)

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
export function resolver(model: any, _before: any, after: any, options: any = {}): any {
  const before = async (query, args, context, info) => {
    try {
      query.where = query.where || {}
      args = omitBy(args, isNil)

      query = a.pagination({defaultLimit: 10})(query, args)

      if (_before) {
        query = await _before(query, args, context, info)
        query = omitBy(query, isNil)
      }
      return query
    } catch (e) {
      console.error(e)
    }
  }
  return _resolver(model, {before, after, ...options})
}
