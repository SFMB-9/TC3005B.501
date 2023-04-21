/*
Mateo Herrera Lavalle

Pagina principal (landing)
Incluye el hero, testimonials y process
*/
import Image from 'next/image'
import Link from 'next/link'

import Hero from '@/components/hero'
import Testimonials from '@/components/testimonials'
import Process from '@/components/process'
import LandingPageLayout from '@/components/landing_page_layout'

export default function Home() {
  return (
    <>
      <LandingPageLayout>
        <Hero />
        <Testimonials />
        <Process />
      </LandingPageLayout>
      <Link href='/'>
        <Image src='/logo.png' alt='Swivel' width={200} height={200} />
      </Link>
      <Link href='/auth/registerUser'>Regístrate</Link>
      <Link href='/auth/login'>Inicia sesión</Link>
      <Link href='/automotive_group/settings'>Ajustes GA</Link>
      <Link href='/automotive_group/docSoli'>Documentos de grupo</Link>
    </>
  )
}