import React from 'react'
import Logo from './Logo'
import DrawerItems from './DrawerItems'
import { Space } from '@/components'

const Drawer = () => (
  <div>
    <Logo>App</Logo>
    <Space size={2} />
    <DrawerItems />
  </div>
)

export default Drawer
