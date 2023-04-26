import { useState } from "react";
import Link from 'next/link'
import MUIDataTable from "mui-datatables";
import { ProSidebarProvider, MenuItem } from "react-pro-sidebar";

import Sidebar from '@/components/general/sidebar';
import NAGHeader from '@/components/automotive_group/new_automotive_group_header';

const columns = [
  { name: "Nombre", label: "Nombre", options: { filter: false, sort: true } },
  { name: "Archivo", label: "Archivo", options: { filter: false, sort: false } },
  { name: "Ultima modificación", label: "Ultima modificación", options: { filter: false, sort: true } },
  { name: "Estatus", label: "Estatus", options: { filter: true, sort: true } },
  { name: "Comentarios", label: "Comentarios", options: { filter: false, sort: true } }
];

const data = [
  ["Doc_1", "Vista Previa", "DD/MM/AAAA", "Rechazado", "Ver Comentarios"],
  ["Doc_2", "Vista Previa", "DD/MM/AAAA", "Aprovado", "Sin Comentarios"],
  ["Doc_3", "Vista Previa", "DD/MM/AAAA", "Aprovado", "Sin Comentarios"],
  ["Doc_4", "Vista Previa", "DD/MM/AAAA", "En proceso", "Ver Comentarios"],
];

const options = {
  filterType: 'dropdown',
  download: false,
  print: false,
  viewColumns: false,
  download: false,
  expandableRows: false,
  responsive: "standard",
  fixedSelectColumn: true,
  selectableRows: 'none',
  selectableRowsHeader: false,
  textLabels: {
    body: {
      noMatch: 'No se encontró',
      toolTip: 'Ordenar',
      columnHeaderTooltip: column => `Ordenar por ${column.label}`
    },
    pagination: {
      next: 'Siguiente Pagina',
      previous: 'Pagina Anterior',
      rowsPerPage: 'Filas por pagina:',
      displayRows: 'of',
    },
    toolbar: {
      search: 'Buscar',
      filterTable: 'Filtros',
    },
    filter: {
      all: 'All',
      title: 'Filtros',
      reset: 'Reiniciar',
    },
    selectedRows: {
      text: 'fila(s) seleccionadas',
      delete: 'Borrar',
      deleteAria: 'Borrar filas seleccionadas',
    },
  },
};
export default function Docs() {
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
            Documentos
          </div>
          <MUIDataTable
            data={data}
            columns={columns}
            options={options}
          />
        </div>
      </div>
    </>
  )
}