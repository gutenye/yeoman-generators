import rc from './rc'
import { User } from 'models'

export default {
  ...rc.auth,
  methods: {
    username: {login: true, signup: false, resetPassword: false}
  },
  User
}