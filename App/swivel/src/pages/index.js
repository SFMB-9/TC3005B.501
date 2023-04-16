import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Testimonials from '@/components/Testimonials'
import Process from '@/components/Process'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Navbar /> 
      <Hero />
      <Testimonials />
      <Process />
      <Footer />
    </>
  )
}
