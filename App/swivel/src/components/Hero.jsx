/*
  Autor: Mateo Herrera
  Fecha: 2023-04-15

  Este componente representa el hero de la pagina, el cual contiene la imagen
  principal de la pagina y el texto que explica el servicio que ofrece la pagina.
*/

import React from 'react'
import { Box, Button, Link, Typography } from '@mui/material'
import Image from 'next/image'


// Funcion que retorna el hero de la pagina
const Hero = () => {
  return (

    <section className='hero'>
      <div className='container px-0 pt-5'>
        <div className='row justify-content-between'>
          <div className='col-lg-7'>
            <div className='text-lg-start text-center p-2'>
              <Typography
                sx={{
                  color: 'black',
                  fontWeight: 'bold',
                }}
                variant='h3'
                fontFamily='Lato'

              >
                Compra tu auto <br />
                completamente en linea
              </Typography>
            </div>
            <div className='text-lg-start text-center p-2'>
              <Typography
                sx={{
                  color: 'black',
                  width: { xs: '100%', lg: '50%' },
                  fontSize: '20px',
                }}
                fontFamily='Lato'
              >
                Encuentras cientos de autos y marcas diferentes en una misma
                plataforma y haz tu compra 100% en linea
              </Typography>
            </div>
            <div className='d-flex justify-content-lg-start justify-content-center align p-2'>
              <Link href='/compra' style={{ textDecoration: 'none' }}>
                <Button
                  variant='contained'
                  disableElevation
                  color='contrast'
                  size='large'
                >
                  <Typography
                    color='White '
                    fontFamily='Lato'
                    fontWeight='bolder'
                    fontSize={13}
                  >
                    Comprar un auto
                  </Typography>
                </Button>
              </Link>
            </div>
          </div>
          <div className='col-lg d-flex d-none d-lg-block'>
            <Image className='car_image' src='/orange_car.svg' alt='car' width={800} height={800}></Image>
          </div>
          <div className='col-lg d-flex '>
            <Box
              component="img"
              className='blob_hero'
              height={700}
              alt="blob hero section"
              src="/hero_section_blob.svg"
            />
          </div>
        </div>
      </div>

    </section>
  )
}

export default Hero