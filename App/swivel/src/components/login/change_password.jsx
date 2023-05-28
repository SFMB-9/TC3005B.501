/*
  This file is used to change the password of the user
  Author: Mateo Herrera
*/

"use client";

import axios from "axios";
//import React, { useState } from "react";
import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { TextField, Button, CircularProgress } from '@mui/material';
import { trusted } from "mongoose";

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { data: session } = useSession();

  const [errors, setErrors] = useState({
    password: false,
    confPassword: false,
    oldPassword: false,
  });

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const disabled = () => {
    for (const k in errors) {
      if (errors[k]) return true;
    }
    return !(password && confPassword && oldPassword);
  }

  // useEffect(() => {}, [session]);

  // if (session) setEmail(session.user.email);
  const [errmessage, setErrmessage] = useState("");
  let passStatus = null;

  const submitHandler = async (e) => {
    e.preventDefault();
    
    if (password === confPassword) {
      try {
        console.log(session.user.email);
        const { data } = await axios.put("/api/changePassword", {
          email: session.user.email,
          password,
          oldPassword,
        });
        console.log(data);
        passStatus = true;
        setErrmessage("Contraseña cambiada exitosamente");
        
      } catch (error) {
        //console.log(error);
        console.log(error.response.data.message);
        passStatus = false;
        if (error.response.data.message === "Wrong Current Password") {
          setErrmessage("Contraseña actual incorrecta");
        } else if (error.response.data.message === "New password must be different") {
          setErrmessage("La nueva contraseña debe ser diferente a la actual");
        } else {
          setErrmessage("Error al cambiar la contraseña");
        }
      }
    }else{
      console.log("Passwords do not match");
      passStatus = false;
      errmessage = "Las contraseñas no coinciden";
    }

  };


  return (
    <>
      <div className="section">
        <div className="container">
          <div className="pt-4">
          <Typography
            variant="h4"
            fontWeight="bold"
            className="pb-2"
            sx={{ fontFamily: "Raleway", color: "#333333" }}
          >
            Cambiar contraseña
          </Typography>
          <Typography
            className="pb-4"
            sx={{ fontFamily: "Lato", color: "#333333", fontSize: "12px",}}
          >
            Se cerrarán todas las sesiones, excepto la actual, para proteger tu cuenta. <br/>
            La contraseña debe tener al menos seis caracteres, e incluir una combinación de números, letras y caracteres especiales (!$@%).
          </Typography>
          <form onSubmit={submitHandler}>
            <TextField
              id="password_field"
              label="Contraseña Actual"
              type="password"
              value={oldPassword}
              className="d-flex flex-strech"
              size="small"
              onChange={(e) => {
                const v = e.target.value;
                setOldPassword(v);
                if (v.length < 6 || !/(!|@|%|&|#|\$)+/.test(v) || !/\w/.test(v)  || !/\d/.test(v)) {
                  setErrors({ ...errors, oldPassword: false })
                } else {
                  setErrors({ ...errors, oldPassword: false })
                }
              }}
              required
              disabled={loading}
              error={errors.oldPassword}
              helperText={errors.oldPassword ? "Contraseña incorrecta (Incluye más de 6 caracteres y al menos una letra, digito y caracter especial" : null}
            /> <br/>
            <TextField
              id="password_field"
              label="Nueva Contraseña"
              type="password"
              size="small"
              className="d-flex flex-strech"
              value={password}
              required
              disabled={loading}
              error={errors.password}
              helperText={errors.password ? "Contraseña incorrecta (Incluye más de 6 caracteres y al menos una letra, un digito y un caracter especial)" : null}
              onChange={(e) => {
                const v = e.target.value;
                setPassword(v);
                if (v.length < 6 || !/(!|@|%|&|#|\$)+/.test(v) || !/\w/.test(v)  || !/\d/.test(v)) {
                  setErrors({ ...errors, password: false })
                } else {
                  setErrors({ ...errors, password: false })
                }
              }}
            /><br/>
            <TextField
              id="password_field"
              label="Confirmar Contraseña"
              type="password"
              size="small"
              className="d-flex flex-strech"
              value={confPassword}
              disabled={loading}
              error={errors.confPassword}
              helperText={errors.confPassword ? "Las contraseñas no coinciden" : null}
              required
              onChange={(e) => {
                const v = e.target.value;
                setConfPassword(v);
                if (v !== password) {
                  setErrors({ ...errors, confPassword: false })
                } else {
                  setErrors({ ...errors, confPassword: false })
                }
              }}
            /><br/>
            <div className="text-center">
              {error ? null : <a><Typography sx={{ fontFamily: "Lato", color: "red", fontSize: "12px",}}>{errmessage}</Typography></a>}
            </div>
            <div className="text-center">
              <Button
                variant="contained"
                disableElevation
                href="/providers/seller"
                className="me-3"
                sx={{
                  fontFamily: "Lato",
                  backgroundColor: "#D9D9D9",
                  "&:hover": {
                    backgroundColor: "#b3b3b3",
                    color: "#fff",
                  },
                }}
              >
                Cancelar
              </Button>
              <Button
                variant="contained"
                type="submit"
                disableElevation
                disabled={disabled()}
                onClick={() => {
                  setLoading(true);
                  if (!passStatus) {
                    setLoading(false);
                    setError(false);
                    passStatus = null;
                  } else {
                    setLoading(false);
                    setError(true);
                    passStatus = null;
                  }
                }}
                sx={{
                  fontFamily: "Lato",
                  backgroundColor: "#F55C7A",
                  "&:hover": {
                    backgroundColor: "#f22c53",
                    color: "#fff",
                  },
                }}
              >
                {loading ? <CircularProgress size={25} sx={{ color: "white"}}/> : "Cambiar Contraseña"}
              </Button>
            </div>
          </form>
          </div>
        </div>
      </div>
    </>
  );
}
