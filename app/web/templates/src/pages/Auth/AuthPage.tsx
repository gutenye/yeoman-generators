import React from '@/vendor'
import LoginPage from './LoginPage'
import { Route, Switch } from 'react-router-dom'

export default ({ match }) => (
  <Switch>
    <Route path={`${match.url}/login`} component={LoginPage} />
  </Switch>
)
