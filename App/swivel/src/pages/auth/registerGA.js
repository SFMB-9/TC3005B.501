"use client";

import axios from "axios";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

/* Función que retorna el formulario de registro de GA con su dirección, junto con los botones de ingreso  */
export default function SignupGAData() {
    const router = useRouter();

    const grupo_id = router.query.grupo_id;

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [_id, setId] = useState("");

    const registerHandler = async () => {
        try {
        const result = await axios.post("/api/register", {
            nombres: name,
            apellidos: surname,
            email: email,
            password: password,
            numero_telefonico: phone,
            tipo_usuario: "ga_admin",
            grupo_id: grupo_id ? grupo_id : "",
        });
    } catch (error) {
        console.log(error);
    }
    }


    return (
        <div> 
                <h1>Registro de GA Admin</h1>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Nombre(s)"
                    value={name}
                    pattern="[a-zA-Z0-9À-ÿ\u00f1\u00d1\s]+"
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <input
                    type="text"
                    className="form-control"
                    placeholder="Apellido(s)"
                    value={surname}
                    pattern="[a-zA-Z0-9À-ÿ\u00f1\u00d1\s]+"
                    onChange={(e) => setSurname(e.target.value)}
                    required
                />

                <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="text"
                    className="form-control"
                    placeholder="Número telefónico"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />

                <input
                    type="password"
                    className="form-control"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => {
                        console.log(e.target.value)
                        setPassword(e.target.value)}}
                    required
                />

                <input
                    type="password"
                    className="form-control"
                    placeholder="Confirmar contraseña"
                    required
                />

                <button onClick={registerHandler}>
                    Siguiente
                </button>
        </div>
    );
}