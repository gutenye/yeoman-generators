import React from 'react'
// import { app } from '@/states'
// import type { HeaderT } from '@/types'

interface HeaderT {}

export default function setHeader(config: HeaderT) {
  return function(WrappedComponent: any) {
    return class extends React.Component {
      render() {
        //if (!this.loaded) return null
        return <WrappedComponent {...this.props} />
      }

      componentDidMount() {
        // app.header = config
        //this.loaded = true
      }
    }
  }
}
