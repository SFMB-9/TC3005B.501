/*
Salvador Federico Milanes Braniff
18-04-2023

Formulario de configuración de nuevo grupo automotriz; 
embebido en el layout de nuevo grupo automotriz
*/
import { useState } from 'react'

import NAGForm from '@/components/automotive_group/new_automotive_group_form'
import NAGLayout from '@/components/automotive_group/new_automotive_group_layout'

export default function Settings() {
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
      <NAGLayout>
        <NAGForm/>
      </NAGLayout>
    </>
  )
}