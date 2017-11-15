// @flow
import { sequelize } from 'vendor'

// 2. query = q({fields: ['name']})(query, args)   // for {q}
// 3. query = tags()(query, args)                  // for {tags}
// ->
//  { q: 'a' } -> new query
//  { tags: 'a,b' } -> new query

type Query = {
  where: Object,
  limit: number,
  offset: number,
}
type Args = {
  limit?: number,
  page?: number,
  q?: string,
  tags?: string,
  category?: string,
}
type Return = { (query: Query, args: Args): Query }
type ReturnArgs = { (query: Query, args: Args): Args }

// query = pagination({defaultLimit: 10})(query, args)
type paginationT = {
  defaultLimit: number,
}
export function pagination({ defaultLimit }: paginationT): Return {
  return (query, { limit, page }) => {
    limit = limit || defaultLimit
    page = page || 1
    if (limit === -1) {
      delete query.limit // delete default limit set by resolver
      return query
    }
    query.limit = limit
    query.offset = (page - 1) * limit
    return query
  }
}

type qT = {
  fields: Array<string>,
}
// query = q({fields: ['name', 'description']})(query, {q})
export function q({ fields }: qT): Return {
  return (query, { q }) => {
    if (q) {
      query.where['$or'] = fields.map(v => ({ [v]: { $iLike: `%${q}%` } }))
    }
    return query
  }
}

// query = tags()(query, {tags})
export function tags(): Return {
  return (query, { tags }) => {
    if (tags) query.where['tags'] = { $contains: tags.split(',') }
    return query
  }
}

// query = category('China.')(query, {category})
export function category(): Return {
  return (query, { category }) => {
    if (category) query.where['category'] = { $like: `${category}%` }
    return query
  }
}
