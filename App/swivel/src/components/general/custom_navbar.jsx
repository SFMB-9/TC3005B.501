import { AppBar, Box, Toolbar, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import MenuIcon from "@mui/icons-material/Menu";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";

import styles from '@/styles/custom_navbar.module.css'

export default function CustomNavbar({ home = '/', elems_left = [], elems_right = [], black = false }) {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEls, setAnchorEls] = useState({});

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenUserMenu = (event, index) => {
    setAnchorEls((prevAnchorEls) => ({
      ...prevAnchorEls,
      [index]: event.currentTarget,
    }));
  };

  const handleCloseUserMenu = (index) => {
    setAnchorEls((prevAnchorEls) => ({
      ...prevAnchorEls,
      [index]: null,
    }));
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" style={{ backgroundColor: black ? '#000' : '#1F1F1F', boxShadow: 'none' }}>
      <Toolbar>
        {/* Logo medium */}
        <Box sx={{ display: { xs: "none", md: "flex" }, mr: 6 }}>
          <Link href={home}>
            <Image
              src="/swivel_logo_white.svg"
              alt="Logo"
              width={120}
              height={30}
            />
          </Link>
        </Box>
        {/* Left-most elements, screen medium */}
        <Box
          sx={{
            flexGrow: 1,
            display: { xs: "none", md: "flex" },
            justifyContent: "flex-start",
            alignItems: "center",
            marginLeft: "25px", // Adjust the value to move the section more to the left
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "60px", // Adjust the value to increase or decrease the spacing
            }}
          >
            {elems_left.map((element, index) => (
              <Link key={index} href={element.href}>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography color="white" fontFamily="Raleway" fontSize={13}>
                    {element.name}
                  </Typography>
                </MenuItem>
              </Link>
            ))}
          </div>
        </Box>
        {/* Left-most elements, screen small */}
        {elems_left.length > 0 && (
          <Box sx={{ display: { xs: "flex", md: "none" }, }}>
            <IconButton
              size="large"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{ p: 0, color: "white" }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
            >
              {elems_left.map((element, index) => (
                <Link key={index} href={element.href}>
                  <MenuItem key={index} onClick={handleCloseNavMenu}>
                    <Typography
                      className={styles.submenu_item}
                    >
                      {element.name}
                    </Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
        )}
        {/* Logo small width */}
        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            flexGrow: 1,
            alignSelf: "center",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Link href={home}>
            <Image src="/swivel_logo_white.svg" alt="Logo" width={120} height={30} />
          </Link>
        </Box>
        {/* Right-most elements, screen medium */}
        <Box
          sx={{
            flexGrow: 1,
            display: { xs: "none", md: "flex" },
            justifyContent: "flex-end",
            alignItems: "center",
            marginRight: "16px", // Adjust the value to move the section more to the right
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "60px", // Adjust the value to increase or decrease the spacing
            }}
          >
            {elems_right.map((element, index) => (
              // Check if the element is a popup
              element.popup ? (
                <div key={index}>
                  <MenuItem
                    onClick={(event) => handleOpenUserMenu(event, index)}
                  >
                    <Typography className={styles.popup_item}>
                      {element.name}
                    </Typography>
                  </MenuItem>
                  <Menu
                    id="menu-appbar"
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    getContentAnchorEl={null}
                    anchorEl={anchorEls[index]}
                    open={Boolean(anchorEls[index])}
                    onClose={() => handleCloseUserMenu(index)}
                  >
                    {element.popup.map((popup_element, index) => (
                      <MenuItem key={index} onClick={handleCloseUserMenu}>
                        <Link href={popup_element.href}>
                          <Typography
                            className={styles.submenu_item}
                          >
                            {popup_element.name}
                          </Typography>
                        </Link>
                      </MenuItem>
                    ))}
                  </Menu>
                </div>
              ) : (
                <Link key={index} href={element.href}>
                  <MenuItem onClick={handleClose}>
                    <Typography color="white" fontFamily="Raleway" fontSize={13}>
                      {element.name}
                    </Typography>
                  </MenuItem>
                </Link>
              )
            ))}
          </div>
        </Box>
        {/* Right-most elements, screen small */}
        {elems_right.length > 0 && (
        <Box sx={{ display: { md: "none" } }}>
          <IconButton onClick={handleMenu} sx={{ p: 0, color: "white" }}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {elems_right.map((element, index) => (
              // Check if the element is a popup
              element.popup ? (
                <div key={index}>
                  <MenuItem
                    onClick={(event) => handleOpenUserMenu(event, index)}
                  >
                    <Typography className={styles.submenu_item}>
                      {element.name}
                    </Typography>
                  </MenuItem>
                  <Menu
                    id={`menu-appbar-popup-${index}`}
                    anchorEl={anchorElUser === index ? anchorEl : null}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser === index)}
                    onClose={handleCloseUserMenu}
                  >
                    {element.popup.map((popup_element, subIndex) => (
                      <MenuItem
                        key={subIndex}
                        onClick={handleCloseUserMenu}
                      >
                        <Link href={popup_element.href}>
                          <Typography className={styles.popup_item}>
                            {popup_element.name}
                          </Typography>
                        </Link>
                      </MenuItem>
                    ))}
                  </Menu>
                </div>
              ) : (
                <MenuItem key={index} onClick={handleClose}>
                  <Link href={element.href}>
                    <Typography className={styles.submenu_item}>
                      {element.name}
                    </Typography>
                  </Link>
                </MenuItem>
              )
            ))}
          </Menu>
        </Box>
        )}
      </Toolbar>
      {/* </Container> */}
    </AppBar>
  );
}