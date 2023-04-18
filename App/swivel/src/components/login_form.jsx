/*
Código utilizado para el formulario de inicio de sesión. 
Este componente se puede reutilizar en cualquier pantalla que requiera un 
formulario para ingresar al sistema.

Autor: Ana Paula Katsuda Zalce
*/
import { Form, Button } from "react-bootstrap";
import Link from 'next/link'

import "bootstrap/dist/css/bootstrap.min.css";
import styles from "@/styles/login_form.module.css";

/* Función que retorna el formulario de inicio de sesión con los campos de 
correo electrónico y contraseña, junto con los botones de ingreso o de 
ir a la pantalla de registro. */
export default function LoginForm (){
  return (
    <form className={styles.forms}>
      <img className={styles.logo} alt="" src="/swivel_logo.svg" />
      <b className={styles.iniciarSesion}>Iniciar Sesión</b>
      <Form.Group className={styles.campoForm}>
        <Form.Label className={styles.etiquetaTexto}>Correo electrónico</Form.Label>
        <Form.Control
          type="email"
          name="email"
          placeholder="Correo electrónico"
        />
      </Form.Group>
      <Form.Group className={styles.campoForm}>
        <Form.Label className={styles.etiquetaTexto}>Contraseña</Form.Label>
        <Form.Control
          type="password"
          name="password"
          placeholder="Contraseña"
        />
      </Form.Group>
      <Button
        className={styles.botonIngreso}
        name="loginButton"
      >
        Ingresar
      </Button>
      <Button
        className={styles.botonGoogle}
        name="loginButtonGoogle"
        variant="secondary"
      >
        <img className={styles.logoIcono} alt="" src="/google_logo.svg" />
        Inicia sesión con Google
      </Button>
      <i className={styles.noTienesCuenta}>
        {`¿No tienes cuenta? `}
        <span className={styles.regstrateAqu}><Link href='/'>Regístrate aquí</Link></span>
      </i>
    </form>
  );
};