import Link from 'next/link'
import FormRegistro from '@/components/formRegistro';
import styles from "@/styles/formRegistro.module.css";

export default function registroComprador () {
    return (
      <div className={styles.login}>
        <div className={styles.card}>
          <div className={styles.cardlogin}>
            <FormRegistro/>
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
                  Compra el auto de tus sueños a un Click
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
};