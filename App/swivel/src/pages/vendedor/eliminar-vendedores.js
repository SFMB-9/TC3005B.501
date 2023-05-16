"use client";

import axios from "axios";
import React, { useState } from "react";
import { useSession } from "next-auth/react";

export default function RemoveSeller() {

    const [email, setEmail] = useState("");
    const [session, loading] = useSession();

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.delete("/api/eliminar/eliminar-vendedores", {
                email: email,
                agency: session.user.agency,
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
                <h1>Eliminar vendedor</h1>

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

                <button type="submit">Register</button>

            </form>


        </>
    )
}