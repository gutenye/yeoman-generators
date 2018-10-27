import s from '../schemaUtils'
import { User } from 'models'

export default {
  Query: {
    user: s.query(User)
    users: s.query(User, (q, args) => {
      return q.q({ fields: ['name'] })
    })
  }
}
