// @flow
import { Op } from 'sequelize'
import { parse, startOfMonth, endOfMonth } from 'date-fns'
import QueryUtilsBase from 'guserver/lib/polyfill/lib/QueryUtilsBase'

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

export default class QueryUtils extends QueryUtilsBase {
  pagination() {
    let { query, args: { limit, offset, page } } = this
    limit = limit || DEFAULT_LIMIT
    if (offset) {
      query.offset = offset
    } else if (page) {
      query.offset = (page - 1) * limit
    }
    if (limit !== -1) {
      query.limit = limit
    }
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
    if (inMonth) {
      const month = parse(inMonth, 'YYYY/MM')
      query.where[field] = {
        [Op.gte]: startOfMonth(month),
        [Op.lte]: endOfMonth(month),
      }
    }
    return this
  }
}
