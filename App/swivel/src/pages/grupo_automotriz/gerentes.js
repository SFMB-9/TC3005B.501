import { MenuItem, ProSidebarProvider } from 'react-pro-sidebar'
import { useState } from 'react'
import Link from 'next/link'
import 'bootstrap/dist/css/bootstrap.css'

import Sidebar from '@/components/ui/sidebar'
import AGMHeader from '@/components/AG_viewManagers'
import finishfooter from '@/components/footer'

export default function gerentes () {
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

      <div className = {`app ${toggled ? 'toggled' : ''}`} style={{ display: 'flex' }}>
        {/* Sidebar*/}
        <ProSidebarProvider>
        <Sidebar
            collapsed = {collapsed}
            toggled = {toggled}
            handleToggleSidebar = {handleToggleSidebar}
            handleCollapsedChange = {handleCollapsedChange}
            handleSidebarCollapse = {handleSidebarCollapse}

            sidebarFooter={
                <MenuItem
                icon={<img src="/sidebar_logout_icon.svg" />}
                component={<Link href="/auth/login" />}
                style={{ bottom: 0 }}
                >Cerrar sesión</MenuItem>
            }
            className = "sidebar"
          >

            <MenuItem
                icon={<img src="/sidebar_branches_icon.svg" />}
                component={<Link href="/grupo_automotriz/agencias" />}
            >Agencias</MenuItem>

            <MenuItem
               icon={<img src="/sidebar_statistics_icon.svg" />}
               component={<Link href="/nuevo_grupo_automotriz/docs" />}
            >Estadísticas</MenuItem>

            <MenuItem 
              icon={<img src="/sidebar_managers_icon.svg" />}
              component={<Link href="/grupo_automotriz/gerentes" />}
            >Gerentes</MenuItem>

          </Sidebar>
        </ProSidebarProvider>


        {/* Page */}
        <div style={{width: '100'}}>
          <finishfooter>
            <AGMHeader>Agencias</AGMHeader>
          </finishfooter>

        </div>
      </div>
    </>
  )
}