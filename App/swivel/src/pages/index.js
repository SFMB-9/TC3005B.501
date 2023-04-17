import Footer from '@/components/footer'
import Hero from '@/components/hero'
import { Inter } from 'next/font/google'
import Navbar from '@/components/navbar'
import Process from '@/components/process'
import Testimonials from '@/components/testimonials'
import { useState, useEffect } from 'react'

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
    </>
  )
}