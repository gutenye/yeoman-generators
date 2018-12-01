import React from '@/vendor'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
// import BrowserRouter from 'gureact/react-router/BrowserRouter'
import Route2 from 'gureact/react-router/Route2'
import PrivateRoute from 'gureact/react-router/PrivateRoute'
import GoogleAnalyticsRoute from 'gureact/react-router/GoogleAnalyticsRoute'

import DefaultLayout from './layouts/DefaultLayout'
import BlankLayout from './layouts/BlankLayout'
import LoadAuth from './pages/Auth/LoadAuth'
import HomePage from './pages/Home/HomePage'
import AuthPage from './pages/Auth/AuthPage'
import './App.css.tsx'

export default (
  <LoadAuth>
    <BrowserRouter>
      <GoogleAnalyticsRoute>
        <Switch>
          <Route2 path="/auth" component={AuthPage} layout={BlankLayout} />
          {/* <PrivateRoute wrapper={AppLayout}> */}
          <Route2 layout={DefaultLayout}>
            <Route path="/" component={HomePage} exact />
          </Route2>
          {/* </PrivateRoute> */}
        </Switch>
      </GoogleAnalyticsRoute>
    </BrowserRouter>
  </LoadAuth>
)
