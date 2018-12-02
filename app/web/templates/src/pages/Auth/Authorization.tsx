import React from 'react'
import Error403 from '@/pages/Error/403'
import routes from '@/config/routes.config'
import { findRouteDeep } from '@/utils'
import { auth } from '@/states'
import { trimEnd } from 'lodash'

const Authorization = props => {
  pd('routes', routes)
  const route = findRouteDeep(routes, trimEnd(props.location.pathname, '/'))
  if (
    !route || // not found
    !route.roles || // any role
    route.roles.includes(auth.user && auth.user.role) // matches role
  ) {
    return props.children
  } else {
    return <Error403 />
  }
}

export default Authorization
