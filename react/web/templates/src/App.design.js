import React from 'react'
import PropTypes from 'prop-types'
import theme from './theme'
import BrowserRouter from 'gureact/BrowserRouter'
import WrapperRoute from 'gureact/WrapperRoute'
import { Route, Switch } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import AppLayout from 'pages/AppLayout'
import LoginPage from 'pages/Auth/LoginPage'
import HomeDesign from 'pages/Home/HomeDesign'
import './App.css.js'

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
          <Route path='/login' component={LoginPage} />
          <WrapperRoute wrapper={AppLayout}>
            <Route path='/' component={HomeDesign} exact />
          </WrapperRoute>
        </Switch>
      </BrowserRouter>
      </ThemeProvider>
    )
  }
}

