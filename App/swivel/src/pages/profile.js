import React from "react";
import { useEffect, useState } from "react";

export default function profileInfo()
{
    const [profileInfo, setProfileInfo] = useState([])

    const getProfile = async () => {
        const response = await fetch('http://localhost:3000/api/profileInfo')
        const data = await response.json()
        setProfileInfo(response.data)
    }



    return(
        <>
        <div id="Navbar">
        </div>
        <div id="Sidebar">
        </div>
        <div id="ProfileInfo">
            <h1>Datos personales</h1>
            <form name="Datos personales" method="POST">
                <label>
                    Nombre(s)
                    <input type="text"></input>
                </label>
                <label>
                    Apellido Paterno
                    <input type="text"></input>
                </label>
                <label>
                    Apellido Materno
                    <input type="text"></input>
                </label>
                <label>
                    Correo electrónico
                    <input type="text"></input>
                </label>
                <label>
                    Teléfono
                    <input type="text"></input>
                </label>
                <button type="submit">Enviar</button>
            </form>
        </div>
        <div>
            <form name="Direccion" method="POST">
                <label>
                    Calle
                    <input type="text"></input>
                </label>
                <label>
                    Número
                    <input type="text"></input>
                </label>
                <label>
                    Código Postal
                    <input type="text"></input>
                </label>
                <label>
                    Colonia
                    <input type="text"></input>
                </label>
                <label>
                    Ciudad
                    <input type="text"></input>
                </label>
                <label>
                    Estado
                    <input type="text"></input>
                </label>
                <label>
                    País
                    <input type="text"></input>
                </label>
                <button type="submit">Enviar</button>
            </form>
        </div>
        </>
    );
}