import { MenuItem, ProSidebarProvider } from 'react-pro-sidebar'
import { useState } from 'react'
import Link from 'next/link'

import Sidebar from '@/components/ui/sidebar'
import NAGHeader from '@/components/new_automotive_group_header'

export default function Branches() {
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
    <>
      <div className={`app ${toggled ? 'toggled' : ''}`} style={{ display: 'flex' }}>
        {/* Sidebar */}
        <ProSidebarProvider>
          <Sidebar
            collapsed={collapsed}
            toggled={toggled}
            handleToggleSidebar={handleToggleSidebar}
            handleCollapsedChange={handleCollapsedChange}
            handleSidebarCollapse={handleSidebarCollapse}
            footer={
              <MenuItem
                icon={<img src="/sidebar_logout_icon.svg" />}
                component={<Link href="/auth/login" />}
                style={{ bottom: 0 }}
              >Cerrar sesión</MenuItem>
            }
            className="sidebar"
          >
            <MenuItem
              icon={<img src="/sidebar_branches_icon.svg" />}
              component={<Link href="/new_automotive_group/settings" />}
            >
              Agencias
            </MenuItem>
            <MenuItem
              icon={<img src="/sidebar_statistics_icon.svg" />}
              component={<Link href="/new_automotive_group/docs" />}
            >
              Estadísticas
            </MenuItem>
            <MenuItem icon={<img src="/sidebar_managers_icon.svg" />}>
              Gerentes
            </MenuItem>
          </Sidebar>
        </ProSidebarProvider>
        {/* Page */}
        <div style={{ width: '100' }}>
          <NAGHeader />
          <div>
            Agencias
          </div>
        </div>
      </div>
    </>
  )
}