import React from '@/vendor'
import { Layout } from 'antd'
import Drawer from './Drawer/Drawer'
import Footer from './Footer'
import Header from './Header'

const AdminLayout = props => (
  <Layout>
    <Layout.Sider theme="light">
      <Drawer />
    </Layout.Sider>
    <Layout style={{ minHeight: '100vh' }}>
      <Layout.Header style={{ background: 'white', padding: '0', boxShadow: '0 1px 4px rgba(0, 21, 41, 0.08)' }}>
        <Header />
      </Layout.Header>
      <Layout.Content>{props.children}</Layout.Content>
      <Layout.Footer>
        <Footer />
      </Layout.Footer>
    </Layout>
  </Layout>
)

export default AdminLayout
