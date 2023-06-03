"use client";

import axios from "axios";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import AuthComponent from "@/components/login/auth_component";


const registroAdmin = () => {

    const router = useRouter();

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [GA, setGA] = useState();

    useEffect(() => {
        const fetchGA = async () => {
            const response = await axios.get("/api/managerProfile/managerP", {
                params: {
                    id: "6477e6e3ae27e558e56c3c18"
                }
            });
            setGA(response.data.userData);
        };

        fetchGA();
    }, []);

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(GA);
        try {
            const response = await axios.post("/api/GA/Admin-register", {
                tipo_usuario: 'GA',
                nombre_agencia: GA.nombres,
                nombres: name,
                last_name: surname,
                email: email,
                password: password,
                numero_telefonico: phone,
                grupo_automotriz_id: GA._id
            });
            console.log(response.data);
        } catch (error) {
            console.log(error);
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
            <button type="submit" className="btn btn-primary" onClick={submitHandler}>
                Registrar
            </button>    
            </div>
            
    )
}

export default registroAdmin;
