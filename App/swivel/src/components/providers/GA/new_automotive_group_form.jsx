/*
Salvador Federico Milanes Braniff
18-04-2023

NAGForm es un formulario de configuración 
inicial del grupo automotriz.
Es reactivo y se ajusta a la pantalla de forma dinámica.
*/

import { Grid, TextField, Button } from "@mui/material";

import styles from "@/styles/new_automotive_group_form.module.css";

export default function NAGForm() {
  return (
    <div className={styles.container}>
      <Grid
        container
        spacing={4}
        style={{ overflow: "hidden", maxWidth: "800px" }}
      >
        <Grid item xs={12}>
          <div className={styles.field}>
            <div className={styles.edit}>
              <b className={styles.lg}>Nombre</b>
              <img src="/edit_icon.svg" className={styles.pencil} />
            </div>
            <span className={styles.sm}>Grupo Automotriz</span>
          </div>
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <div className={styles.field}>
            <div className={styles.edit}>
              <b>Correo electrónico</b>
              <img src="/edit_icon.svg" className={styles.pencil} />
            </div>
            <span className={styles.sm}>grupo.a@demo.com</span>
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <div className={styles.field}>
            <div className={styles.edit}>
              <b>Teléfono</b>
              <img src="/edit_icon.svg" className={styles.pencil} />
            </div>
            <span className={styles.sm}>+52 55 1234 5678</span>
          </div>
        </Grid>
      </Grid>
      <Grid container spacing={2} id={styles.address}>
        <Grid item xs={12} style={{ alignSelf: "end" }}>
          <b>Dirección</b>
        </Grid>
        <Grid item xs={12} sm={2} style={{ alignSelf: "center" }}>
          <span className={styles.tag}>Calle</span>
        </Grid>
        <Grid item xs={12} sm={10}>
          <TextField
            small
            fullWidth
            variant="outlined"
            autoComplete="Avenida Carlos Lazo"
          />
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={2} style={{ alignSelf: "center" }}>
          <span className={styles.tag}>Número</span>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField fullWidth variant="outlined" />
        </Grid>
        <Grid item xs={12} sm={2} style={{ alignSelf: "center" }}>
          <span className={styles.tag}>Código postal</span>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField fullWidth variant="outlined" />
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={2} style={{ alignSelf: "center" }}>
          <span className={styles.tag}>Colonia</span>
        </Grid>
        <Grid item xs={12} sm={10}>
          <TextField fullWidth variant="outlined" />
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={2} style={{ alignSelf: "center" }}>
          <span className={styles.tag}>Municipio/ Delegación</span>
        </Grid>
        <Grid item xs={12} sm={10}>
          <TextField fullWidth variant="outlined" />
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        <Grid item xs={2} style={{ alignSelf: "center" }}>
          <span className={styles.tag}>Estado</span>
        </Grid>
        <Grid item xs={4}>
          <TextField fullWidth variant="outlined" />
        </Grid>
        <Grid item xs={2} style={{ alignSelf: "center" }}>
          <span className={styles.tag}>País</span>
        </Grid>
        <Grid item xs={4}>
          <TextField fullWidth variant="outlined" />
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <div id={styles.buttons_wrapper}>
            <Button disabled variant="contained" color="primary">
              Cancelar
            </Button>
            <Button disabled variant="contained" color="primary">
              Guardar cambios
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
