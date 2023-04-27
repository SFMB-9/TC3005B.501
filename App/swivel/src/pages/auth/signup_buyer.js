/* 
Código para el registro del usuario comprador. 
El código provee la interfaz en donde se encuentra el formulario de registro
 y elementos visuales de dicha pantalla. 

Autor: Karla Mondragón
*/
import * as React from "react";

import AuthComponent from "@/components/login/auth_component";
import SignUpForm from "@/components/login/signup_formBuyer";

/* Función que retorna la pantalla de inicio de sesión del comprador. Incluye el 
formulario de inicio de sesión y elementos visuales. */
export default function SignupBuyer() {
  return (
    <AuthComponent
      backImage=""
      backColor="black"
      form={<SignUpForm />}
      cardImage="/card_welcome_register.png"
      bodyText="Regístrate y empieza a comprar el auto de tus sueños"
      titleText="Bienvenidx"
      textColor="white"
    />
  );
}
