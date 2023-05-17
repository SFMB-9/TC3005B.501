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
import { TextField, Button } from '@mui/material';

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { data: session } = useSession();

  // useEffect(() => {}, [session]);

  // if (session) setEmail(session.user.email);
  
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
        
      } catch (error) {
        console.log(error);
        console.log(error.response.data);
      }
    }else{
      console.log("Passwords do not match");
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
              label="Old Password"
              type="password"
              value={oldPassword}
              className="d-flex flex-strech"
              size="small"
              onChange={(e) => setOldPassword(e.target.value)}
              required
            /> <br/>
            <TextField
              id="password_field"
              label="New Password"
              type="password"
              size="small"
              className="d-flex flex-strech"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            /><br/>
            <TextField
              id="password_field"
              label="Confirm Password"
              type="password"
              size="small"
              className="d-flex flex-strech"
              value={confPassword}
                onChange={(e) => setConfPassword(e.target.value)}
                required
            />
            <br/>

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
          onClick={() =>
            viewRequest(params.row._id, params.row.usuario_final_id)
          }
          sx={{
            fontFamily: "Lato",
            backgroundColor: "#F55C7A",
            "&:hover": {
              backgroundColor: "#f22c53",
              color: "#fff",
            },
          }}
        >
          Cambiar Contraseña
        </Button>
            </div>

            </form>
          </div>
        </div>
      </div>
    </>
  );
}
