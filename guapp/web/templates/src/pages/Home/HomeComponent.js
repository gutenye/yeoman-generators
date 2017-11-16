import React, { observer, styled } from 'vendor'

class HomeComponent extends React.Component {
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

export default HomeComponent
