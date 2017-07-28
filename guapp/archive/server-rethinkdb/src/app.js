import './pd'
import express from 'express'
import bodyParser from 'body-parser'
import schema from './schema'
import { apolloExpress, graphiqlExpress } from 'apollo-server'
import { setupAuth, requireAuth } from './auth'

const app = express()
const PORT = process.env.PORT || 80

app.use(bodyParser.json())
setupAuth(app)

app.post('/graphql', requireAuth, (req, res) => {
  apolloExpress({
    schema,
    context: {user: req.user}
  })(req, res)
})

app.post('/graphql-dev', apolloExpress({schema, context: {user: {id: '1', name: 'Guten'}}}))
app.get('/graphql-dev', graphiqlExpress({endpointURL: '/graphql-dev'}))

app.listen(PORT, () => {
  console.log(`> Listen on localhost:${PORT}/graphql`)
})
