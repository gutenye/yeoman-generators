import { omitBy, isUndefined } from 'lodash'
import { parse, startOfMonth, endOfMonth } from 'date-fns'
import QueryUtilsBase from 'guserver/lib/polyfill/QueryUtilsBase'

const DEFAULT_LIMIT = 10

type QueryT = {
  where: Object
  limit: number
  offset: number
}
type ArgsT = {
  limit?: number
  offset?: number
  page?: number
  q?: string
  tags?: string
  category?: string
  inMonth?: string
}
type qT = {
  fields: Array<string>
}
type inMonthT = {
  field: string
}

export default class QueryUtils extends QueryUtilsBase {
  query: any
  args: any

  andWhere(a, b) {
    this.query.andWhere(a, b)
    return this
  }

  id() {
    const {
      query,
      args: { id },
    } = this
    if (id) {
      query.andWhere('id = :id', { id })
    }
    return this
  }

  pagination() {
    let {
      query,
      args: { limit, offset, page },
    } = this
    limit = limit || DEFAULT_LIMIT
    if (offset) {
      query.skip(offset)
    } else if (page) {
      query.skip((page - 1) * limit)
    }
    if (limit !== -1) {
      query.take(limit)
    }
    return this
  }

  // q({fields: ['name', 'description']})
  // WHERE name ~ '.*q.*' OR description ~ '.*q.*'
  q({ fields }: qT) {
    const {
      query,
      args: { q },
    } = this
    if (q) {
      fields.forEach((field, i) => {
        const method = i === 0 ? 'andWhere' : 'orWhere'
        query[method](`:field ~ :pattern`, { field, pattern: q })
      })
    }
    return this
  }

  // tags()
  tags() {
    const {
      query,
      args: { tags },
    } = this
    if (tags) {
      query.andWhere(`tags @> :tags`, { tags: JSON.stringify(tags.split(',')) })
    }
    return this
  }

  // category('China.')
  category() {
    const {
      query,
      args: { category },
    } = this
    if (category) {
      query.andWhere(`category ~ :pattern`, { pattern: `${category}$` })
    }
    return this
  }

  // inMonth({field: 'createdAt'})
  inMonth({ field }: inMonthT) {
    const {
      query,
      args: { inMonth },
    } = this
    if (inMonth) {
      const month = parse(inMonth, 'YYYY/MM', new Date())
      query
        .andWhere(`:field >= :start`, { field, start: startOfMonth(month) })
        .andWhere(`:field <= :end`, { field, end: endOfMonth(month) })
    }
    return this
  }
}
