import React from 'react';
import { useMediaQuery } from '@material-ui/core';
import Link from 'next/link';
import { Sidebar, Menu, MenuItem, useProSidebar } from 'react-pro-sidebar';
import styles from '@/styles/sidebar.module.css';

const NewAutomotiveGroupSidebar = ({ handleToggleSidebar }) => {
  const { collapseSidebar } = useProSidebar();

  const isSlimScreen = useMediaQuery('(max-width: 768px)');

  return (
    <Sidebar
      toggled={!isSlimScreen}
      onToggle={handleToggleSidebar}
      style={{ height: '100vh' }}
    >
      {/* Wrap content in a flex container */}
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ flexGrow: 1 }}>
          <Menu iconShape="circle">
            <MenuItem
              style={{ justifyContent: 'space-between' }}
              icon={<img src="/sidebar_hamburger_icon.svg" />}
              onClick={() => {
                collapseSidebar();
              }}
            >
              <div>
                <img src="/sidebar_swivel_logo.svg" width="100%" />
              </div>
            </MenuItem>
            <MenuItem
              disabled
              icon={<img src="/sidebar_profile_icon_2.svg" />}
            >
              <div id={styles.profile}>
                <b className={styles.name}>Grupo A.</b>
                <span className={styles.name}>grupo.a@demo.com</span>
              </div>
            </MenuItem>
            <MenuItem
              icon={<img src="/sidebar_settings_icon.svg" />}
              component={<Link href="/new_automotive_group/settings" />}
            >
              Ajustes del perfil
            </MenuItem>
            <MenuItem
              disabled
              icon={<img src="/sidebar_docs_icon.svg" />}
              component={<Link href="/new_automotive_group/docs" />}
            >
              Documentos
            </MenuItem>
            <MenuItem disabled icon={<img src="/sidebar_help_icon.svg" />}>
              Ayuda
            </MenuItem>
          </Menu>
        </div>
        {/* Set div at bottom */}
        <div style={{ flexShrink: 0 }}>
          <Menu className="sidebar_footer" style={{}}>
            <MenuItem
              icon={<img src="/sidebar_logout_icon.svg" />}
              component={<Link href="/auth/login" />}
              style={{ bottom: 0 }}
            >
              <span>Cerrar sesión</span>
            </MenuItem>
          </Menu>
        </div>
      </div>
    </Sidebar>
  );
};

export default NewAutomotiveGroupSidebar;