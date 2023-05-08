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
    icon={<img src="/sidebar_profile_icon.png" />}
    component={<Link href="./account" />}
  >
    Mi cuenta
  </MenuItem>
  <MenuItem
    icon={<img src="/sidebar_folder_icon.png" />}
    component={<Link href="./docs" />}
  >
    Mis documentos
  </MenuItem>
  <MenuItem
    icon={<img src="/sidebar_bell_icon.png" />}
    component={<Link href="./applications" />}
  >
    Mis solicitudes
  </MenuItem>
  <MenuItem component={<Link href='./buyer/appointments'/>}>
    Mis pruebas de manejo
  </MenuItem>
  <MenuItem
    icon={<img src="/sidebar_heart_icon.png" />}
    component={<Link href="./favorites" />}
  >
    Favoritos
  </MenuItem>
  <MenuItem
    icon={<img src="/sidebar_catalog_icon.png" />}
    component={<Link href="./catalog" />}
  >
    Catálogo
  </MenuItem>
</Sidebar>;
