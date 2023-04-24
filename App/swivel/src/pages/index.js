/*
Mateo Herrera Lavalle

Pagina principal (landing)
Incluye el hero, testimonials y process
*/
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
    </>
  )
}