"use client";

import axios from "axios";
//import React, { useState } from "react";
import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";

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
      <form onSubmit={submitHandler}>
        <h1>Change Password</h1>

        <label htmlFor="password_field">Old Password</label>
        <input
          type="password"
          id="password_field"
          className="form-control"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          required
        />
        <label htmlFor="password_field">New Password</label>
        <input
          type="password"
          id="password_field"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label htmlFor="password_field">Confirm Password</label>
        <input
          type="password"
          id="password_field"
          className="form-control"
          value={confPassword}
          onChange={(e) => setConfPassword(e.target.value)}
          required
        />

        <button type="submit">Cambiar Contraseña</button>
      </form>
    </>
  );
}
