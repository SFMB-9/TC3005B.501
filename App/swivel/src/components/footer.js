import React from 'react'
import styles from "./Footer.module.css";
import Link from 'next/link'

export default function Footer() {
  return (
    <div className= {styles.mainFooter}>
        <div className= "container">
            <div className= {styles.rowFooter}>
                {/* Column1 */}
                <div className= "col">
                    <img className={styles.logo} alt="" src="/swivelLogo.svg" />
                </div>
                {/* Column2 */}
                <div className="col">
                    <ul className={styles.unstyledList}>
                        <li className={styles.listElement}>Compra un Auto</li>
                        <li className={styles.listElement}>Registra tu agencia</li>
                        <li className={styles.listElement}>Contacto</li>
                    </ul>
                </div>
                {/* Column3 */}
                <div className="col">
                    <ul className={styles.unstyledList}>
                        <li className={styles.listElement}>Sobre nosotros</li>
                        <li className={styles.listElement}>Testimonios</li>
                        <li className={styles.listElement}>Preguntas frecuentes</li>
                    </ul>
                </div>

            </div>  
            <hr/>
            <div className= "row"> 
                <p className= {styles.colSm}>
                    &copy;{new Date().getFullYear()} SWIVEL 
                    | 
                    <Link href="/privacy"> Todos los derechos reservados </Link>
                    |
                    <Link href="/terms"> Terminos de servicio </Link>
                    |
                    <Link href="/cookies"> Politica de privacidad </Link>

                </p>
            </div>
        </div>
    </div>
  )
}