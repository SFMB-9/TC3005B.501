import BuyerLayout from "@/components/buyer/layout";
import { Typography, Button } from "@mui/material"
import Process from "@/components/buyer/processSpecified";
import Link from "next/link"

import styles from "@/styles/about.module.css"
import ProcessSpecified from "@/components/buyer/processSpecified";

export default function About({
  backgroundImage = '/dummy_car_image3.png',
  title = 'Revolucionando la manera en la que compras tu auto.',
  message = 'Transparente, justo, rápido',
  titleSize = 50, 
  messageSize = 40,
  containerSize = 55,
  button = false
  }) { 
  return (
    <>
      <BuyerLayout>
        <div className={styles.about_container} style={{ height: containerSize + 'vh' }}>
          <div className={styles.about_background}>
            <img
              src={backgroundImage}
            />
          </div>
          <div className={styles.about_body}>
            <Typography className={styles.about_title} sx={{ fontSize: titleSize }}>
              {title}
            </Typography>
            <Typography className={styles.about_message} sx={{ fontSize: messageSize }}>
              {message}
            </Typography>     
          </div>
        </div>
        <div className={styles.container}>
          <div className={styles.section}>
            <img src='/lights.jpg'/>
            <div className={styles.content1}>
              <h1> ¿Quiénes somos? </h1>
              <span>
                Buscamos establecer un nuevo estándar para la experiencia de compra de automóviles al combinar tecnología de vanguardia y conocimiento de la industria para ofrecer un procedimiento digital y sin estrés al adquirir un automóvil. Nuestro objetivo es crear una comunidad confiable de compradores y vendedores donde las transacciones se puedan completar en línea, eliminando los problemas e inconvenientes asociados con las compras tradicionales de automóviles.
              </span>
            </div>
          </div>
          <div className={styles.section}>
            <div className={styles.content2}>
              <h1>¿Cuáles son nuestros valores?</h1>
              <span>
                <ol>
                  <li className="mb-4">
                    <b>Transparencia:</b> Estamos comprometidos en proporcionar información honesta y confiable para ayudar a nuestros consumidores a tomar decisiones acertadas.
                  </li>
                  <li className="mb-4">
                    <b>Responsabilidad:</b> Nos mantenemos a nosotros mismos y a los miembros de nuestro equipo en altos estándares de calidad y buscamos mejorar constantemente nuestros procesos.
                  </li>
                  <li className="mb-4">
                    <b>Adaptabilidad:</b> Estamos comprometidos en mantenernos al día con las tendencias de la industria y aprovechar la nueva tecnología para desarrollar nuestra plataforma y brindar un mejor servicio a nuestros clientes.
                  </li>
                </ol>
              </span>
            </div>
            <img src='/dummy_car_image1.png'/>
          </div>
        </div>
        <ProcessSpecified />
      </BuyerLayout>
    </>
  );
}