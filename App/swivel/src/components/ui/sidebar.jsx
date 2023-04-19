import React from 'react';
import { useMediaQuery } from '@material-ui/core';
import { Sidebar as ReactProSidebar, Menu, MenuItem, useProSidebar } from 'react-pro-sidebar';
import styles from '@/styles/sidebar.module.css';

const Sidebar = ({ handleToggleSidebar, children, footer }) => {
  const { collapseSidebar } = useProSidebar();
  const isSlimScreen = useMediaQuery('(max-width: 768px)');
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  return (
    <ReactProSidebar
      toggled={!isSlimScreen}
      onToggle={handleToggleSidebar}
      style={{ height: '100vh' }}
    >
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
                <img src="/appbar_swivel_logo.svg" width="100%" />
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
            {children}
          </Menu>
        </div>
        {/* Set div at bottom */}
        <div className="sidebar_footer" style={{ flexShrink: 0 }}>
          <Menu>
            {footer}
          </Menu>
        </div>
      </div>
    </ReactProSidebar>
  );
};

export default Sidebar;