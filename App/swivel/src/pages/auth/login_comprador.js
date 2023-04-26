/* 
Autor: Ana Paula Katsuda Zalce

Código para la pantalla de inicio de sesión del comprador. 
El código provee la interfaz en donde se encuentra el formulario de inicio de 
sesión y elementos visuales de dicha pantalla. 
*/
import * as React from 'react';

import LoginForm from '@/components/login/login_form';
import AuthComponent from '@/components/login/auth_component';

/* Función que retorna la pantalla de inicio de sesión del comprador. Incluye el 
formulario de inicio de sesión y elementos visuales. */
export default function LoginBuyer() {
  return (
    <AuthComponent backImage='/login_background_1.svg' form={<LoginForm/>}
         cardImage='/card_welcome.svg' backColor= '#111439' bodyText='Compra el auto de tus sueños en un solo click' titleText='Bienvenidx' textColor='white'
        />    );
  };


  
