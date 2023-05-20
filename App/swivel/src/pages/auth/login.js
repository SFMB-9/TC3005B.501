"use client";

import { signIn, useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import AuthComponent from "@/components/login/auth_component";
import { Typography } from "@mui/material";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { data: session } = useSession();

  useEffect(() => { }, [session]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const data = await signIn("credentials", {
        redirect: false,
        email,
        password,
        // callbackUrl: `${window.location.origin}/auth/logout`,
      });

      if (data.error) {
        console.log("Error:", data.error);
      } else {
        let callbackUrl;
        if (session.role === "buyer") {
          callbackUrl = `${window.location.origin}/`;
        } else if (session.role === "seller") {
          callbackUrl = `${window.location.origin}/providers/seller`;
        }
        if (session.role === "manager") {
          callbackUrl = `${window.location.origin}/providers/manager`;
        }
        else {
          callbackUrl = `${window.location.origin}/auth/logout`;
        }

        window.location.href = callbackUrl;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
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
    </>
  );
}
