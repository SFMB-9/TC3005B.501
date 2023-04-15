import { useState, useEffect } from 'react';
import { Navbar } from '@/components/navbar';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import SwivelHeader from '@/components/ui/swivel_header';
import SwivelParagraph from '@/components/ui/swivel_paragraph';
import InfoCard from '@/components/ui/info_card';
import Button from '@material-ui/core/Button';
import LandingCardKiosk from '@/components/landing_card_kiosk';
import { usePosition } from 'use-position';

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
    <div>
      <Navbar />
      <div className={styles.car_section}>
        <div
          className={styles.landing_blob}
          style={{
            backgroundImage: `url(/landing_orange_blob.svg)`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            backgroundPosition: 'top right',
            position: 'fixed',
            top: 0,
            right: 0,
            width: '66.67vw',
            height: '100vh',
          }}
        >
          <img
            src="/landing_orange_car.svg"
            alt=""
            style={{
              position: 'absolute',
              top: '50%',
              left: `calc(50% + ${carPosition}px)`,
              transform: 'translate(-50%, -50%)',
              width: '70%',
              height: 'auto',
              marginTop: '-10%',
            }}
          />
          {showHeader && (
            <div
              className={styles.swivel_header_container}
              style={{ opacity: opacity }}
            >
              <SwivelHeader align="left" className={styles.swivel_header}>
                Compra tu auto
                <br />
                completamente en línea
              </SwivelHeader>
              <SwivelParagraph align="left" className={styles.swivel_paragraph}>
                Encuentra cientos de opciones de autos y marcas diferentes en una misma plataforma y haz una decisión
                informada.
              </SwivelParagraph>
              <Button disabled href='/catalog' variant="contained" color="primary" style={{ marginTop: '10px' }}>
                Comprar auto
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className={styles.white_background} style={{opacity: Math.min(scrollPosition / 500, 1)}} />
      <LandingCardKiosk/>
    </div>
  )
}