import React from 'react'
import Logo from './Logo'
import { Space } from '@/components'
import { Icon } from 'antd'
import { MenuWithItems } from 'gureact/antd'

const items = [
  { text: 'Home', icon: <Icon type="home" />, to: '/' },
  { text: 'Users', icon: <Icon type="user" />, items: [{ text: 'View', to: '/user' }, { text: 'Edit' }] },
]

const Drawer = () => (
  <div>
    <Logo>App</Logo>
    <Space size={2} />
    <MenuWithItems mode="inline" items={items} />
  </div>
)

export default Drawer
