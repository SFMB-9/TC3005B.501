import { useState } from 'react';
import NAGLayout from '@/components/new_automotive_group_layout';

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
      <NAGLayout>
        (Doc-state-editbtn table)
      </NAGLayout>
    </>
  )
}