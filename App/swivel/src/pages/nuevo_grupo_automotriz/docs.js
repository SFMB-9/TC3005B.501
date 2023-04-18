/*
Salvador Federico Milanés Braniff
17-4-2023

Pantalla de documentos del Grupo Automotriz
Incluye un componente de Sidebar y una sección para subir documentos
*/

import { ProSidebarProvider, MenuItem } from 'react-pro-sidebar';
import Sidebar from '@/components/ui/sidebar';
import NAGHeader from '@/components/new_automotive_group_header';
import { useState } from 'react';
import Link from 'next/link';
import NAGForm from '@/components/new_automotive_group_form';


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
              component={<Link href="./settings" />}
            >
              Ajustes del perfil
            </MenuItem>
            <MenuItem
              icon={<img src="/sidebar_docs_icon.svg" />}
              component={<Link href="./docs" />}
            >
              Documentos
            </MenuItem>
            <MenuItem disabled icon={<img src="/sidebar_help_icon.svg" />}>
              Ayuda
            </MenuItem>
          </Sidebar>
        </ProSidebarProvider>
        {/* Page */}
        <div style={{width: '100%'}}>
          <NAGHeader/>
          <div>
            Sube tus documentos y espera a que sean aprobados
          </div>
          <div>
            (Doc-state-editbtn table)
          </div>
        </div>
      </div>
    </>
  )
}