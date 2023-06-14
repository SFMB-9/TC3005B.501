/*
  Autor: Mateo Herrera
  Fecha: 2023-04-15

  Este script representa el componente Testimonials, el cual es utilizado para mostrar
  las razones por las cuales comprar en SWIVEL.
*/
import React from "react";
import "react-multi-carousel/lib/styles.css";
import CustomCard from "@/components/general/custom_card";
import styles from '@/styles/testimonials.module.css'

export default function Testimonials() {
  return (
    <div className={styles.testimonials_container}>
      <h1 className={styles.header}>Reseñas</h1>
      <span>Enterate de lo mas nuevo en SWIVEL y en la industria automotriz</span>
      <div className={styles.container}>
        <div className={styles.item}>
          <CustomCard
            fiftyFifty
            imageSource='/buyer/review1.jpg'
            header='Compra tu auto en línea'
            text='Busca, compara y compra en un mismo sitio sin necesidad de salir de tu hogar'
          />
        </div>
        <div className={styles.item}>
          <CustomCard
            fiftyFifty
            imageSource='/buyer/review2.jpg'
            header='¿Ya conoces SWIVEL?'
            text='SWIVEL es la nueva plataforma que busca revolucionar la manera en la que encuentras y compras el auto de tus sueños'
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