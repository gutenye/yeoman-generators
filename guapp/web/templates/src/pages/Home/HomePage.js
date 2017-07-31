import React, { observer, styled, graphql, compose } from 'vendor'

class HomePage extends React.Component {
  render() {
    if (this.props.loading)
      return null
    const {users} = this.props
    return (
      <Root>
        hello
      </Root>
    )
  }
}

const Root = styled.div`
`

const QueryHome = graphql(`{
  users {
    name
  }
}`, {
  initData: {users: []},
})

export default compose(
  observer,
  //QueryHome,
)(HomePage)
