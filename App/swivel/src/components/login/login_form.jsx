/*
Autor: Ana Paula Katsuda Zalce

Código utilizado para el formulario de inicio de sesión. 
Este componente se puede reutilizar en cualquier pantalla que requiera un 
formulario para ingresar al sistema.
*/

import Typography from "@mui/material/Typography";

"use client";

import Link from "next/link";
import React, { useState } from "react";
import { signIn } from "next-auth/react";

import Typography from "@mui/material/Typography";
import "bootstrap/dist/css/bootstrap.min.css";

/* Función que retorna el formulario de inicio de sesión con los campos de 
correo electrónico y contraseña, junto con los botones de ingreso o de 
ir a la pantalla de registro. */
export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const data = await signIn("credentials", {
        redirect: true,
        email,
        password,
        callbackUrl: `${window.location.origin}/auth/logout`,
      });

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <img
          className="w-75 align-items-center justify-content-center img-fluid"
          alt=""
          src="/swivel_logo.svg"
        />
        <b className="text-center mt-3 mb-3 fs-2 align-items-stretch">
          <Typography
            wrap="true"
            variant="h1"
            sx={{
              color: "black",
              fontWeight: "bold",
              fontSize: "2rem",
              fontFamily: "Raleway",
            }}
          >
            {" "}
            Iniciar Sesión
          </Typography>
        </b>
      </div>

      <form className="d-flex flex-column " onSubmit={submitHandler}>
        <div className="form-outline mb-2">
          <label className="form-label">
            <Typography
              sx={{
                color: "black",
                fontFamily: "lato",
              }}
            >
              {" "}
              Correo electrónico{" "}
            </Typography>
          </label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

        </div>
        <div className="form-outline mb-2">
          <label className="form-label">
            <Typography
              sx={{
                color: "black",
                fontFamily: "lato",
              }}
            >
              {" "} Contraseña{" "} </Typography> </label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="d-flex flex-column text-center pt-1 mb-2 pb-1">
          <button type="submit" className="btn btn-primary btn-block mb-2">
            <Typography
              wrap
              sx={{
                color: "white",
                fontFamily: "lato",
              }}
            >
              {" "}
              Ingresar{" "}
            </Typography>
          </button>

          <button type="submit" className="btn btn-secondary btn-block mb-2">
            <Typography
              sx={{
                color: "white",
                fontFamily: "lato",
              }}
            >
              {" "}
              <img alt="logo de google" src="/google_logo.svg" /> Ingresar con
              Google{" "}
            </Typography>
          </button>
        </div>
        <div className="text-center">
          <p>
            No tienes cuenta? <a href="/auth/register_user">Regístrate aquí</a>
          </p>
        </div>
      </form>
    </>
  );
}
