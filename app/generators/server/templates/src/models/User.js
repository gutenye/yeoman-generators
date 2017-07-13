import { sequelize, resolver, t } from 'vendor'

export const User = sequelize.define('user', {
  username: { type: t.STRING, unique: true, allowNull: false },
  password: { type: t.CHAR(60) },
}, {
  tableName: 'user'
})

User.Type = {
  typeDef: `
    type User {
      id: Int
      username: String
    }
  `
}

User.Query = {
  typeDef: `
    user: User
  `,
  resolver: {
    user() { return User.findById(1) }
  }
}
