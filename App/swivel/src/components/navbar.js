import Link from 'next/link'
import { AppBar, Toolbar, Button, Box } from '@material-ui/core'

export const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static' style={{ boxShadow: 'none', backgroundColor: 'transparent' }}>
        <Toolbar>
          <Link href='/' className='nav-item'>
            <img src='/navbar_swivel_logo.svg' alt='Swivel'/>
          </Link>
          <Link href='/auth/signup' className='nav-item'>
            <Button variant='contained' color='primary'>Regístrate</Button>
          </Link>
          <Link href='/auth/login' className='nav-item'>
            <Button variant='contained' color='primary'>Inicia sesión</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  )
}