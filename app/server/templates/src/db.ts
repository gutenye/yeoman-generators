import { User } from './models'

class Db {
  userFind(where) {
    return User.findOne({ where })
  }

  userCreate(props) {
    return User.create(props).save()
  }

  userUpdate(user, props) {
    return User.update(user.id, props)
  }

  userSerialize(user) {
    // for login/load-auth response
    return { id: user.id, username: user.username }
  }
}

export default new Db()
