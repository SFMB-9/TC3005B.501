/* 
Código para el registro del usuario Grupo Automotriz 
El código provee la interfaz en donde se encuentra el formulario de registro
 y elementos visuales de dicha pantalla. 

Autor: Karla Mondragón
*/
import * as React from 'react';

import AuthComponent from '@/components/auth_component';
import SignUpForm from '@/components/signup_formGA';

/* Función que retorna la pantalla de inicio de sesión del comprador. Incluye el 
formulario de inicio de sesión y elementos visuales. */
export default function SignUpBuyer () {
  return (
    <AuthComponent backImage='/background_providers.svg' form={<SignUpForm/>}
        cardImage='/blob_providers.svg' 
        bodyText='Vender Autos nunca había sido tan fácil' 
        titleText='/swivel_logo.svg'
        />    
    );
  };
