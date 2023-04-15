import Link from 'next/link'
import { AppBar, Toolbar, Button, Box } from '@material-ui/core'
import styles from '@/styles/navbar.module.css'
import ButtonMango from './ui/button_mango'

export const Navbar = () => {
  return (
    <Box>
      <div position='static' style={{ boxShadow: 'none', backgroundColor: 'transparent' }} className={styles.navbar}>
          <Link href='/' className='nav-item'>
            <img src='/navbar_swivel_logo.svg' alt='Swivel'/>
          </Link>
          <ButtonMango href='/catalog' initiallyTransparent>Catálogo</ButtonMango>
          <ButtonMango disabled href='/quiz' initiallyTransparent>Auto-Quiz&trade;</ButtonMango>
          <div id={styles.auth_group} spacing={2} style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ margin: "0 8px" }}>
              <ButtonMango href='/auth/signup' hoverColor='#f6bc66'>Regístrate</ButtonMango>
            </div>
            <div style={{ margin: "0 8px" }}>
              <ButtonMango href='/auth/login' variant='contained'>Inicia sesión</ButtonMango>
            </div>
          </div>
      </div>
    </Box>
  )
}