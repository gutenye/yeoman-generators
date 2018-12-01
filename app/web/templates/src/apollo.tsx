import loggerLink from 'apollo-link-logger'
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
// import { createUploadLink } from 'apollo-upload-client'
import { setContext } from 'apollo-link-context'
import { onError } from 'apollo-link-error'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { withClientState } from 'apollo-link-state'
import { WebSocketLink } from 'apollo-link-ws'
import { split } from 'apollo-link'
import { getMainDefinition } from 'apollo-utilities'
import { local } from '@/states'
import { BatchHttpLink } from 'apollo-link-batch-http'
// import { Toast } from 'antd-mobile'

const cache = new InMemoryCache()

const stateLink = withClientState({ cache, resolvers: local.resolvers, defaults: local.defaults })

//const httpLink = createUploadLink({
const httpLink = new BatchHttpLink({
  uri: '/api/graphql',
})

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4011/graphql',
  options: {
    reconnect: true,
  },
})

// Split links, send subscription via wsLink
const transportLink = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query) as any
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  httpLink
)

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token')
  if (!token) return { headers }
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
  }
})

const errorLink = onError(({ networkError, graphQLErrors }) => {
  if (networkError) {
    console.log('onError:', networkError.message)
    // Toast.fail(networkError.message)
  }
  if (graphQLErrors) {
    console.log('onError:', graphQLErrors[0].message)
    // Toast.fail(graphQLErrors[0].message)
  }
})

export const client = new ApolloClient({
  cache,
  link: ApolloLink.from([loggerLink, stateLink, authLink, errorLink, transportLink]),
})
