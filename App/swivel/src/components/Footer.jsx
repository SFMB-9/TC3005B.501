import Image from 'next/image'
import React from 'react'
import Link from 'next/link';
import { Typography } from '@mui/material';

const pages1 = [
  {name: 'Compra un auto', link: '/comprar'},
  {name: 'Registra tu agencia', link: '/registrar-agencia'}, 
  {name: 'Contacto', link: '/contacto'},    
];

const pages2 = [
  {name: 'Sobre nosotros', link: '/sobre-nosotros'},
  {name: 'Testimonio', link: '/testimonio'}, 
  {name: 'FAQ', link: '/faq'},  
];

const Footer = () => {
  return (
    <section style={{backgroundColor: '#111439'}} className='px-0 mx-0 py-2'>
      <div className='container px-0'>
        <div className='row align-items-center'>
          <div className='col-5 d-none d-md-block'>
            <Image src='/footer_swivel_logo.svg' width={100} height={100} />
          </div>
          <div className='col'>
            <div className='d-flex flex-column align-items-center align-items-md-start'>
              {pages1.map((page) => (
                <Link href={page.link} style={{ textDecoration: 'none' }} className='p-1'>
                    <Typography
                      color='white' 
                      fontFamily='Lato'
                      fontSize={13}
                    >
                      {page.name}
                    </Typography>
                </Link>
              ))}
            </div>
          </div>

          <div className='col'>
            <div className='d-flex flex-column align-items-center align-items-md-start'>
              {pages2.map((page) => (
                <Link href={page.link} style={{ textDecoration: 'none' }} className='p-1'>
                    <Typography
                      color='white' 
                      fontFamily='Lato'
                      fontSize={13}
                    >
                      {page.name}
                    </Typography>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Footer