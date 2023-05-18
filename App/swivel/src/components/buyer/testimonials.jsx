/*
  Autor: Mateo Herrera
  Fecha: 2023-04-15

  Este script representa el componente Testimonials, el cual es utilizado para mostrar
  las razones por las cuales comprar en SWIVEL.
*/
import React from "react";
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css";
import CustomCard from "@/components/general/custom_card";
import styles from '@/styles/testimonials.module.css'

export default function Testimonials() {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      partialVisibilityGutter: 80, // Adjust the value to control the gap between cards
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      partialVisibilityGutter: 80, // Adjust the value to control the gap between cards
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      partialVisibilityGutter: 80, // Adjust the value to control the gap between cards
    },
  };

  // const customTransition = {
  //   transform: 'translateX(calc(-10% - 50px))', // Adjust the value to increase the horizontal gap between cards
  // };

  return (
    <div className={styles.testimonials_container}>
      <h1 className={styles.header}>Reseñas</h1>
      <span>Enterate de lo mas nuevo en SWIVEL y en la industria automotriz</span>
      <div className={styles.container}>
        <div className={styles.item}>
          <CustomCard
            fiftyFifty
            imageSource='/buyer/review1.jpg'
            header='Compra 100% en línea'
            text='Busca, compara y compra en un mismo sitio sin necesidad de salir de tu hogar'
          />
        </div>
        <div className={styles.item}>
          <CustomCard
            fiftyFifty
            imageSource='/buyer/review2.jpg'
            header='Conoce el nuevo Mercedes-Benz'
            text='El nuevo coche híbrido de Mercedes-Benz te impresionará.'
          />
        </div>
        <div className={styles.item}>
          <CustomCard
            fiftyFifty
            imageSource='/buyer/review3.jpg'
            header='Agencias verificadas'
            text='Todas las agencias en SWIVEL están verificadas.'
          />
        </div>
      </div>
    </div>
  );
};