/*
Autores: Karla Mondragón, Andreína Sananez, Ana Paula Katsuda, Salvador Federico Milanés Braniff

Código utilizado para el formulario de registro de usuario comprador. 
*/

"use client";

import axios from "axios";
import React, { useState } from "react";
import AuthComponent from "@/components/login/auth_component";

import "bootstrap/dist/css/bootstrap.min.css";
import { Typography, TextField, CircularProgress, Button } from "@mui/material";

/* Función que retorna el formulario de registro de comprador con nombre, 
correo electrónico y contraseña, junto con los botones de ingreso  */
export default function SignupBuyer() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [errors, setErrors] = useState({
    name: false,
    surname: false,
    email: false,
    password: false,
    confPassword: false,
  });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const disabled = () => {
    for (const k in errors) {
      if (errors[k]) return true;
    }
    return !(password && email && name && surname && confPassword);
  };

  let passStatus = null;

  const { encryptRole } = require("@/utils/crypto");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/register", {
        name,
        surname,
        email,
        password,
        role: "user",
      });
      passStatus = true;
      console.log(data);
    } catch (error) {
      passStatus = false;
      console.log(error.response.data);
    }
  };

  return (
    <>
      <AuthComponent
        title="Regístrate"
        fields={
          <form className="d-flex flex-column" onSubmit={submitHandler}>
            <div className="form-outline mb-2">
              <div className="d-flex flex-row ">
                <TextField
                  type="text"
                  className="w-100"
                  placeholder="Nombre(s)"
                  value={name}
                  disabled={loading}
                  error={errors.name}
                  helperText={errors.name ? "Solo letras, sin acentos" : ""}
                  onChange={(e) => {
                    const v = e.target.value;
                    setName(v);
                    if (!/[a-zA-Z]+/.test(v)) {
                      setErrors({ ...errors, name: true})
                    } else {
                      setErrors({ ...errors, name: false })
                    }
                  }}
                  required

                />
                <TextField
                  type="text"
                  className="w-100"
                  placeholder="Apellidos"
                  value={surname}
                  disabled={loading}
                  error={errors.surname}
                  helperText={errors.surname ? "Solo letras, sin acentos" : ""}
                  onChange={(e) => {
                    const v = e.target.value;
                    setSurname(v);
                    if (!/[a-zA-Z]+/.test(v)) {
                      setErrors({ ...errors, surname: true})
                    } else {
                      setErrors({ ...errors, surname: false })
                    }
                  }}
                  required

                />
              </div>
            </div>
            <div className="form-outline mb-2">
              <TextField
                type="email"
                className="w-100"
                placeholder="Correo Electrónico"
                value={email}
                disabled={loading}
                error={errors.email}
                helperText={errors.email ? "Correo electrónico inválido" : ""}
                onChange={(e) => {
                  const v = e.target.value;
                  setEmail(v);
                  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v)) {
                    setErrors({ ...errors, email: true });
                  } else {
                    setErrors({ ...errors, email: false });
                  }
                }}
                required
              />
            </div>
            <div className="form-outline mb-2">
              <TextField
                type="password"
                className="w-100"
                placeholder="Contraseña"
                value={password}
                disabled={loading}
                error={errors.password}
                helperText={errors.password ? "Debe tener más de 6 carácteres y al menos una letra, un digito y un carácter especial" : null}
                onChange={(e) => {
                  const v = e.target.value;
                  setPassword(v);
                  if (v.length < 6 || !/(!|@|%|&|#|\$)+/.test(v) || !/\w/.test(v)  || !/\d/.test(v)) {
                    setErrors({ ...errors, password: true})
                  } else {
                    setErrors({ ...errors, password: false })
                  }
                }}
                required

              />
            </div>
            <div className="form-outline mb-2">
              <TextField
                type="password"
                className="w-100"
                placeholder="Confirmar Contraseña"
                value={confPassword}
                disabled={loading}
                error={errors.confPassword}
                helperText={errors.confPassword ? "Las contraseñas no coinciden" : ""}
                onChange={(e) => {
                  const v = e.target.value;
                  setConfPassword(v);
                  if (v !== password) {
                    setErrors({ ...errors, confPassword: true})
                  } else {
                    setErrors({ ...errors, confPassword: false })
                  }
                }}
              />
            </div>
            <div className="d-flex flex-column text-center pt-1 mb-2 pb-1">
              {error ? <Typography sx={{ color: "red" }}>Algo salio mal</Typography> : null}
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
                {loading ? <CircularProgress size={25} sx={{ color: "white"}}/> : 
                  <Typography
                    wrap
                    sx={{
                    color: "white",
                    fontFamily: "lato",
                    }}
                  >
                    {" "}
                    Continuar{" "}
                  </Typography>
                }
              </Button>
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
                ¿Representas a un Grupo Automotriz?<a href="#!"> Regístrate aquí</a>
              </p>
            </div>
          </form>
        }
      />
    </>
  );
}