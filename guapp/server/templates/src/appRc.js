export default {
  db: {
    url: process.env.DATABASE_URL || 'postgres://root:root@db/app',
  },

  auth: {
    secret: 'SECRET',
    usersWhitelist: [''],
    github: {
      clientID: '',
      clientSecret: '',
    },
  },

  sms: {
    appkey: '',
    appsecret: '',
    signName: '',
    signup: '',
    resetPassword: '',
  },
}
