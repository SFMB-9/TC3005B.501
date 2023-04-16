import Link from 'next/link'
import LoginForm from '@/components/formRegistro';
import styles from "./formRegistro.module.css";

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
                  src="/CardWelcome.svg"
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