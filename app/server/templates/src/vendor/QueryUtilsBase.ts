import { omitBy, isNil } from 'lodash'
import { GraphQLList } from 'graphql'
import { BaseEntity, SelectQueryBuilder } from 'typeorm'

export default class QueryUtilsBase {
  record: any
  args: any
  context: any
  info: any
  query: SelectQueryBuilder<BaseEntity>
  type: any

  constructor(Model: typeof BaseEntity, record, args, context, info) {
    this.record = record
    this.args = omitBy(args, isNil)
    this.context = context
    this.info = info
    this.query = Model.createQueryBuilder()
    // type: one, conn, list, association
    this.type = this.getType()
  }

  getType() {
    const { info } = this
    if (info.returnType instanceof GraphQLList) {
      return 'list'
    } else if (
      typeof info.returnType.name !== 'undefined' &&
      info.returnType.name.endsWith('Conn')
    ) {
      return 'conn'
    } else {
      return 'one'
    }
  }

  async run() {
    let { record, query, type } = this
    if (type === 'one') {
      return query.getOne()
    } else if (type === 'list') {
      return query.getMany()
    } else if (type === 'conn') {
      const [nodes, totalCount] = await query.getManyAndCount()
      return {
        nodes,
        totalCount,
        hasNextPage: this._hasNextPage(totalCount),
        pages: this._pages(totalCount),
      }
    }
  }

  _hasNextPage(totalCount) {
    const { query: { expressionMap: { skip: offset_, take: limit } } } = this
    const offset = offset_ === undefined ? 0 : offset_
    if (limit === undefined) {
      return false
    }
    return offset + limit < totalCount
  }

  _pages(totalCount) {
    const { query: { expressionMap: { take: limit } } } = this
    if (limit === undefined) {
      return 1
    }
    return Math.ceil(totalCount / limit)
  }
}
