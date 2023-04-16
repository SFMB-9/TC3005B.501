import Link from 'next/link'
import FormRegistro from '@/components/formRegistro';
import styles from "@/styles/registroComprador.module.css";

export default function registroComprador () {
    return (
      <div className={styles.registro}>
        <div className={styles.card}>
          <div className={styles.cardRegistro}>
            <FormRegistro/>
          </div>
          <div className={styles.cardwelcome}>
            <div className={styles.crearCuenta}>
                Compra el auto de <br></br>
                tus sueños a un <br></br>
                click
            </div>
          </div>
        </div>
      </div>
    );
};