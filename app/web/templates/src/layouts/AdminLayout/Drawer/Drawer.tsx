import React from 'react'
import Logo from './Logo'
import { Space } from '@/components'
import { MenuWithConfig } from 'gureact/antd'
import routes from '@/config/routes.config'

const Drawer = () => (
  <div>
    <Logo>App</Logo>
    <Space size={2} />
    <MenuWithConfig mode="inline" items={routes} />
  </div>
)

export default Drawer
