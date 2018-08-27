import * as GraphQLTypeJSON from 'graphql-type-json'
import { User } from 'models'

export default {
  Query: {
    hello() {
      return 'world'
    },
    /*
    async viewer(_, args, { user }) {
      const viewer = await User.find({ where: { id: user.id } })
      return viewer
    },
    */
  },

  Json: GraphQLTypeJSON,
}
