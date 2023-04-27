/*
Karla Mondragón Rosas
16-04-2023
*/
import { Form, Button } from "react-bootstrap";
import Link from "next/link";

import "bootstrap/dist/css/bootstrap.min.css";
import styles from "@/styles/signup_form.module.css";

export default function LoginForm() {
  return (
    <form className={styles.forms}>
      <img className={styles.logo} alt="" src="/swivelLogo.svg" />
      <b className={styles.iniciarSesin}>Iniciar Sesión</b>
      <Form.Group className={styles.campoForm}>
        <Form.Label className={styles.labelText}>Correo electrónico</Form.Label>
        <Form.Control
          type="email"
          name="email"
          placeholder="Correo electrónico"
        />
      </Form.Group>
      <Form.Group className={styles.campoForm}>
        <Form.Label className={styles.labelText}>Contraseña</Form.Label>
        <Form.Control
          type="password"
          name="password"
          placeholder="Contraseña"
        />
      </Form.Group>
      <Button className={styles.botningreso} name="loginButton">
        Ingresar
      </Button>
      <Button
        className={styles.botngoogle}
        name="loginButtonGoogle"
        variant="secondary"
      >
        <img className={styles.logoIcon} alt="" src="/googleLogo.svg" />
        Inicia sesión con Google
      </Button>
      <i className={styles.noTienesCuentaContainer}>
        {`¿No tienes cuenta? `}
        <span className={styles.regstrateAqu}>
          <Link href="/">Regístrate aquí</Link>
        </span>
      </i>
    </form>
  );
}
