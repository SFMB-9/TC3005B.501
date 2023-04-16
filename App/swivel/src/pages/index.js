import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'
import Navbar from '@/components/Navbar.jsx'
import Hero from '@/components/Hero'
import Testimonials from '@/components/Testimonials'
import Process from '@/components/Process'
import Footer from '@/components/Footer'
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