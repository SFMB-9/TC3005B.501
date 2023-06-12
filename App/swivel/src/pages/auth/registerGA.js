"use client";

import axios from "axios";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from '@/styles/registerGA.module.css'
import { Container,Typography, TextField, Button } from "@mui/material";

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
        <> 
        <Container className="m-5">
            <Typography
                sx={{
                    fontFamily:"Raleway"
                }}
            >
                <h1>Registro de GA Admin</h1>
            </Typography>
            <TextField
                required
                size="small"
                className="w-100 my-3"
                label="Nombre(s)"
                value={name}
                pattern="[a-zA-Z0-9À-ÿ\u00f1\u00d1\s]+"
                onChange={(e) => setName(e.target.value)}
            />
            <TextField
                required
                size="small"
                className="w-100 my-3"
                label="Apellido(s)"
                value={surname}
                pattern="[a-zA-Z0-9À-ÿ\u00f1\u00d1\s]+"
                onChange={(e) => setSurname(e.target.value)}
            />
            <TextField
                required
                size="small"
                className="w-100 my-3"
                label="Email"
                value={email}
                pattern="[a-zA-Z0-9À-ÿ\u00f1\u00d1\s]+"
                onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
                required
                size="small"
                className="w-100 my-3"
                label="Número telefónico"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                pattern="[a-zA-Z0-9À-ÿ\u00f1\u00d1\s]+"
            />
            <TextField
                required
                size="small"
                type="password"
                className="w-100 my-3"
                label="Contraseña"
                value={password}
                onChange={(e) => {
                    console.log(e.target.value)
                    setPassword(e.target.value)}}
            />
            <TextField
                required
                size="small"
                type="password"
                className="w-100 my-3"
                label="Confirmar contraseña"
            />
            <div className>
            <Button
              onClick={registerHandler}
              variant="contained"
              type="submit"
              className="w-80 mt-3"
              sx={{
                fontFamily: "Lato",
                ":hover": {
                  backgroundColor: "#333333",
                },
              }}
            >
              Siguiente
            </Button>
            </div>
        </Container>
        </>
    );
}