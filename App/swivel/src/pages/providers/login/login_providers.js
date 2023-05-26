/* 
Código para la pantalla de inicio de sesión del proveedor. 
El código provee la interfaz en donde se encuentra el formulario de inicio de 
sesión y elementos visuales de dicha pantalla. 

Autor: Ana Paula Katsuda Zalce
*/
import LoginForm from '@/components/login/login_form';
import * as React from 'react';
import AuthComponent from '@/components/login/auth_component';

// Función que devuelve la pantalla de inicio de sesión del proveedor.
export default function LoginProveedor() {
    return (
        <AuthComponent 
            backImage='' 
            form={<LoginForm/>}
            cardImage='/welcome_proveedores.svg' 
            backColor= '#111439' 
            bodyText='Vender un auto nunca fue tan fácil.' 
            titleText='Centro de Ventas' 
            textColor='white'
        />
    );        
}
