import { Router, Route, Switch } from 'react-router-dom'
import BrowserRouter from 'gureact/BrowserRouter'
import PrivateRoute from 'gureact/PrivateRoute'
import WrapperRoute from 'gureact/WrapperRoute'
import GoogleAnalytics from 'gureact/GoogleAnalytics'

import LoadAuth from './pages/Auth/LoadAuth'
import HomePage from './pages/Home/HomePage'
import LoginPage from './pages/Auth/LoginPage'
//import LoginOAuthTokenPage from './pages/Auth/LoginOAuthTokenPage'
import AppLayout from './pages/AppLayout'
import './App.css.tsx'

export default (
  <LoadAuth>
    <BrowserRouter>
      <WrapperRoute wrapper={GoogleAnalytics}>
        <Switch>
          <Route path='/login' component={LoginPage} />
          {/*<Route path='/login-oauth-token' component={LoginOAuthTokenPage} />*/}
          <WrapperRoute wrapper={AppLayout}>
            <Route path='/' component={HomePage} exact />
          </WrapperRoute>
        </Switch>
      </WrapperRoute>
    </BrowserRouter>
  </LoadAuth>
)
    