/* 
Código para la pantalla de inicio de sesión del proveedor. 
El código provee la interfaz en donde se encuentra el formulario de inicio de 
sesión y elementos visuales de dicha pantalla. 

Autor: Ana Paula Katsuda Zalce
*/

import AuthComponent from "@/components/auth_component";
import * as React from 'react';
import LoginForm from "@/components/login_form";

// Función que devuelve la pantalla de inicio de sesión del proveedor.
export default function LoginProveedor() {
    return (
        <div>
        <AuthComponent backImage='/login_background_1.svg' form={<LoginForm/>}
         cardImage='/card_welcome.svg' bodyText='Vender un auto nunca fue tan fácil' titleText='Bienvenidx'
        />
        </div>
    );
}
