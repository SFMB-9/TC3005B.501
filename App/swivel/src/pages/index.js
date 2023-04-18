import Footer from '@/components/footer'
import Hero from '@/components/hero'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'
import Navbar from '@/components/navbar.jsx'
import Testimonials from '@/components/Testimonials'
import Process from '@/components/Process'
import { useState, useEffect } from 'react'
import Image from 'next/image'

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showHeader, setShowHeader] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
      setShowHeader(position < window.innerHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const carPosition = Math.min(scrollPosition * -1.2, 400);
  const opacity = Math.max(1 - (carPosition / 400), 0);

  return (
    <>
      <Navbar /> 
      <Hero />
      <Testimonials />
      <Process />
      <Footer />
      <Link href='/'>
        <Image src='/logo.png' alt='Swivel' width={200} height={200} />
      </Link>
      <Link href='/auth/register'>Regístrate</Link>
      <Link href='/auth/login'>Inicia sesión</Link>
      <Link href='/automotive_group/settings'>Ajustes GA</Link>
      <Link href='/registroComprador'>Regístrate</Link>
    </>
  )
}