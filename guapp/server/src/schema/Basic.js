import GraphQLTypeJSON from 'graphql-type-json'
import { User } from 'models'

export default {
  typeDefs: `
    extend type Query {
      viewer: User
    }

    scalar Json
  `,

  resolvers: {
    Query: {
      async viewer(_, args, { user }) {
        const viewer = await User.find({ where: { id: user.id } })
        return viewer
      },
    },

    Json: GraphQLTypeJSON,
  },
}
