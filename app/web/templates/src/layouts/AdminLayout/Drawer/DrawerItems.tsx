import React from 'react'
import routes from '@/config/routes.config'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import { auth } from '@/states'

/**
 * Supports routes, authorization
 *
 *  <DrawerItems
 *    routes: [
 *      { rootDrawer: true, routes: [
 *        { name, icon, path, drawer, routes }
 *      ]}
 *    ]
 *    linkRender
 *    iconRender
 *    ...rest
 *  />
 */

class DrawerItems extends React.PureComponent {
  render() {
    const rootDrawerItems = routes.find(v => v.rootDrawer!)!.routes
    return <Menu mode="inline">{this.renderItems(rootDrawerItems)}</Menu>
  }

  // I'm recursive
  renderItems(allItems) {
    const items = allItems.filter(v => v.drawer !== false)
    return items.map(item => {
      if (item.roles && !item.roles.includes(auth.user && auth.user.role)) {
        return null
      }
      if (item.routes) {
        return (
          <Menu.SubMenu key={item.name} title={this.renderText(item)}>
            {this.renderItems(item.routes)}
          </Menu.SubMenu>
        )
      } else {
        return <Menu.Item key={item.name}>{this.renderText(item)}</Menu.Item>
      }
    })
  }

  renderText(item) {
    const text = (
      <>
        {item.icon}
        {item.name}
      </>
    )
    if (item.path) {
      return <Link to={item.path}>{text}</Link>
    } else {
      return text
    }
  }
}

export default DrawerItems
