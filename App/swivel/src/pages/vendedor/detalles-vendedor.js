"use client";

import axios from "axios";
import React, { useState } from "react";
import { useSession } from "next-auth/react";

export default function RemoveSeller() {

    const [name, setName] = useState("");
    const [last_name, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [cellphone, setCellphone] = useState("");
    const [oldEmail, setOldEmail] = useState("");

    const [session, loading] = useSession();

    const [fetchedData, setFetchedData] = useState(null);


    const viewHandler = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.get("/api/vendedores/ver-detalles-vendedor", {
                email: email,
                agency: session.user.agency,
            });

            setFetchedData(data.seller);
            setOldEmail(data.seller.email);

        }
        catch (error) {
            console.log(error.response.data);
        }
    };

    const detailsHandler = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.put("/api/vendedores/actualizar-vendedor", {
                name: name,
                name: last_name,
                newEmail: email,
                oldEmail: oldEmail,
                cellphone: cellphone,
                agency: session.user.agency,
            });

            console.log(data)
        }
        catch (error) {
            console.log(error.response.data);
        }
    };

    return (
        <>
            <form onSubmit={viewHandler}>
                <h1>Buscar vendedor</h1>

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

                <button type="submit">Ver detalles</button>
            </form>
            
            {fetchedData && (
                <div>
                    <h2>Detalles del vendedor:</h2>
                    <p>Nombre: {fetchedData.nombres}</p>
                    <p>Apellidos: {fetchedData.apellidos}</p>
                    <p>Email: {fetchedData.email}</p>
                    <p>Teléfono: {fetchedData.telefono}</p>
                </div>
            )}

            <form onSubmit={detailsHandler}>
                <h1>Actualizar datos</h1>

                <div>
                    <label htmlFor="name_field">Nombre</label>
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
                    <label htmlFor="last_name_field">Apellido</label>
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
                    <label htmlFor="email_field">Email</label>
                    <input
                        type="text"
                        id="email_field"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                
                <div>
                    <label htmlFor="cellphone_field">Teléfono</label>
                    <input
                        type="text"
                        id="cellphone_field"
                        className="form-control"
                        value={cellphone}
                        onChange={(e) => setCellphone(e.target.value)}
                        required
                    />
                </div>

                <button type="submit">Actualizar</button>
            </form>
        </>
    )
}