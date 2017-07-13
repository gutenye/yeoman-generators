export default {
  db: {
    db: '<%=project%>',
    host: process.env.DB_HOST || 'db',
  },
  auth: {
    usersWhitelist: ['username'],
    secret: x,
    github: {
      clientID: x,
      clientSecret: x,
    }
  }
}
