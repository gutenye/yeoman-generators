// @flow
import { sequelize, t } from 'vendor'

const User = sequelize.define(
  'user',
  {
    username: { type: t.STRING, unique: true, allowNull: false },
    password: { type: t.CHAR(60) },
  },
  {
    tableName: 'user',
  }
)

export default User
