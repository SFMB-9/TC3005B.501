import React from 'react'
import { useState } from 'react'
import { FormControl, FormLabel, InputLabel, NativeSelect, TextField, Button, Link } from '@mui/material'
import styles from './registro_autos_popup.module.css'
import { FileUpload } from '@mui/icons-material'

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
  const [anioError, setModeloError] = useState(false)
  const [modeloError, setAnioError] = useState(false)
  const [precioError, setPrecioError] = useState(false)
  const [colorError, setColorError] = useState(false)
  const [combustibleError, setCombustibleError] = useState(false)
  const [motorError, setMotorError] = useState(false)
  const [tipoVehiculoError, setTipoVehiculoError] = useState(false)
  const [disponibilidadError, setDisponibilidadError] = useState(false)
  const [files, setFiles] = useState([]);

  const colores = [
    "Rojo",
    "Azul",
    "Verde",
    "Blanco"


  ]


  const disponibilidades = [
    "Disponible",
    "No disponible"
  ]

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

  return (props.trigger) ? (
    <div className = {styles.popup}>
      <div className= {styles.popupInner}>
        <button className= {styles.closeBtn} onClick = {() => props.setTrigger(false)}> close </button>
        {props.children}  

        <React.Fragment> 
        <form autoComplete="off" onSubmit={handleSubmit} >
            <div className={styles.title}>
            <h3>Ingresa la informacion necesaria para registrar un auto</h3>
            </div>
              <div className= {styles.formRow}>
                <TextField 
                    label="Marca"
                    onChange={e => setMarca(e.target.value)}
                    required
                    variant="outlined"
                    color="secondary"
                    type="text"
                    sx={{mb: 3}}
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
                    sx={{mb: 3}}
                 />
                 <TextField 
                    label="Año"
                    onChange={e => setAnio(e.target.value)}
                    required
                    variant="outlined"
                    color="secondary"
                    type="text"
                    value={anio}
                    error={anioError}
                    sx={{mb: 3}}
                 />
              </div>
              <div className= {styles.formRow}>
                <TextField
                    label="Precio"
                    onChange={e => setPrecio(e.target.value)}
                    required
                    variant="outlined"
                    color="secondary"
                    type="text"
                    value={precio}
                    error={precioError}
                    sx={{mb: 3}}
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
                    sx={{mb: 3}}
                />
                <TextField
                    label="Combustible"
                    onChange={e => setCombustible(e.target.value)}
                    required
                    variant="outlined"
                    color="secondary"
                    type="text"
                    value={combustible}
                    error={combustibleError}
                    sx={{mb: 3}}
                />
              </div>
              <div className= {styles.formRow}>
                <TextField
                    label="Motor"
                    onChange={e => setMotor(e.target.value)}
                    required
                    variant="outlined"
                    color="secondary"
                    type="text"
                    value={motor}
                    error={motorError}
                    sx={{mb: 3}}
                />
                <TextField
                    label="Tipo de vehiculo"
                    onChange={e => setTipoVehiculo(e.target.value)}
                    required
                    variant="outlined"
                    color="secondary"
                    type="text"
                    value={tipoVehiculo}
                    error={tipoVehiculoError}
                    sx={{mb: 3}}
                />
                <InputLabel
                    label="Disponibilidad"
                    onChange={e => setDisponibilidad(e.target.value)}
                    required
                    variant="outlined"
                />
                <NativeSelect>
                  <option value="Disponible">Disponible</option>
                  <option value="No disponible">Agotado</option>

                </NativeSelect>
                
              </div>
              <div className = {styles.registerButton}>
              <FileUpload value={files} onChange={setFiles} />
              </div>
              <div className={styles.registerButton}>
                <Button variant="outlined" color="secondary" type="submit">Registrar</Button>
              </div>
             
        </form>
        <small>Need an account? <Link to="/">Register here</Link></small>
        </React.Fragment>
      </div>
    </div>
  ) : "";
}
