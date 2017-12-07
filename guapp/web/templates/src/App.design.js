import './App.css.js'
import React from 'react'
import PropTypes from 'prop-types'
import theme from './theme'
import PrivateRoute from 'gureact/lib/PrivateRoute'
import BrowserRouter from 'gureact/lib/polyfill/patch-react-router'
import { Route, Switch } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import HomeDesign from 'pages/Home/HomeDesign'

export default class App extends React.Component {
  static childContextTypes = {
    reactIconBase: PropTypes.object
  }

  getChildContext() {
    return {
      reactIconBase: {
        size: 32,
        className: 'icon',
      }
    }
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route path='/' component={HomeDesign} exact />
        </Switch>
      </BrowserRouter>
      </ThemeProvider>
    )
  }
}

