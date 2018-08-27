// prettier-ignore
export default {
  permissions: [
    { operations: ['*'] }
  ],


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
