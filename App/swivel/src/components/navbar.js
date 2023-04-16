import Link from 'next/link'
import { AppBar, Toolbar, Button, Box } from '@material-ui/core'
import styles from '@/styles/navbar.module.css'
import SwivelButton from './ui/swivel_button'

export const Navbar = () => {
  return (
    <Box>
      <div position='static' style={{ boxShadow: 'none', backgroundColor: 'transparent' }} className={styles.navbar}>
          <Link href='/' className='nav-item'>
            <img src='/navbar_swivel_logo.svg' alt='Swivel'/>
          </Link>
          <SwivelButton href='/catalog' initiallyTransparent>Catálogo</SwivelButton>
          <SwivelButton disabled href='/quiz' initiallyTransparent>Auto-Quiz&trade;</SwivelButton>
          <div id={styles.auth_group} spacing={2} style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ margin: "0 8px" }}>
              <SwivelButton href='/auth/signup' hoverColor='#f6bc66'>Regístrate</SwivelButton>
            </div>
            <div style={{ margin: "0 8px" }}>
              <SwivelButton href='/auth/login' variant='contained'>Inicia sesión</SwivelButton>
            </div>
          </div>
      </div>
    </Box>
  )
}