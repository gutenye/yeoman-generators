import 'pdjs'
import options from './typeorm.config'
import * as express from 'express'
import { createConnection } from 'typeorm'
import { ApolloServer } from 'apollo-server-express'
import { typeDefs, resolvers } from 'models/schema'

async function main() {
  await createConnection(options)

  const port = process.env.PORT || 80
  const server = new ApolloServer({ typeDefs, resolvers })
  const app = express()

  server.applyMiddleware({ app })
  app.use('/fixtures', express.static('src/fixtures/images'))

  app.listen({ port }, () => {
    console.log(`> localhost:${port}/graphql`)
  })
}

main()
