/*
  Autor: Mateo Herrera
  Fecha: 2023-04-15

  Este script representa el componente Navbar, el cual es utilizado para mostrar
  la barra de navegacion de la pagina.
*/

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Link from 'next/link';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

// Constantes que contienen los nombres de las paginas y sus respectivos links
const pages = [
  {name: 'Catálogo', link: '/catalog'},
  {name: 'TODO', link: '/TODO'}, 
  {name: 'Auto-Quiz™', link: '/quiz'},  
];
const settings = [
  {name: 'Registrate', link: '/auth/signup_seller'},
  {name: 'Inicia Sesion', link: '/auth/login'},
];

// Funcion que retorna el componente Navbar
function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [auth, setAuth] = React.useState(false);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };



  return (
    <AppBar position="static" style={{ background: 'transparent', boxShadow: 'none'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link href='/'>
            <Box
              component="img"
              sx={{ 
                display: { xs: 'none', md: 'flex' }, 
                mr: 1,
                height: '30px',
              }}
              alt="Logo."
              src="/appbar_swivel_logo.svg"
            />
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{ p: 0, color: 'black' }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <Link key={page.name} href={page.link} style={{ textDecoration: 'none' }}>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography
                     color='black' 
                     fontFamily='Raleway' 
                     fontSize={13}>
                      {page.name}
                    </Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
          <Link href='/'>
            <Box
              component="img"
              sx={{ 
                display: { xs: 'flex', md: 'none' }, 
                mr: 1,
                height: '30px',
                flexGrow: 1,
              }}
              alt="Logo."
              src="/appbar_swivel_logo.svg"
            />
          </Link>
          <Typography
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
            }}
          >
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'space-evenly'}}>
            {pages.map((page) => (
              <Link href={page.link} style={{ textDecoration: 'none' }} key={page.name}>
                  <Typography
                   color='black' 
                   fontFamily='Raleway'
                   fontSize={13}
                  >
                    {page.name}
                  </Typography>
              </Link>
            ))}
          </Box>

          {!auth && (
            <>
              <Box sx={{ display: { md: 'none' } }}>
                <IconButton onClick={handleMenu} sx={{ p: 0, color: 'black' }}>
                  <MoreVertIcon/>
                </IconButton>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  {settings.map((setting) => (
                    <Link href={setting.link} style={{ textDecoration: 'none' }} key={setting.name}>
                      <MenuItem key={setting.name} onClick={handleClose}>
                        <Typography 
                          textAlign="center" 
                          fontFamily='Raleway' 
                          fontSize={13} 
                          color='black'>
                            {setting.name}
                        </Typography>
                      </MenuItem>
                    </Link>
                  ))}
                </Menu>
              </Box>

              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                {settings.map((setting, index) => (
                  <Link href={setting.link} style={{ textDecoration: 'none' }} key={setting.name}>
                    <Button
                      variant='contained'
                      disableElevation
                      color= {index === 0 ? 'secondary' : 'alternate'}
                      className= 'mx-2 rounded-pill'
                      size='medium'
                      onClick={handleClose}
                      sx={{ my: 2, display: 'block' }}
                    >
                      <Typography
                        color='black' 
                        fontFamily='Raleway'
                        fontSize={13}
                      >
                        {setting.name}
                      </Typography>
                    </Button>
                  </Link>
                ))}
              </Box>
            </>
          )}

          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenUserMenu}
                color="inherit"
              >
                <AccountCircle fontSize='500' />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography
                    color='black' 
                    fontFamily='Raleway'
                    fontSize={13}
                  >
                    Perfil
                  </Typography>
                </MenuItem>
                <MenuItem onClick={() => {handleCloseUserMenu; setAuth(false)}}>
                  <Typography
                    color='black' 
                    fontFamily='Raleway'
                    fontSize={13}
                  >
                    Cerrar Sesion
                  </Typography>
                </MenuItem>
              </Menu>
            </div>
          )}

        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;