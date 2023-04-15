import React, { useState, useEffect } from 'react';
import InfoCard from './ui/info_card';
import SwivelHeader from './ui/swivel_header';
import styles from '@/styles/Home.module.css';
import swivelStyles from '@/styles/swivel_header.module.css';

const LandingCardKiosk = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const carPosition = Math.min(scrollPosition * -1.2, 400);
  const opacity = Math.max(1 - (carPosition / 400), 0);

  return (
    <div className={styles.card_kiosk_container}>
      <div
        className={styles.media_kiosk}
        style={{
          position: 'relative',
          height: '500px',
          marginTop: '100vh',
        }}
      >
        <div
          className={styles.cards}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'stretch',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            maxWidth: '1200px',
            margin: 'auto',
          }}
        >
          <InfoCard
            imageSrc="/info_card_photo_1.svg"
            title="Compra 100% en línea"
            description="Busca, compara y compra en un mismo sitio sin necesidad de salir de tu hogar."
          />
          <InfoCard
            imageSrc="/info_card_photo_2.svg"
            title="Cientos de diferentes opciones"
            description="Contamos con una amplia variedad de automóviles para que puedas encontrar el que mejor se adapte a tus necesidades."
          />
          <InfoCard
            imageSrc="/info_card_photo_3.svg"
            title="Agencias Verificadas"
            description="Todas las agencias de la plataforma pasan por un proceso de verificación para garantizar que tu compra sea segura."
          />
        </div>
        <div
          className={swivelStyles.header_container}
          style={{ opacity: opacity, transform: '(-30%, -30%)'}}
        >
          <SwivelHeader align="center">
            Por qué comprar en Swivel
          </SwivelHeader>
        </div>
      </div>
    </div>
  );
};

export default LandingCardKiosk;