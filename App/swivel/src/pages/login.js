/*
Autores: Karla Mondragón, Andreína Sananez, Ana Paula Katsuda, Salvador Federico Milanés Braniff

Código utilizado para el formulario de inicio de sesión. 
*/

"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import Typography from "@mui/material/Typography";

import AuthComponent from "@/components/login/auth_component";
import "bootstrap/dist/css/bootstrap.min.css";

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
        callbackUrl: `${window.location.origin}/`,
      });

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthComponent
      backImage=""
      fields={
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
              No tienes cuenta? <a href="/auth/signup_buyer">Regístrate aquí</a>
            </p>
          </div>
        </form>}
      cardImage="/card_welcome.png"
      backColor="black"
      bodyText="Compra el auto de tus sueños en un solo click"
      titleText="Bienvenidx"
      textColor="white"
    />
  );
}
