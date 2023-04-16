import { ProSidebarProvider } from 'react-pro-sidebar'
import NewAutomotiveGroupSidebar from '@/components/new_automotive_group_sidebar'
import NewAutomotiveGroupHeader from '@/components/new_automotive_group_header'
import { useState } from 'react'
import { Grid, TextField, Button } from '@material-ui/core'
import styles from '@/styles/new_automotive_group_settings.module.css'

export default function Settings() {
  const [collapsed, setCollapsed] = useState(false)
  const [toggled, setToggled] = useState(false)

  const handleCollapsedChange = () => {
    setCollapsed(!collapsed)
  }

  const handleToggleSidebar = (value) => {
    setToggled(value)
  }

  const handleSidebarCollapse = () => {
    setCollapsed(!collapsed)
    setToggled(false)
  }

  return (
    <>
      <div className={`app ${toggled ? 'toggled' : ''}`} style={{ display: 'flex' }}>
        {/* Sidebar */}
        <ProSidebarProvider>
          <NewAutomotiveGroupSidebar
            collapsed={collapsed}
            toggled={toggled}
            handleToggleSidebar={handleToggleSidebar}
            handleCollapsedChange={handleCollapsedChange}
            handleSidebarCollapse={handleSidebarCollapse}
          />
        </ProSidebarProvider>
        {/* Page */}
        <main>
          <NewAutomotiveGroupHeader />
          {/* Solicitud Alta Grupo Automotriz */}
          <div style={{ padding: '20px 50px' }}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <div className={styles.field}>
                  <div className={styles.edit}>
                    <b className={styles.lg}>Nombre</b>
                    <img src='/edit_icon.svg' className={styles.pencil} />
                  </div>
                  <span className={styles.sm}>Grupo Automotriz</span>
                </div>
              </Grid>
            </Grid>
            <Grid container spacing={4}>
              <Grid item xs={6}>
                <div className={styles.field}>
                  <div className={styles.edit}>
                    <b>Correo electrónico</b>
                    <img src='/edit_icon.svg' className={styles.pencil} />
                  </div>
                  <span className={styles.sm}>grupo.a@demo.com</span>
                </div>
              </Grid>
              <Grid item>
                <div className={styles.field}>
                  <div className={styles.edit}>
                    <b>Teléfono</b>
                    <img src='/edit_icon.svg' className={styles.pencil} />
                  </div>
                  <span className={styles.sm}>+52 55 1234 5678</span>
                </div>
              </Grid>
            </Grid>
            <Grid container spacing={2} id={styles.address}>
              <Grid item xs={12} style={{ alignSelf: 'end' }}>
                <b>Dirección</b>
              </Grid>
              <Grid item xs={2} style={{ alignSelf: 'center' }}>
                <span className={styles.tag}>Calle</span>
              </Grid>
              <Grid item xs={10}>
                <TextField fullWidth variant='outlined' autoComplete='Avenida Carlos Lazo' />
              </Grid>
            </Grid>
            <Grid container spacing={4}>
              <Grid item xs={2} style={{ alignSelf: 'center' }}>
                <span className={styles.tag}>Número</span>
              </Grid>
              <Grid item xs={4}>
                <TextField fullWidth variant='outlined' />
              </Grid>
              <Grid item xs={2} style={{ alignSelf: 'center' }}>
                <span className={styles.tag}>Código postal</span>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  variant='outlined'
                />
              </Grid>
            </Grid>
            <Grid container spacing={4}>
              <Grid item xs={2} style={{alignSelf: 'center'}}>
                <span className={styles.tag}>Colonia</span>
              </Grid>
              <Grid item xs={10}>
                <TextField
                  fullWidth
                  variant='outlined'
                />
              </Grid>
            </Grid>
            <Grid container spacing={4}>
              <Grid item xs={2} style={{alignSelf: 'center'}}>
                <span className={styles.tag}>Municipio/ Delegación</span>
              </Grid>
              <Grid item xs={10}>
                <TextField
                  fullWidth
                  variant='outlined'
                />
              </Grid>
            </Grid>
            <Grid container spacing={4}>
              <Grid item xs={2} style={{alignSelf: 'center'}}>
                <span className={styles.tag}>Estado</span>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  variant='outlined'
                />
              </Grid>
              <Grid item xs={2} style={{alignSelf: 'center'}}>
                <span className={styles.tag}>País</span>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  variant='outlined'
                />
              </Grid>
            </Grid>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <div id={styles.buttons_wrapper}>
                  <Button disabled variant='contained' color='primary'>Cancelar</Button>
                  <Button disabled variant='contained' color='primary'>Guardar cambios</Button>
                </div>
              </Grid>
            </Grid>
          </div>
        </main>
      </div>
    </>
  )
}