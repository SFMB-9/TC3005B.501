"use client";

import { signIn, useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import AuthComponent from "@/components/login/auth_component";
import { Typography, TextField, Button, CircularProgress } from "@mui/material";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { data: session } = useSession();

  const [ errors, setErrors ] = useState({
    email: false,
    password: false,
  });

  const [ error, setError ] = useState(false);
  const [ loading, setLoading ] = useState(false);

  const disabled = () => {
    for (const k in errors) {
      if (errors[k]) return true;
    }
    return !(password && email);
  }

  let passStatus = null;

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
        passStatus = false;
      } else {
        passStatus = true;
        let callbackUrl;
        if (session.role === "user") {
          callbackUrl = `${window.location.origin}/`;
        } else if (session.role === "seller") {
          callbackUrl = `${window.location.origin}/providers/seller`;
        } else if (session.role === "GA") {
          callbackUrl = `${window.location.origin}/providers/GA`;
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
      passStatus = false;
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
                helperText={errors.password ? "Debe tener más de 6 carácteres y al menos una letra, un digito y un carácter especial" : null}
                value={password}
                onChange={(e) => {
                  const v = e.target.value;
                  setPassword(v);
                  if (v.length < 6 || !/(!|@|%|&|#|\$)+/.test(v) || !/\w/.test(v)  || !/\d/.test(v)) {
                    setErrors({ ...errors, password: false})
                  } else {
                    setErrors({ ...errors, password: false })
                  }
                }}
              />
            </div>
            {error ? <Typography sx={{ color: "red" }}>Correo o contraseña incorrectos</Typography> : null}
            <div className="d-flex flex-column text-center pt-1 mb-2 pb-1">
              <Button 
                type="submit" 
                className="btn btn-primary btn-block mb-2"
                disabled={disabled()}
                onClick={() => {
                  setLoading(true);
                  if (passStatus === false) {
                    setError(true);
                    setLoading(false);
                  } else {
                    setError(false);
                    setLoading(false);
                    passStatus = null;
                  }
                }}
              >
                {loading ? <CircularProgress size={25} sx={{ color: "white"}}/> : <Typography
                  wrap
                  sx={{
                    color: "white",
                    fontFamily: "lato",
                  }}
                >
                  {" "}
                  Ingresar{" "}
                </Typography>}
                
              </Button>

              <button type="submit" className="btn btn-secondary btn-block mb-2" onClick={() => signIn("google")}>
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
                No tienes cuenta? <a href="/auth/signup">Regístrate aquí</a>
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