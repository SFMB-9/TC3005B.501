import React, { useState } from 'react'
import { MenuItem, ProSidebarProvider } from 'react-pro-sidebar'
import Link from 'next/link'

import Sidebar from '@/components/ui/sidebar'
import Navbar from '@/components/navbar'

export default function SellerLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false)
  const [toggled, setToggled] = useState(false)

  const handleCollapsedChange = () => {
    setCollapsed(!collapsed)
  }

  const handleToggleSidebar = (value) => {
    setToggled(value)
  }

  const handleSidebarCollapse = () => {
    setCollapsed(!collapsed)
    setToggled(false)
  }

  return (
    <div className={`app ${toggled ? 'toggled' : ''}`} style={{ display: 'flex' }}>
      {/* Sidebar */}
      {/* <ProSidebarProvider>
      <Sidebar
          collapsed={collapsed}
          toggled={toggled}
          handleToggleSidebar={handleToggleSidebar}
          handleCollapsedChange={handleCollapsedChange}
          handleSidebarCollapse={handleSidebarCollapse}
          footer={
            <MenuItem
              icon={<img src="/sidebar_logout_icon.svg" />}
              component={<Link href="/auth/login_comprador" />}
              style={{ bottom: 0 }}
            >Cerrar sesión</MenuItem>
          }
          className="sidebar"
        >
          <MenuItem
            icon={<img src="/sidebar_bell_icon.png" />}
            component={<Link href="./applications" />}
          >Solicitudes</MenuItem>
          <MenuItem
            icon={<img src="/sidebar_chat_icon.png" />}
            component={<Link href="./chats" />}
          >Chat</MenuItem>
          <MenuItem
            icon={<img src="/sidebar_catalog_icon.png" />}
            component={<Link href="./catalog" />}
          >Catálogo</MenuItem>
        </Sidebar>
      </ProSidebarProvider> */}
      {/* <Navbar/> */}
      <div style={{ width: '100%' }}>
        {children}
      </div>
    </div>
  )
}