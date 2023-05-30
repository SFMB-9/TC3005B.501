/*
Salvador Federico Milanes Braniff
14-04-2023

Sidebar es el componente de la barra lateral de la aplicación.
Es abstracto, lo que permite reutilizarlo en diferentes partes de la aplicación.
*/
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useMediaQuery } from "@mui/material";
import Link from 'next/link';
import {
  Sidebar as ReactProSidebar,
  Menu,
  MenuItem,
  useProSidebar,
} from "react-pro-sidebar";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import KeyIcon from '@mui/icons-material/Key';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FolderIcon from '@mui/icons-material/Folder';
import LogoutIcon from '@mui/icons-material/Logout';
import { signOut } from "next-auth/react";

import styles from "@/styles/old_sidebar.module.css";

const Sidebar = ({ handleToggleSidebar, children, footer }) => {
  const { collapseSidebar } = useProSidebar();
  const isSlimScreen = useMediaQuery("(max-width: 768px)");
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [isBurgerVisible, setIsArrowVisible] = useState(isSlimScreen);
  const [apiData, setApiData] = useState(null);
  const { data: session } = useSession();
  const root = '/account'

  const fetchData = async () => {
    const resData = await fetch(
      `http://localhost:3000/api/managerProfile/managerP?id=${session.id}`
    );

    const res = await resData.json();

    setApiData(res.userData);
  };
  useEffect(() => {
    if (session) {
      fetchData();
    }
  }, [session]);
  const handleArrowClick = () => {
    setIsSidebarVisible(!isSidebarVisible);
    setIsArrowVisible(false);
  };

  const handleWindowResize = () => {
    const newIsSlimScreen = window.innerWidth <= 768;
    setIsArrowVisible(newIsSlimScreen);
    setIsSidebarVisible(false);
    console.log("arrow visible: ", isBurgerVisible);
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
          display: 'block' //isSlimScreen && !isSidebarVisible ? "none" : "block",
        }}
        onClick={handleSidebarClick}
      >
        {/* Contenido del Sidebar */}
        <div
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <div style={{ flexGrow: 1, overflowY: "auto" }}>
            <Menu iconShape="circle" >
              <MenuItem
                style={{ justifyContent: "space-between" }}
                icon={<img src="/sidebar_hamburger_icon.svg" />}
                onClick={() => {
                  collapseSidebar();
                }}
              >
              </MenuItem>
              <MenuItem
                disabled
                icon={<img src="/sidebar_profile_icon_2.svg" alt="profile icon" />}
              >
                <div id={styles.profile}>
                  {
                    apiData ? (
                      <>
                        <b className={styles.name}>{apiData.nombres} {apiData.apellidos}</b>
                        <p className={styles.name} style={{
                          fontSize: '0.8rem',
                          marginBottom: '0'
                        }}>{apiData.email}</p>
                      </>
                    ) : (
                      <>
                        <b className={styles.name}>Cargando...</b>
                        <p className={styles.name}>Cargando...</p>
                      </>
                    )
                  }
                </div>
              </MenuItem>
              <Link href={`${root}/`}>
                <MenuItem
                  icon={<ManageAccountsIcon />}
                  style={{ color: '#333333' }}
                  // component={Link} 
                  // href={`${root}/`}
                >
                  Mi cuenta
                </MenuItem>
              </Link>
              <Link href={`${root}/change_password`}>
                <MenuItem
                  icon={<KeyIcon />}
                  style={{ color: '#333333' }}
                  // component={Link} 
                  // href={`${root}/change_password`}
                >
                  Contraseña
                </MenuItem>
              </Link>
              <Link href={`${root}/purchases`}>
                <MenuItem
                  icon={<ShoppingBagIcon />}
                  style={{ color: '#333333' }}
                  // component={Link} 
                  // href={`${root}/purchases`}
                >
                Mis compras
                </MenuItem>
              </Link>
              <Link href={`${root}/tests`}>
              <MenuItem
                icon={<DirectionsCarIcon />}
                style={{ color: '#333333' }}
                // component={Link} 
                // href={`${root}/tests`}
              >
                Mis pruebas de manejo
              </MenuItem>
              </Link>
              <Link href={`${root}/favorites`}>
              <MenuItem
                icon={<FavoriteIcon />}
                style={{ color: '#333333' }}
                // component={Link} 
                // href={`${root}/favorites`}
              >
                Mis favoritos
              </MenuItem>
              </Link>
              <Link href={`${root}/documents`}>
              <MenuItem
                icon={<FolderIcon />}
                style={{ color: '#333333' }}
                // component={Link} 
                // href={`${root}/documents`}
              >
                Mis documentos
              </MenuItem>
              </Link>
              {/* {children} */}
            </Menu>
          </div>
          {/* Pie del Sidebar */}
          <div className="sidebar_footer" style={{ flexShrink: 0, color: '#8A8A8A' }}>
            <Menu>
              {/* {footer} */}
              <MenuItem
                icon={<LogoutIcon
                />}
                onClick={() => signOut({ callbackUrl: '/auth/login' })}
              >
                <span>Cerrar sesión</span>
              </MenuItem>
            </Menu>
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
