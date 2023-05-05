"use client";

import axios from "axios";
import React, { useState } from "react";

export default function RegisterUser() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [street, setStreet] = useState("");
    const [ext_number, setExtNumber] = useState("");
    const [int_number, setIntNumber] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [postal_code, setPostalCode] = useState("");

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post("/api/registro/registro-grupo-automotriz", {
                role: "GA",
                name,
                email,
                password,
                street,
                ext_number,
                int_number,
                city,
                state,
                country,
                postal_code,
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
                    <label htmlFor="street_field">Calle</label>
                    <input
                        type="text"
                        id="street_field"
                        className="form-control"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="ext_number_field">Número exterior</label>
                    <input
                        type="text"
                        id="ext_number_field"
                        className="form-control"
                        value={ext_number}
                        onChange={(e) => setExtNumber(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="int_number_field">Número interior</label>
                    <input
                        type="text"
                        id="int_number_field"
                        className="form-control"
                        value={int_number}
                        onChange={(e) => setIntNumber(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="city_field">Ciudad</label>
                    <input
                        type="text"
                        id="city_field"
                        className="form-control"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="state_field">Estado</label>
                    <input
                        type="text"
                        id="state_field"
                        className="form-control"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="country_field">País</label>
                    <input
                        type="text"
                        id="country_field"
                        className="form-control"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="postal_code_field">Código postal</label>
                    <input
                        type="text"
                        id="postal_code_field"
                        className="form-control"
                        value={postal_code}
                        onChange={(e) => setPostalCode(e.target.value)}
                        required
                    />
                </div>

                <button type="submit">Register</button>

            </form>


        </>
    )
}