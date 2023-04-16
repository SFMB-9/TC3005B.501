/*
  Autor: Mateo Herrera
  Fecha: 2023-04-15

  Este script representa el componente Step, el cual es utilizado para mostrar
  un paso del proceso de compra de la pagina.
*/

import React from 'react'
import { Typography } from '@mui/material'
import Image from 'next/image'

// Funcion que retorna el componente Step y acepta como parametros el numero 
// del paso, la imagen y el texto
const Step = (props) => {
  return (
    <div className='d-flex flex-column align-items-center'>
      <Typography
        sx={{
          color: 'white',
        }}
        variant='h5'
        fontFamily='Raleway'
        align='center'
      >
        {props.number}
      </Typography>

      <Image src={props.img} width={170} height={170} className='py-3'/>

      <Typography
        sx={{
          color: 'white',
        }}
        variant='h6'
        fontFamily='Raleway'
        align='center'
      >
        {props.text}
      </Typography>

    </div>
  )
}

export default Step