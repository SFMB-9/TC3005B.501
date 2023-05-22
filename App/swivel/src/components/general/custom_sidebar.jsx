/*
Salvador Federico Milanes Braniff
14-04-2023

Sidebar es el componente de la barra lateral de la aplicación.
Es abstracto, lo que permite reutilizarlo en diferentes partes de la aplicación.
*/
import React, { useState, useEffect } from "react";
import { useMediaQuery } from "@mui/material";
import {
  Sidebar as ReactProSidebar,
  Menu,
  MenuItem,
  useProSidebar,
} from "react-pro-sidebar";

import styles from "@/styles/sidebar.module.css";

const Sidebar = ({ handleToggleSidebar, children, footer }) => {
  const { collapseSidebar } = useProSidebar();
  const isSlimScreen = useMediaQuery("(max-width: 768px)");
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [isBurgerVisible, setIsArrowVisible] = useState(isSlimScreen);

  const handleArrowClick = () => {
    setIsSidebarVisible(!isSidebarVisible);
    setIsArrowVisible(false);
  };

  const handleWindowResize = () => {
    const newIsSlimScreen = window.innerWidth <= 768;
    setIsArrowVisible(newIsSlimScreen);
    setIsSidebarVisible(false);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isSidebarVisible &&
        !event.target.closest(".pro-sidebar") &&
        !event.target.closest(".sidebar-arrow-button")
      ) {
        setIsSidebarVisible(false);
        setIsArrowVisible(true);
      }
    };

    if (isSidebarVisible) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isSidebarVisible]);

  const handleSidebarClick = (event) => {
    event.stopPropagation();
  };

  return (
    <div className="sidebar-container" style={{ height: "100vh" }}>
      {/* Sidebar */}
      <ReactProSidebar
        toggled={isSidebarVisible}
        onToggle={handleToggleSidebar}
        style={{
          height: "100%",
          opacity: 1,
          position: isSlimScreen && isSidebarVisible ? "fixed" : "relative",
          display: isSlimScreen && !isSidebarVisible ? "none" : "block",
        }}
        onClick={handleSidebarClick}
      >
        {/* Contenido del Sidebar */}
        <div
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <div style={{ flexGrow: 1, overflowY: "auto" }}>
            <Menu iconShape="circle">
              <MenuItem
                // icon={<img src="/sidebar_profile_icon_2.svg" />}
              >
                <div id={styles.profile}>
                  {/* <b className={styles.name}>Nombre Apellido</b> */}
                  <img src="/sidebar_profile_icon_2.svg" />
                  <span className={styles.name}>Nombre Apellido</span>
                </div>
              </MenuItem>
              {children}
            </Menu>
          </div>
          {/* Pie del Sidebar */}
          <div className="sidebar_footer" style={{ flexShrink: 0 }}>
            <Menu>{footer}</Menu>
          </div>
        </div>
      </ReactProSidebar>
      {/* Parrilla para mostrar Sidebar colapsado */}
      {isBurgerVisible && (
        <div
          className="sidebar-arrow-button"
          style={{
            zIndex: 1000,
            position: "fixed",
            top: "2vh",
            left: "1vw",
            transform: "translateY(-50%)",
          }}
          onClick={handleArrowClick}
        >
          <img src="/sidebar_hamburger_icon.svg" alt="Toggle Sidebar" />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
