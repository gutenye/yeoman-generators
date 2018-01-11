import React, { observer, styled } from 'vendor'
const DevTools = process.env.NODE_ENV !== 'production' ? require('mobx-react-devtools').default : null

@observer
class AppLayout extends React.Component {
  render() {
    const { children } = this.props
    return (
      <Root>
        {/* {process.env.NODE_ENV !== 'production' && <DevTools />} */}
        {children}
      </Root>
    )
  }
}

const Root = styled.div`
`

export default AppLayout
