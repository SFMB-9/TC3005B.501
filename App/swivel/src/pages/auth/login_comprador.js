/* 
Código para la pantalla de inicio de sesión del comprador. 
El código provee la interfaz en donde se encuentra el formulario de inicio de 
sesión y elementos visuales de dicha pantalla. 

Autor: Ana Paula Katsuda Zalce
*/

import Link from 'next/link'
import LoginForm from '@/components/login_form';
import styles from "./login_comprador.module.css";

/* Función que retorna la pantalla de inicio de sesión del comprador. Incluye el 
formulario de inicio de sesión y elementos visuales. */
export default function LoginBuyer () {
  return (
    <div className={styles.login}>
      <div className={styles.card}>
        <div className={styles.cardlogin}>
          <LoginForm />
        </div>
        <div className={styles.cardwelcome}>
          <div className={styles.cardwelcomebackground}>
            <div className={styles.cardwelcome1}>
              <img
                className={styles.clipPathGroup}
                alt=""
                src="/card_welcome.svg"
              />
              <div className={styles.welcometext}>
                <b className={styles.bienvenidx}>Bienvenidx</b>
                <div className={styles.iniciaSesinY}>
                  Inicia sesión y encuentra el auto de tus sueños en un click.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  };


  
