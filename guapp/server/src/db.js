import { User } from 'models'

class Db {
  userFind(where) {
    return User.findOne({ where })
  }

  userCreate(props) {
    return User.create(props)
  }

  userUpdate(user, props) {
    return user.update(props)
  }

  userSerialize(user) {
    // for login/load-auth response
    return { id: user.id, username: user.username }
  }
}

export default new Db()
