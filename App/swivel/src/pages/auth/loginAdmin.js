import Link from 'next/link'
import LoginForm from '@/components/loginForm';
import styles from "./LoginAdmin.module.css";
import Footer from '@/components/footer';

export default function loginAdmin () {
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
                src="/CardWelcomeOrange.svg"
              />
              <div className={styles.welcometext}>
                <b className={styles.bienvenidx}>Bienvenidx</b>
                <div className={styles.iniciaSesinY}>
                  Inicia sesión para acceder al portal de administracion.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  };


  
