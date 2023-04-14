import { ProSidebarProvider } from 'react-pro-sidebar'
import NewAutomotiveGroupSidebar from '@/components/new_automotive_group_sidebar'
import { useState } from 'react'

export default function Settings () {
  const [collapsed, setCollapsed] = useState(false)
  const [toggled, setToggled] = useState(false)

  const handleCollapsedChange = () => {
    setCollapsed(!collapsed)
  }

  const handleToggleSidebar = (value) => {
    setToggled(value)
  }

  return (
    <>
      {/* Bootstrap row */}
      <div className={`app ${toggled ? 'toggled' : ''}`} style={{display: 'flex'}}>
        {/* Sidebar */}
        <ProSidebarProvider>
          <NewAutomotiveGroupSidebar
            collapsed={collapsed}
            toggled={toggled}
            handleToggleSidebar={handleToggleSidebar}
            handleCollapsedChange={handleCollapsedChange}
          />
        </ProSidebarProvider>
        {/* Page */}
        <main>
          <div className='col py-3'>
            <div>
              Nombre (editable)
            </div>
            <div>
              Correo Electrónico (editable)
            </div>
            <div>
              Teléfono (editable)
            </div>
            <div>
              Dirección (editable)
            </div>
            <div>
              Cancelar
            </div>
            <div>
              Guardar cambios
            </div>
          </div>
        </main>
      </div>
    </>
  )
}