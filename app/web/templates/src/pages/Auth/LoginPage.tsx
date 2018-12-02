import LoginComponent from './LoginComponent'
import gql from 'graphql-tag'
import { compose } from 'recompose'
import { graphql } from 'react-apollo'

const MutationLogin = graphql(
  gql`
    mutation Login($username: String, $password: String) {
      login(username: $username, password: $password) {
        token
        user {
          id
          username
        }
      }
    }
  `,
  {
    props: ({ mutate }: any) => ({
      login: args => mutate({ variables: args }),
    }),
  }
)

export default compose<any, any>(MutationLogin)(LoginComponent)
