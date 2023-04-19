import { Inter } from 'next/font/google'

import Hero from '@/components/hero'
import Testimonials from '@/components/testimonials'
import Process from '@/components/process'
import LandingPageLayout from '@/components/landing_page_layout'

const inter = Inter({ subsets: ['latin'] });

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