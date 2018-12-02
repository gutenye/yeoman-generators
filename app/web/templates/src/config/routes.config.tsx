import React from 'react'
import DefaultLayout from '@/layouts/DefaultLayout'
import AdminLayout from '@/layouts/AdminLayout/AdminLayout'
import BlankLayout from '@/layouts/BlankLayout'
import HomePage from '@/pages/Home/HomePage'
import LoginPage from '@/pages/Auth/LoginPage'

// prettier-ignore
export default [
  { path: '/auth', layout: BlankLayout, routes: [
    { path: '/auth/login', component: LoginPage }
  ] },
  { path: '/', layout: AdminLayout, rootDrawer: true, routes: [
    { path: '/', component: HomePage, exact: true, name: 'Home' },
    { path: '/users', name: 'Users', routes: [
      { path: '/users/view', name: 'View' }
    ]}
  ]}
]
