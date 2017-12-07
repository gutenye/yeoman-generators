// @flow
import { sequelize, Op } from 'vendor'
import { parse, startOfMonth, endOfMonth } from 'date-fns'
import { isNil, omitBy } from 'lodash'

// const query = new QueryUtils(query, args)
// query.q({fields: ['name']})

const DEFAULT_LIMIT = 10

type QueryT = {
  where: Object,
  limit: number,
  offset: number,
}
type ArgsT = {
  limit?: number,
  offset?: number,
  page?: number,
  q?: string,
  tags?: string,
  category?: string,
  inMonth?: string,
}
type qT = {
  fields: Array<string>,
}
type inMonthT = {
  field: string,
}

export default class QueryUtils {
  query: QueryT
  args: ArgsT

  constructor(query: QueryT, args: ArgsT) {
    query.where = query.where || {}
    args = omitBy(args, isNil)
    this.query = query
    this.args = args
  }

  pagination() {
    const { query, args: { limit, offset, page } } = this
    query.limit = limit || DEFAULT_LIMIT
    if (offset) query.offset = offset
    if (page) query.offset = (page - 1) * query.limit
    if (query.limit === -1) delete query.limit
    return this
  }

  // q({fields: ['name', 'description']})
  q({ fields }: qT) {
    const { query, args: { q } } = this
    if (q) {
      query.where[Op.or] = fields.map(v => ({ [v]: { [Op.iLike]: `%${q}%` } }))
    }
    return this
  }

  // tags()
  tags() {
    const { query, args: { tags } } = this
    if (tags) {
      query.where['tags'] = { [Op.contains]: tags.split(',') }
    }
    return this
  }

  // category('China.')
  category() {
    const { query, args: { category } } = this
    if (category) {
      query.where['category'] = { [Op.like]: `${category}%` }
    }
    return this
  }

  // inMonth({field: 'createdAt'})
  inMonth({ field }: inMonthT) {
    const { query, args: { inMonth } } = this
    pd('inMonth', inMonth, this.args)
    if (inMonth) {
      const month = parse(inMonth, 'YYYY/MM')
      query.where[field] = {
        [Op.gte]: startOfMonth(month),
        [Op.lte]: endOfMonth(month),
      }
    }
    pd('this.query', this.query)
    return this
  }
}

export function requireAuth(user: any) {
  if (!user) {
    throw new Error('Unauthorized')
  }
}

export function hasNextPage(totalCount, { limit, page, offset }) {
  limit = limit || DEFAULT_LIMIT
  if (limit < 0) return false
  if (page) {
    return page * limit < totalCount
  }
  if (offset) {
    return offset + limit < totalCount
  }
  return limit < totalCount
}
