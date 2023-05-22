/*
Salvador Federico Milanes Braniff
17-04-2023

Layout genérico para las páginas de Nuevo Grupo Automotriz.
Utilizarlo permite reducir la cantidad de codigo redundante en interfaces
*/
import { useState } from "react";
import { MenuItem, ProSidebarProvider } from "react-pro-sidebar";
import Link from "next/link";

import NAGHeader from "@/components/providers/GA/new_automotive_group_header";
import Sidebar from "@/components/general/custom_sidebar";

export default function NAGLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);

  const handleCollapsedChange = () => {
    setCollapsed(!collapsed);
  };

  const handleToggleSidebar = (value) => {
    setToggled(value);
  };

  const handleSidebarCollapse = () => {
    setCollapsed(!collapsed);
    setToggled(false);
  };

  return (
    <div
      className={`app ${toggled ? "toggled" : ""}`}
      style={{ display: "flex" }}
    >
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
              component={<Link href="/auth/login_comprador" />}
              style={{ bottom: 0 }}
            >
              Cerrar sesión
            </MenuItem>
          }
          className="sidebar"
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
      <div style={{ width: "100%" }}>
        <NAGHeader />
        {children}
      </div>
    </div>
  );
}
