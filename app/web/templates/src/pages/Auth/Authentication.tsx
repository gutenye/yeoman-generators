import React from 'react'
import { Redirect } from 'react-router-dom'
import { auth } from '@/states'

const Authentication = props => {
  if (auth.isLoggedIn()) {
    return props.children
  } else {
    return <Redirect to={{ pathname: '/auth/login', state: { from: props.location } }} />
  }
}

export default Authentication
