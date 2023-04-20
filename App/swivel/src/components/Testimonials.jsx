/*
  Autor: Mateo Herrera
  Fecha: 2023-04-15

  Este script representa el componente Testimonials, el cual es utilizado para mostrar
  las razones por las cuales comprar en SWIVEL.
*/
import { Typography } from '@mui/material'

import Card from './ui/card'

// Funcion que retorna el componente Testimonials
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
              img='/info_card_photo_1.png'
              title='Compra 100% en línea'
              text='Busca, compara y compra en un mismo sitio sin necesidad de salir de tu hogar.'
            />
          </div>
          <div className='d-lg-flex col-lg align-items-stretch'>
            <Card
              img='/info_card_photo_2.png'
              title='Cientos de diferentes opciones'
              text='Contamos con una amplia variedad de automoviles para que puedas encontrar el que mejor se adapte a tus necesidades.'
            />
          </div>
          <div className='d-lg-flex col-lg align-items-stretch'>
            <Card 
              img='/info_card_photo_3.png'
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