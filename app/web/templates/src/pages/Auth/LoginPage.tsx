import { graphql, gql, compose } from '@/vendor'
import LoginComponent from './LoginComponent'

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

export default compose(MutationLogin)(LoginComponent)
