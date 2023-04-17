import React from 'react'
import { Typography } from '@mui/material'
import Image from 'next/image'

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