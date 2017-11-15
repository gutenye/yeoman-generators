import Auth from 'guserver-auth-magic'
import appRc from './appRc'
import db from './db'

export default new Auth({
  ...appRc.auth,
  methods: {
    username: { signup: false, resetPassword: false },
  },
  db,
})
