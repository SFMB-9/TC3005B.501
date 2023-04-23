/* 
Código para el registro del usuario comprador. 
El código provee la interfaz en donde se encuentra el formulario de registro
 y elementos visuales de dicha pantalla. 

Autor: Karla Mondragón
*/
import * as React from 'react';

import AuthComponent from '@/components/auth_component';
import SignUpForm from '@/components/signup_form';

/* Función que retorna la pantalla de inicio de sesión del comprador. Incluye el 
formulario de inicio de sesión y elementos visuales. */
export default function SignUpBuyer () {
  return (
    <AuthComponent backImage='/login_background_1.svg' form={<SignUpForm/>}
         cardImage='/card_welcome.svg' bodyText='Compra el auto de tus sueños en un solo click' titleText='Bienvenidx'
        />    );
  };
