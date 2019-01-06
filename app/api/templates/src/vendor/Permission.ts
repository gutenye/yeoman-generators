import { forOwn, castArray, flatten } from 'lodash'

// import Permission from './Permisson'
// const checkPermission = new Permission([
//   { operations, fields, authenticated, query }
// ]).checkPermission
// if (!checkPermission('Post.read', post_s, user)) {
//   throw new Error('Insufficent permission')
// }
// checkPermission('Post.create', input, user)
// checkPermission('Post.update', post, user, input)
// checkPermission('Post.delete', post, user)

type Rule = {
  operations: string[]
  fields?: string[]
  authenticated?: boolean
  query?: Function
}

export default class Permission {
  permissions: Rule[]
  permissionsObj: any

  constructor(permissions: Rule[]) {
    this.permissions = permissions
    this.permissionsObj = this.getPermissionsObj(permissions)
  }

  // checkPermission('Post.create', object_s, user, object2_s)
  checkPermission = (operation, objects, user, objects2?) => {
    objects = castArray(objects)
    objects2 = castArray(objects2)
    return objects.every((v, i) =>
      this._checkPermission(operation, v, user, objects2[i])
    )
  }

  _checkPermission(operation, object, user, object2) {
    const action = operation.split(/\./)[1]
    if (object === null) return action === 'read'
    const permissions = this.findPermissions(operation)
    return Boolean(
      permissions.find(p => {
        if (p.authenticated && !user) {
          return false
        }
        if (p.query && !p.query(object, user, object2)) {
          return false
        }
        if (p.fields) {
          const input = action === 'update' ? object2 : object
          forOwn(input, (v, k) => {
            if (!p.fields.includes(k)) {
              delete input[k]
            }
          })
        }
        return true
      })
    )
  }

  // findPermissions('Post.create') => permissions
  findPermissions(operation) {
    const [typeName, action] = operation.split(/\./)
    return flatten(
      ['*', `${typeName}.*`, operation].map(v => this.permissionsObj[v] || [])
    )
  }

  // -> [..] => {'*': [..], 'Post.*': [..], 'Post.create': [..]}
  getPermissionsObj(permissions) {
    const ret = {}
    permissions.forEach(permission => {
      permission.operations.forEach(operation => {
        ret[operation] = ret[operation] || []
        ret[operation].push(permission)
      })
    })
    return ret
  }
}
