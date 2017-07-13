import { makeExecutableSchema } from 'graphql-tools'
import resolvers from './resolvers'

const typeDefs = [`
  type Query {
    me: User!
  }

  type User {
    id: ID!
    posts: [Post]!
  }

  type Post {
    id: ID!
    title: String!
  }

  scalar JSON

  type Mutation {
    createNote(data: CreateNoteInput): Note
    updateNote(id: ID!, data: UpdateNoteInput): Note
    removeNote(id: ID!): Note
  }

  input CreateNoteInput {
    uid: String!
    raw: JSON
  }

  input UpdateNoteInput {
    uid: String
    raw: JSON
  }
`]

export default makeExecutableSchema({typeDefs, resolvers})
