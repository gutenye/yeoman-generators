// @flow
import { sequelize } from 'vendor'

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

// {query, args} = pagination({defaultLimit: 10})(query, args)
type paginationT = {
  defaultLimit: number,
}
export function pagination({defaultLimit}: paginationT): Return {
  return (query, {limit, page}) => {
    limit = limit || defaultLimit
    page = page || 1
    if (limit === -1) {
      delete query.limit   // delete default limit set by resolver
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
export function q({fields}: qT): Return {
  return (query, {q}) => {
    if (q) {
      query.where['$or'] = fields.map(v => ({[v]: {$iLike: `%${q}%`}}))
    }
    return query
  }
}

// query = tags()(query, {tags})
export function tags(): Return {
  return (query, {tags}) => {
    if (tags)
      query.where['tags'] = {$contains: tags.split(',')}
    return query
  }
}

// query = category('China.')(query, {category})
export function category(): Return {
  return (query, {category}) => {
    if (category)
      query.where['category'] = {$like: `${category}%` }
    return query
  }
}

type savedT = {
  configId: string,
}
// args = await saved({configId: 'Product.SavedSearchs'})(query, {saved})
export function saved({configId}: savedT): ReturnArgs {
  return async (query, args) => {
    if (args.saved) {
      const config = await sequelize.models.config.findById(configId)
      const found = config.data.find(v => v.id === saved)
      if (!found)
        throw '这个保存搜索已经删除了'
      Object.assign(args, found.query)
    }
    return args
  }
}
