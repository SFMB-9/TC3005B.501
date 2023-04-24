"use client";

import axios from "axios";
import React, { useState } from "react";

export default function RegisterUser() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { encryptRole } = require('../../utils/crypto');

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post("/api/registro/registro-usuario", {
                name,
                email,
                password,
                role: "user"
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
                    <label htmlFor="name_field">Name</label>
                    <input
                        type="text"
                        id="name_field"
                        className="form-control"
                        value={name}
                        pattern="[a-zA-Z]+"
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="email_field">Email address</label>
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
                    <label htmlFor="password_field">Password</label>
                    <input
                        type="password"
                        id="password_field"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit">Register</button>

            </form>


        </>
    )
}