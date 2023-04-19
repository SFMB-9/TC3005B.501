/*
  Autor: Mateo Herrera
  Fecha: 2023-04-15

  Este script representa el componente Process, el cual es utilizado para mostrar
  el proceso de compra de la pagina.
*/
import React from 'react'
import { Typography, Button } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'

import Step from '@/components/ui/process_step'

// Funcion que retorna el componente Process
const Process = () => {
  return (
    <section>
      <div style={{
        position: 'relative',
        width: '100%',
      }}>
        <Image
          src="/process_background_image.svg"
          quality={100}
          fill={true}
          style={{objectFit: 'cover', zIndex: -1,}}
        />

        <div className='container p-5'>
          <div>
            <Typography
              sx={{
                color: 'white',
              }}
              fontSize={40}
              fontFamily='Raleway'
              align='center'
            >
              Proceso de compra
            </Typography>
          </div>

          <div className='row'>
            <div className='col-lg col-md-6 mt-3'>
              <Step
                number='1'
                img='/process_step_1.svg'
                text='Busca tu 
                auto ideal'
              />
            </div>

            <div className='col-lg col-md-6 mt-3'>
              <Step
                number='2'
                img='/process_step_2.svg'
                text='Solicita una 
                prueba de manejo'
              />
            </div>

            <div className='col-lg col-md-6 mt-3'>
              <Step
                number='3'
                img='/process_step_3.svg'
                text='Encuentra el mejor 
                plan de pagos para tí'
              />
            </div>

            <div className='col-lg col-md-6 mt-3'>
              <Step
                number='4'
                img='/process_step_4.svg'
                text='Recibe el auto 
                de tus sueños'
              />
            </div>
          </div>
          
          <div className='d-flex justify-content-center mt-5'>
            <Link href='/catalog' style={{ textDecoration: 'none' }}>
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

      </div>
    </section>
  )
}

export default Process