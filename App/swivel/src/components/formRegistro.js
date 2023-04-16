import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button } from "react-bootstrap";
import Link from 'next/link'
import styles from "@/styles/formRegistro.module.css";

export default function FormRegistro (){
    return (
      <div className={styles.formulario}>
        <form className={styles.forms}>
          <img className={styles.logo} alt="" src="/swivelLogo.svg" />
          <b className={styles.crearCuenta}>Crear Cuenta</b>
          <div className={styles.datosPersonales}>
            <Form.Control placeholder="Nombre(s)"/>
            <Form.Control placeholder="Apellidos"/>
          </div>
          <Form.Control
              type="email"
              name="email"
              placeholder="Correo electrónico"
          />
          <Form.Control
            type="password"
            name="password"
            placeholder="Contraseña"
          />
          <Form.Control
            type="password"
            name="password"
            placeholder="Confirmar Contraseña"
          />

        <Button
          className={styles.botnregistro}
          name="registerButton">
          Crear Cuenta
        </Button>

        <Button
          className={styles.botngoogle}
          name="loginButtonGoogle"
          variant="secondary">
          <img className={styles.logoIcon} alt="" src="/googleLogo.svg" />
          Crear cuenta con Google
        </Button>
        
        <i className={styles.noTienesCuentaContainer}>
          {`¿Representas a un Grupo Automotriz? `}
          <span className={styles.regstrateAqu}><Link href='/'>Regístrate aquí</Link></span>
        </i>
     </form>
  </div>
  );
};