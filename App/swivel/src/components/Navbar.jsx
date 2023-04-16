import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Link from 'next/link';

const pages = [
  {name: 'Catalogo', link: '/catalogo'},
  {name: 'TODO', link: '/TODO'}, 
  {name: 'Auto-Quiz', link: '/Auto-Quiz'},  
];
const settings = [
  {name: 'Registrate', link: '/Registrate'},
  {name: 'Inicia Sesion', link: '/Iniciar Sesion'},
];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

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
              src="/sidebar_swivel_logo.svg"
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
                    <Typography color='black' fontFamily='Raleway' fontSize={13}>{page.name}</Typography>
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
              src="/sidebar_swivel_logo.svg"
            />
          </Link>
          {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
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
              <Link href={page.link} style={{ textDecoration: 'none' }}>
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

          <Box sx={{ display: { md: 'none' } }}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, color: 'black' }}>
              <MoreVertIcon/>
            </IconButton>
            <Menu
              sx={{ mt: '45px' }}
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
              {settings.map((setting) => (
                <Link href={setting.link} style={{ textDecoration: 'none' }}>
                  <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center" fontFamily='Raleway' fontSize={13} color='black'>{setting.name}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {settings.map((setting, index) => (
              <Link href={setting.link} style={{ textDecoration: 'none' }}>
                <Button
                  variant='contained'
                  disableElevation
                  color= {index === 0 ? 'secondary' : 'alternate'}
                  className= 'mx-2 rounded-pill'
                  size='medium'
                  key={setting.name}
                  onClick={handleCloseUserMenu}
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

        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;