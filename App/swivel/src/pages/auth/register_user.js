"use client";

import axios from "axios";
import React, { useState } from "react";

export default function RegisterUser() {

    const [name, setName] = useState("");
    const [last_name, setLastName] = useState("");
    const [cellphone, setCellphone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post("/api/registro/registro-usuario", {
                role: "user",
                name,
                last_name,
                email,
                password,
                cellphone,
            });

            console.log(data);
        }
        catch (error) {
            console.log(error.response.data);
        }
    };


    return (
        <>
            <form onSubmit={submitHandler}>
                <h1>Register</h1>

                <div>
                    <label htmlFor="name_field">Nombres</label>
                    <input
                        type="text"
                        id="name_field"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                
                <div>
                    <label htmlFor="last_name_field">Apellidos</label>
                    <input
                        type="text"
                        id="last_name_field"
                        className="form-control"
                        value={last_name}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="email_field">Correo</label>
                    <input
                        type="email"
                        id="email_field"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="password_field">Contraseña</label>
                    <input
                        type="password"
                        id="password_field"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                
                <div>
                    <label htmlFor="cellphone_field">Número telefónico</label>
                    <input
                        type="text"
                        id="cellphone_field"
                        className="form-control"
                        value={cellphone}
                        onChange={(e) => setCellphone(e.target.value)}
                        required
                    />
                </div>

                <button type="submit">Register</button>

            </form>


        </>
    )
}