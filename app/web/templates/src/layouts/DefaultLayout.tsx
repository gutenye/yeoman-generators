import React from 'react'
import Helmet from 'react-helmet'
import PreloadData from '../pages/PreloadData'
import { observer } from 'mobx-react'

const DevTools = process.env.NODE_ENV !== 'production' ? require('mobx-react-devtools').default : null

@observer
class AppLayout extends React.Component {
  render() {
    // if (this.state.loading) return null
    return (
      <div>
        {/* {process.env.NODE_ENV !== 'production' && <DevTools />} */}
        {/* <Helmet title={app.header.pageTitle || 'ERP'} /> */}
        <PreloadData children={this.props.children} />
        {/*<Layout inner header={app.header} drawer={drawer}>
          {this.props.children}
        </Layout>
        */}
      </div>
    )
  }
}

export default AppLayout
