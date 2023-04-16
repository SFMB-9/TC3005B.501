import React from 'react'
import { Typography } from '@mui/material'
import Card from './Card'

const Testimonials = () => {
  return (
    <section className='mb-5'>
      <div className="container">
        <div className='text-lg-start text-center p-2 pb-0'>
          <Typography
            sx={{
              color: 'black',
            }}
            fontSize={40}
            fontFamily='Raleway'
            className='pb-0'

          >
            ¿Por qué comprar en SWIVEL?
          </Typography>
        </div>
        <div className='text-lg-start text-center p-3 pt-0 row'>
          <div className='d-lg-flex col-lg align-items-stretch'>
            <Card 
              img='/card_img_1.svg'
              title='Compra 100% en línea'
              text='Busca, compara y compra en un mismo sitio sin necesidad de salir de tu hogar.'
            />
          </div>
          <div className='d-lg-flex col-lg align-items-stretch'>
            <Card
              img='/card_img_2.svg'
              title='Cientos de diferentes opciones'
              text='Contamos con una amplia variedad de automoviles para que puedas encontrar el que mejor se adapte a tus necesidades.'
            />
          </div>
          <div className='d-lg-flex col-lg align-items-stretch'>
            <Card 
              img='/card_img_3.svg'
              title='Agencias verificadas'
              text='Todas las agencias de la plataforma pasan por un proceso de verificación para asegurar que tu compra sea confiable.  '
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials