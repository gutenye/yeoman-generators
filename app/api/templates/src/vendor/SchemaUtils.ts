import Permission from './Permission'
import { upperFirst, isString } from 'lodash'
import { getConnection } from 'typeorm'

export default class SchemaUtils {
  QueryUtils: any
  checkPermission: any

  constructor(QueryUtils: any, permissions: any[]) {
    this.QueryUtils = QueryUtils
    this.checkPermission = new Permission(permissions || []).checkPermission
  }

  // query('author')
  // query(Post)
  // query(Post, (q, args, context, info) => {
  //   query: { limit, offset, order, where: {} }
  //   const query = q.tags().category().query
  //   query.where = { .. }
  //   return q or data
  // })
  //
  query(Model, callback?) {
    return async (record, args, context, info) => {
      if (isString(Model)) {
        const relationName = Model
        const conn = getConnection()
        const relationMetadata = conn
          .getMetadata(record.constructor)
          .findRelationWithPropertyPath(relationName)
        const rows = await conn.relationLoader.load(relationMetadata, record)
        const result =
          relationMetadata.isOneToOne || relationMetadata.isManyToOne
            ? rows[0]
            : rows
        return result
      }

      let data
      const q = new this.QueryUtils(Model, record, args, context, info)

      // default filters
      //////////
      // sort: 'name ASC, title DESC'
      if (args.sort) {
        args.sort.split(/, +/).forEach(field => {
          const [name, asc] = field.split(/ +/)
          q.query.addOrderBy(`"${name}"`, asc || 'ASC')
        })
      }
      if (q.type === 'one') {
        q.id()
      } else if (q.type === 'conn') {
        q.pagination()
      }

      if (callback) {
        const ret = callback(q, args, context, info)
        data = ret instanceof this.QueryUtils ? ret.run() : ret
      } else {
        data = q.run()
      }

      const input = data && data.__IS_CONN ? data.nodes : data
      if (
        !this.checkPermission(
          `${upperFirst(Model.name)}.read`,
          input,
          context.user
        )
      ) {
        throw new Error('Insufficient permission')
      }

      return data
    }
  }

  // create(Post, { before, after(=>result)})
  create(Model, options: any = {}) {
    options = Object.assign(
      {
        before() {},
        after(result) {
          return result
        },
      },
      options
    )
    return async (_, args, context, info) => {
      if (
        !this.checkPermission(
          `${upperFirst(Model.name)}.create`,
          args.input,
          context.user
        )
      ) {
        throw new Error('Insufficient permission')
      }
      await options.before(_, args, context, info)
      /*
      // use forOwn to fix #1608
      const record = Model.create(args.input)
      // for unkown reasone, needs cloneDeep for relation working.
      // without cloneDeep, does not insert order.orderItems
      for (let [key, value] of Object.entries(cloneDeep(args.input))) {
        record[key] = value
      }
      let result = await record.save()
        */
      let result = await Model.create(args.input).save()
      result = await options.after(result, args, context, info)
      return result
    }
  }

  // update(Post, {before, after})
  update(Model, options: any = {}) {
    options = Object.assign(
      {
        before() {},
        after(result) {
          return result
        },
        include: [],
      },
      options
    )
    return async (_, args, context, info) => {
      const record = await Model.findOne(args.id)
      if (!record) {
        throw new Error('record not found')
      }
      if (
        !this.checkPermission(
          `${upperFirst(Model.name)}.update`,
          record,
          context.user,
          args.input
        )
      ) {
        throw new Error('Insufficient permission')
      }
      await options.before(record, args, context, info)
      for (let [key, value] of Object.entries(args.input)) {
        record[key] = value
      }
      let result = await record.save()
      result = await options.after(result, args, context, info)
      return result
    }
  }

  // delete(Post, {before, after})
  delete(Model, options: any = {}) {
    options = Object.assign(
      {
        before() {},
        after(result) {
          return result
        },
        include: [],
      },
      options
    )
    return async (_, args, context, info) => {
      let record = await Model.findById(args.id)
      if (!record) {
        throw new Error('record not found')
      }
      if (
        !this.checkPermission(
          `${upperFirst(Model.name)}.delete`,
          record,
          context.user
        )
      ) {
        throw new Error('Insufficient permission')
      }
      if (options.before) {
        await options.before(record, args, context, info)
      }
      await record.remove()
      if (options.after) {
        record = await options.after(record, args, context, info)
      }
      return record
    }
  }
}

