import React, { observer, styled } from 'vendor'
import DevTools from 'mobx-react-devtools'

@observer
class AppLayout extends React.Component {
  render() {
    const { children } = this.props
    return (
      <Root>
        {process.env.NODE_ENV === 'development' && <DevTools />}
        {children}
      </Root>
    )
  }
}

const Root = styled.div`
`

export default AppLayout
