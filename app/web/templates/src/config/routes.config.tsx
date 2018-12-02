import React from 'react'
import DefaultLayout from '@/layouts/DefaultLayout'
import AdminLayout from '@/layouts/AdminLayout/AdminLayout'
import BlankLayout from '@/layouts/BlankLayout'
import HomePage from '@/pages/Home/HomePage'
import Authentication from '@/pages/Auth/Authentication'
import Authorization from '@/pages/Auth/Authorization'
import LoginPage from '@/pages/Auth/LoginPage'

/**
 *  {
 *    path, component, redirect, layout, routes, ...rest,   // Route
 *    name, icon, rootDrawer, drawer,     // Drawer
 *    roles: ['admin', 'user'],           // Authorization
 */

// prettier-ignore
export default [
  { path: '/auth', layout: BlankLayout, routes: [
    { path: '/auth/login', component: LoginPage }
  ] },
  // { path: '/', layout: [Authentication, Authorization, AdminLayout], rootDrawer: true, routes: [
  { path: '/', layout: [AdminLayout], rootDrawer: true, routes: [
    { path: '/', component: HomePage, name: 'Home' },
    { path: '/users', name: 'Users', routes: [
      { path: '/users/any', name: 'Any' },
      { path: '/users/admin', name: 'Admin' },
    ]},
  ]}
]
