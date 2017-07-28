import r from './rethinkdb'

export default {
  Query: {
    me(root, {}, {user}) {
      return r.table('users').get(user.id).run()
    },
  },

  User: {
    notes(user) {
      return r.table('notes').getAll(user.id, {index: 'userId'}).run()
    },

    note(user, {uid}) {
      return r.table('notes').filter({userId: user.id, uid}).nth(0).default(null).run()
    },

    search(user) {
    },
  },

  JSON: {
    __serialize(value) {
      return value
    },
    __parseValue(value) {
      return value
    }
  },

  Mutation: {
    createNote(root, {data}, {user}) {
      return r.table('notes').insert({...data, userId: user.id}, {returnChanges: 'always'}).run().then(v => {
        if (v.errors > 0)
          return {error: v.first_error}
        return v.changes[0].new_val
      })
    },
    updateNote(root, {id, data}) {
      return r.table('notes').get(id).update(data, {returnChanges: 'always'}).run().then(v => {
        if (v.errors > 0)
          return {error: v.first_error}
        return v.changes[0].new_val
      })
    },
    removeNote(root, {id}) {
      return r.table('notes').get(id).delete({returnChanges: 'always'}).run().then(v => {
        return v.changes[0].old_val
      })
    },
  },
}
