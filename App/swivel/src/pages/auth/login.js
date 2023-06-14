"use client";

import { signIn, useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import { Typography, TextField, Button, CircularProgress } from "@mui/material";
import Link from "next/link";
import AuthComponent from "@/components/login/auth_component";
import Cookies from 'js-cookie';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { data: session } = useSession();
  const [ loading, setLoading ] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [ error, setError ] = useState(false);
  const [ errors, setErrors ] = useState({
    email: false,
    password: false,
  });
  const [firstTime, setFirstTime] = useState(true);

  const disabled = () => {
    for (const k in errors) {
      if (errors[k]) return true;
    }
    return !(password && email);
  }

  useEffect(() => { }, [session]);

  const submitHandler = async (e) => {
    setFirstTime(false);
    try {
      const data = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (data.error) {
        console.log("Error:", data.error);
        if (!firstTime) {
          setErrMessage("Correo o contraseña incorrectos");
          setError(true);
          setLoading(false)
        }
      } else {
          let callbackUrl;
          if (session) {
            if (session.role === "user") {
              if (Cookies.get("CAR_REQ")) {
                const value = Cookies.get("CAR_REQ");
                Cookies.remove("CAR_REQ");
                callbackUrl = value;
              }
              else {
                callbackUrl = `${window.location.origin}/`;
              }
            } else if (session.role === "seller") {
              callbackUrl = `${window.location.origin}/providers/seller`;
            } else if (session.role === "ga_admin") {
              callbackUrl = `${window.location.origin}/providers/GA`;
            } else if (session.role === "agencyManager") {
              callbackUrl = `${window.location.origin}/providers/manager`;
            } else if (session.role === "admin"){
              callbackUrl = `${window.location.origin}/superadmin`;
            } else {
              callbackUrl = `${window.location.origin}/auth/logout`;
            }
          }
          if (callbackUrl) {
            window.location.href = callbackUrl;
          }
      }
    } catch (error) {
      console.log(error);
      if (!firstTime) {
        setErrMessage("Hubo un error al iniciar sesión");
        setError(true);
        setLoading(false);
      }
    }
  };

  return (
    <>
      <AuthComponent
        backImage=""
        fields={
          <div className="d-flex flex-column " onSubmit={submitHandler}>
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
              <TextField
                type="email"
                className="w-100 mb-2"
                value={email}
                required
                disabled={loading}
                error={errors.email}
                helperText={errors.email ? "Correo inválido" : null}
                onChange={(e) => {
                  const v = e.target.value;
                  setEmail(v);
                  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v)) {
                    setErrors({ ...errors, email: true });
                  } else {
                    setErrors({ ...errors, email: false });
                  }
                  setFirstTime(true)
                }}
                sx={{
                  '& input': { padding: "0.8vw" },
                }}
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
              <TextField
                type="password"
                className="w-100 mb-2"
                required
                disabled={loading}
                error={errors.password}
                helperText={errors.password ? "Contraseña incorrecta" : null}
                value={password}
                onChange={(e) => {
                  const v = e.target.value;
                  setPassword(v);
                  setFirstTime(true)
                }}
                sx={{
                  '& input': { padding: "0.8vw" },
                }}
              />
            </div>
            <div className="d-flex flex-column text-center pt-1 mb-2 pb-1">
              {error ? <Typography sx={{ fontFamily: "Lato", color: "red", fontSize: "12px" }}>{errMessage}</Typography> : null}
              <Button 
                className="btn btn-primary btn-block mb-2"
                style={{
                  backgroundColor: "#0d6efd"
                }}
                disabled={disabled()}
                onPointerOver={() => {
                  if (firstTime) {
                    console.log("first time");
                    submitHandler();
                  }
                }}
                onClick={() => {
                  setFirstTime(false);
                  setLoading(true);
                  setTimeout(()=> {submitHandler()}, 1000);
                  
                }}
              >
                {loading ? <CircularProgress size={25} sx={{ color: "white"}}/> : 
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
                }  
              </Button>
              {/*<button type="submit" className="btn btn-secondary btn-block mb-2" onClick={() => signIn("google")}>
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
              </button>*/}
            </div>
            <div className="text-center">
              <p>
                ¿No tienes cuenta? <Link href="/auth/signup" style={{ color: "#F55C7A" }}>Regístrate aquí</Link>
              </p>
            </div>
          </div>}
        cardImage="/card_welcome.png"
        backColor="black"
        bodyText="Compra el auto de tus sueños en un solo click"
        titleText="Bienvenidx"
        textColor="white"
      />
    </>
  );
}