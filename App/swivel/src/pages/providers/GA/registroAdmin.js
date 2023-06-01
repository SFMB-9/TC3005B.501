"use client";

import axios from "axios";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import AuthComponent from "@/components/login/auth_component";


const registroAdmin = (req, res) => {

    const router = useRouter();

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [GA, setGA] = useState();

    const fetchData = async () => {
        const response = await axios.get("/api/managerProfile/managerP", {
            params: {
                id: router.query.id
            }
        });
        setGA(response.data.userData);
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post("/api/GA/GA-register", {
                tipo_usuario: 'AdminUser',
                nombre_agencia: GA.nombre,
                nombres: name,
                last_name: surname,
                email: email,
                password: password,
                numero_telefonico: phone,
            });
            
            routDocs(data);
        } 
        catch (error) {
            console.log(error.response.data);
        }
    };

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
                    placeholder="Telefono"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />
                <input
                    type="password"
                    className="form-control"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <input
                    type="password"
                    className="form-control"
                    placeholder="Confirmar contraseña"
                    required
                />

                <button onClick={secondSection}>
                    Siguiente
                </button>
            </div>
    )
}
