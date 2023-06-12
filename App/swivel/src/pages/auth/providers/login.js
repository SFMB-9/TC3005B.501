"use client";

import { signIn, useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import AuthComponent from "@/components/login/auth_component";
import { Typography } from "@mui/material";

import styles from "@/styles/login.module.css";

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
      });

      if (data.error) {
        console.log("Error:", data.error);
      } else {
        let callbackUrl;
        // TODO roles are encrypted so it won't match
        // TODO Check new actual role names and compare those @f-salcedo-c
        //  @a01025303
        // Hotfix: OR for variable user naming conventions.
        console.log("Role:", session.role);
        if (session.role === "seller") {
          callbackUrl = `${window.location.origin}/providers/seller`;
        } else if (session.role === "ga_admin") {
          // Check if the GA has a grupo_automotriz_id, meaning they are verified
          let rawCheck = await fetch(`http://localhost:3000/api/GA/GA-has-id?_id=${session.id}`,
            { method: 'GET' });
          const resCheck = await rawCheck.json();
          // If the user is verified, redirect to landing
          if(resCheck.hasGrupoAutomotrizId) {
            callbackUrl = `${window.location.origin}/providers/GA`;
          // If the user is not verified, look for a process
          } else {
            let rawProcess = await fetch(`http://localhost:3000/api/GA/GA-process-id?_id=${session.id}`,
              { method: 'GET' });
            const resProcess = await rawProcess.json();
            // If there is an active process, redirect to it
            if (resProcess.process) {
              callbackUrl = `${window.location.origin}/providers/GA/registerGroup/${resProcess.process._id}`;
            // If there isn't, redirect to the form to begin the process
            } else {
              callbackUrl = `${window.location.origin}/providers/GA/registerGroup/form`;
            }
          }
        } else if (session.role === "manager") {
          callbackUrl = `${window.location.origin}/providers/manager`;
        } else {
          // Log the role to vscode console
          console.log("Role:", session.role);
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
                <button type="submit" className="btn btn-primary btn-block mb-2 color-black" style={{ backgroundColor: '#000', border: 'none' }}
                >
                  {" "}
                  Ingresar{" "}
              </button>
            </div>
          </form >}
        title="Iniciar sesión como proveedor"
        cardImage="/providers_login_image.png"
        backColor="white"
        titleText="Portal Swivel"
        bodyText="Inicia sesión para administrar los usuarios registrados en la plataforma"
        textColor="black"
      />
    </>

  );
}