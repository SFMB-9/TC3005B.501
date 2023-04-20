/* 
Código para la pantalla de inicio de sesión del comprador. 
El código provee la interfaz en donde se encuentra el formulario de inicio de 
sesión y elementos visuales de dicha pantalla. 

Autor: Ana Paula Katsuda Zalce
*/
import LoginForm from '@/components/login_form';
import * as React from 'react';
import LoginForm from "@/components/login_form";

/* Función que retorna la pantalla de inicio de sesión del comprador. Incluye el 
formulario de inicio de sesión y elementos visuales. */
export default function LoginComprador () {
  return (
    <AuthComponent backImage='/login_background_1.svg' form={<LoginForm/>}
         cardImage='/card_welcome.svg' bodyText='Compra el auto de tus sueños en un solo click' titleText='Bienvenidx'
        />    );
  };


  
