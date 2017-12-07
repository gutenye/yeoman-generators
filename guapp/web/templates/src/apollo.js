import { ApolloClient } from "apollo-client"
import { ApolloLink } from 'apollo-link'
import { createUploadLink } from 'apollo-upload-client/lib/main'
import { setContext } from 'apollo-link-context'
import { onError } from 'apollo-link-error'
import { InMemoryCache } from 'apollo-cache-inmemory';
import { Toast } from 'antd-mobile'

const httpLink = createUploadLink({
  uri: '/api/graphql',
})

const authLink = setContext(() => {
  const token = localStorage.getItem('token')
  if (!token) return {}
  return {
    headers: {
      authorization: `Bearer ${token}`,
    },
  }
})

const errorLink = onError(({ networkError, graphQLErrors }) => {
  if (networkError) {
    Toast.fail(networkError.message)
  }

  if (graphQLErrors) {
    Toast.fail(graphQLErrors[0].message)
  }
})


const link = ApolloLink.from([authLink, errorLink, httpLink])
const cache = new InMemoryCache()

export const client = new ApolloClient({
  link,
  cache,
})
