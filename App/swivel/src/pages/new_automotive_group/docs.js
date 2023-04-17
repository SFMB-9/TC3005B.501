import { ProSidebarProvider, MenuItem } from 'react-pro-sidebar';
import Sidebar from '@/components/ui/sidebar';
import NewAutomotiveGroupHeader from '@/components/new_automotive_group_header';
import { useState } from 'react';
import Link from 'next/link';


export default function Docs () {
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
      <div className={`app ${toggled ? 'toggled' : ''}`} style={{display: 'flex'}}>
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
          >
            <MenuItem
              icon={<img src="/sidebar_settings_icon.svg" />}
              component={<Link href="/new_automotive_group/settings" />}
            >
              Ajustes del perfil
            </MenuItem>
            <MenuItem
              icon={<img src="/sidebar_docs_icon.svg" />}
              component={<Link href="/new_automotive_group/docs" />}
            >
              Documentos
            </MenuItem>
            <MenuItem disabled icon={<img src="/sidebar_help_icon.svg" />}>
              Ayuda
            </MenuItem>
          </Sidebar>
        </ProSidebarProvider>
        {/* Page */}
        <main>
          <NewAutomotiveGroupHeader/>
          {/* Documentos */}
          <div style={{padding: '20px 50px'}}>
            <div>
              Sube tus documentos y espera a que sean aprobados
            </div>
            <div>
              (Doc-state-editbtn table)
            </div>
          </div>
        </main>
      </div>
    </>
  )
}