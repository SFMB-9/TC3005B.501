import React from 'react'
import { useState } from 'react'
import { FormControl, FormLabel, InputLabel, TextField, Button, Link, Select, MenuItem } from '@mui/material'
import styles from './registro_autos_popup.module.css'
import FileUpload from "react-material-file-upload";
import CloseIcon from '@mui/icons-material/Close';

export default function RegistroAutosPopup(props) {
  const [marca, setMarca] = useState("")
  const [modelo, setModelo] = useState("")
  const [anio, setAnio] = useState("")
  const [precio, setPrecio] = useState("")
  const [color, setColor] = useState("")
  const [combustible, setCombustible] = useState("")
  const [motor, setMotor] = useState("")
  const [tipoVehiculo, setTipoVehiculo] = useState("")
  const [disponibilidad, setDisponibilidad] = useState("")
  const [marcaError, setMarcaError] = useState(false)
  const [modeloError, setModeloError] = useState(false)
  const [anioError, setAnioError] = useState(false)
  const [precioError, setPrecioError] = useState(false)
  const [colorError, setColorError] = useState(false)
  const [combustibleError, setCombustibleError] = useState(false)
  const [motorError, setMotorError] = useState(false)
  const [tipoVehiculoError, setTipoVehiculoError] = useState(false)
  const [disponibilidadError, setDisponibilidadError] = useState(false)
  const [files, setFiles] = useState(null)

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const handleSubmit = (event) => {
    event.preventDefault()

    setMarcaError(false);
    setModeloError(false);
    setAnioError(false);
    setPrecioError(false);
    setColorError(false);
    setCombustibleError(false);
    setMotorError(false);
    setTipoVehiculoError(false);
    setDisponibilidadError(false);

    if (marca === '') {
      setMarcaError(true);
    }
    if (modelo === '') {
      setModeloError(true);
    }
    if (anio === '') {
      setAnioError(true);
    }
    if (precio === '') {
      setPrecioError(true);
    }
    if (color === '') {
      setColorError(true);
    }
    if (combustible === '') {
      setCombustibleError(true);
    }
    if (motor === '') {
      setMotorError(true);
    }
    if (tipoVehiculo === '') {
      setTipoVehiculoError(true);
    }
    if (disponibilidad === '') {
      setDisponibilidadError(true);
    }

    if (marca && anio) {
      console.log(marca, anio)
    }

  }

  const handleChangeDisponibilidad = (event) => {
    setDisponibilidad(event.target.value);
  }

  const handleChangetipoVehiculo = (event) => {
    setTipoVehiculo(event.target.value);
  }

  const handleChangeCombustible = (event) => {
    setCombustible(event.target.value);
  }

  const handleChangeAnio = (event) => {
    setAnio(event.target.value);
  }


  return (props.trigger) ? (
    <div className={styles.popup}>
      <div className={styles.popupInner}>
        <Button className={styles.closeBtn} onClick={() => props.setTrigger(false)}>
          <CloseIcon />
        </Button>
        {props.children}

        <React.Fragment>
          <form autoComplete="off" onSubmit={handleSubmit} >
            <div className={styles.title}>
              <h3>Ingresa la informacion necesaria para registrar un auto</h3>
            </div>
            <div className={styles.formRow}>
              <TextField
                label="Marca"
                onChange={e => setMarca(e.target.value)}
                required
                variant="outlined"
                color="secondary"
                type="text"
                sx={{ mb: 3 }}
                value={marca}
                error={marcaError}
              />
              <TextField
                label="Modelo"
                onChange={e => setModelo(e.target.value)}
                required
                variant="outlined"
                color="secondary"
                type="text"
                value={modelo}
                error={modeloError}
                sx={{ mb: 3 }}
              />
              <FormControl sx={{ mb: 3, width: 221 }}>
                <InputLabel htmlFor="anio-select">Año</InputLabel>
                <Select
                  id="disponibilidad-select"
                  value={anio}
                  onChange={handleChangeAnio}
                  error={anioError}
                  displayEmpty
                  required
                >
                  <MenuItem value={2021}>2021</MenuItem>
                  <MenuItem value={2020}>2020</MenuItem>
                  <MenuItem value={2019}>2019</MenuItem>
                  <MenuItem value={2018}>2018</MenuItem>
                  <MenuItem value={2017}>2017</MenuItem>
                  <MenuItem value={2016}>2016</MenuItem>
                  <MenuItem value={2015}>2015</MenuItem>
                  <MenuItem value={2014}>2014</MenuItem>
                  <MenuItem value={2013}>2013</MenuItem>
                  <MenuItem value={2012}>2012</MenuItem>
                  <MenuItem value={2011}>2011</MenuItem>
                  <MenuItem value={2010}>2010</MenuItem>
                  <MenuItem value={2009}>2009</MenuItem>
                  <MenuItem value={2008}>2008</MenuItem>
                  <MenuItem value={2007}>2007</MenuItem>
                  <MenuItem value={2006}>2006</MenuItem>
                  <MenuItem value={2005}>2005</MenuItem>
                  <MenuItem value={2004}>2004</MenuItem>
                  <MenuItem value={2003}>2003</MenuItem>
                  <MenuItem value={2002}>2002</MenuItem>
                  <MenuItem value={2001}>2001</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className={styles.formRow}>
              <TextField
                label="Precio"
                onChange={e => setPrecio(e.target.value)}
                required
                variant="outlined"
                color="secondary"
                type="text"
                value={precio}
                error={precioError}
                sx={{ mb: 3 }}
              />
              <TextField
                label="Color"
                onChange={e => setColor(e.target.value)}
                required
                variant="outlined"
                color="secondary"
                type="text"
                value={color}
                error={colorError}
                sx={{ mb: 3 }}
              />
              <FormControl sx={{ mb: 3, width: 221 }}>
                <InputLabel htmlFor="combustible-select">Combustible</InputLabel>
                <Select
                  id="disponibilidad-select"
                  value={combustible}
                  onChange={handleChangeCombustible}
                  error={combustibleError}
                  displayEmpty
                  required
                >
                  <MenuItem value={1}>Gasolina</MenuItem>
                  <MenuItem value={2}>Diesel</MenuItem>
                  <MenuItem value={3}>Hibrido</MenuItem>
                  <MenuItem value={4}>Electrico</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className={styles.formRow}>
              <TextField
                label="Motor"
                onChange={e => setMotor(e.target.value)}
                required
                variant="outlined"
                color="secondary"
                type="text"
                value={motor}
                error={motorError}
                sx={{ mb: 3 }}
              />

              <FormControl sx={{ mb: 3, width: 221 }}>
                <InputLabel htmlFor="tipoVehiculo-select">TipoVehiculo</InputLabel>
                <Select
                  id="disponibilidad-select"
                  value={tipoVehiculo}
                  onChange={handleChangetipoVehiculo}
                  error={tipoVehiculoError}
                  displayEmpty
                  required
                >
                  <MenuItem value={1}>Hatchback</MenuItem>
                  <MenuItem value={2}>Sedan</MenuItem>
                  <MenuItem value={3}>SUV</MenuItem>
                  <MenuItem value={4}>Pickup</MenuItem>
                  <MenuItem value={5}>Camioneta</MenuItem>
                </Select>
              </FormControl>

              <FormControl sx={{ mb: 3, width: 221 }}>
                <InputLabel htmlFor="disponibilidad-select">Disponibilidad</InputLabel>
                <Select
                  id="disponibilidad-select"
                  value={disponibilidad}
                  onChange={handleChangeDisponibilidad}
                  error={disponibilidadError}
                  displayEmpty
                  required
                >
                  <MenuItem value={1}>Disponible</MenuItem>
                  <MenuItem value={2}>No Disponible</MenuItem>
                </Select>
              </FormControl>

            </div>
            <div className={styles.fileUpload}>
              <h5>Imagenes (Subir fotos 3d)</h5>
              <FileUpload
                value={files}
                onChange={setFiles}
              />
            </div>
            <div className={styles.registerButton}>
              <Button variant="contained" color="primary" type="submit">Registrar</Button>
            </div>

          </form>
        </React.Fragment>
      </div>
    </div>
  ) : "";
}
