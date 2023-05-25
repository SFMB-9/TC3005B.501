import { useState } from "react";
import { AppBar, Box, Toolbar, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import MenuIcon from "@mui/icons-material/Menu";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { signOut } from "next-auth/react";
import styles from '@/styles/custom_navbar.module.css';

export default function CustomNavbar({
  home = '/',
  elems_left = [],
  elems_right = [],
  black = false
}) {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorEls, setAnchorEls] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

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

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <AppBar position="static" style={{ backgroundColor: black ? '#000' : '#1F1F1F', boxShadow: 'none' }}>
      <Toolbar>
        <Box sx={{ display: { xs: "none", md: "flex" }, mr: 6 }}>
          <Link href={home}>
            <Image src="/swivel_logo_white.svg" alt="Logo" width={120} height={30} />
          </Link>
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            display: { xs: "none", md: "flex" },
            justifyContent: "flex-start",
            alignItems: "center",
            marginLeft: "25px",
          }}
        >
          <div style={{ display: "flex", gap: "60px" }}>
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
        {elems_left.length > 0 && (
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
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
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
            >
              {elems_left.map((element, index) => (
                <Link key={index} href={element.href}>
                  <MenuItem key={index} onClick={handleCloseNavMenu}>
                    <Typography className={styles.submenu_item}>
                      {element.name}
                    </Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
        )}
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
        <Box
          sx={{
            flexGrow: 1,
            display: { xs: "none", md: "flex" },
            justifyContent: "flex-end",
            alignItems: "center",
            marginRight: "16px"
          }}
        >
         
          <div style={{ display: "flex", gap: "60px" }}>
            {elems_right.map((element, index) => (
              element.popup ? (
                <div key={index}>
                  <MenuItem onClick={(event) => handleOpenUserMenu(event, index)}>
                    <Typography className={styles.popup_item}>
                      {element.name}
                    </Typography>
                  </MenuItem>
                  <Menu
                    id="menu-appbar"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                    getContentAnchorEl={null}
                    anchorEl={anchorEls[index]}
                    open={Boolean(anchorEls[index])}
                    onClose={() => handleCloseUserMenu(index)}
                  >
                    {element.popup.map((popup_element, index) => (
                      <MenuItem key={index} onClick={handleCloseUserMenu}>
                        {popup_element.signoutComponent ? (
                          <Typography className={styles.popup_item} onClick={() => signOut({ callbackUrl: popup_element.signoutComponent })}>
                            {popup_element.name}
                          </Typography>
                        ) : (
                          <Link href={popup_element.href}>
                            <Typography className={styles.popup_item}>
                              {popup_element.name}
                            </Typography>
                          </Link>
                        )}
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
        {elems_right.length > 0 && (
          <Box sx={{ display: { md: "none" } }}>
            <IconButton onClick={handleMenu} sx={{ p: 0, color: "white" }}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {elems_right.map((element, index) => (
                element.popup ? (
                  <div key={index}>
                    <MenuItem onClick={(event) => handleOpenUserMenu(event, index)}>
                      <Typography className={styles.submenu_item}>
                        {element.name}
                      </Typography>
                    </MenuItem>
                    <Menu
                      id={`menu-appbar-popup-${index}`}
                      anchorEl={anchorElUser === index ? anchorEl : null}
                      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                      keepMounted
                      transformOrigin={{ vertical: "top", horizontal: "right" }}
                      open={Boolean(anchorElUser === index)}
                      onClose={handleCloseUserMenu}
                    >
                      {element.popup.map((popup_element, subIndex) => (
                        <MenuItem key={subIndex} onClick={handleCloseUserMenu}>
                          {popup_element.signoutComponent ? (
                            <Typography className={styles.popup_item} onClick={() => handleSignout(popup_element.signoutComponent)}>
                              {popup_element.name}
                            </Typography>
                          ) : (
                            <Link href={popup_element.href}>
                              <Typography className={styles.popup_item} onClick={() => handleSignout(popup_element.signoutComponent)}>
                                {popup_element.name}
                              </Typography>
                            </Link>
                          )}
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
    </AppBar>
  );
}