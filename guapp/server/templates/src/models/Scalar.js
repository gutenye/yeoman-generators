// @flow
import GraphQLTypeJSON from 'graphql-type-json'

export const Scalar = {}

Scalar.Type = {
  typeDef: `
    scalar Json
  `,
  resolver: {
    Json: GraphQLTypeJSON,
  }
}
