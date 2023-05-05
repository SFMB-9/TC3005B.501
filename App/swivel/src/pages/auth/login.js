"use client";

import Link from "next/link";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { data: session, loading } = useSession();
  const router = useRouter();

  /* if (session) {
    router.push("/");
    return null;
  } */

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const data = await signIn("credentials", {
        redirect: false,
        email: email,
        password: password,
      });      

      if(data.error){
        console.log(data);
      }
      else{
        router.push("/");
      }

    } 
    catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="email_field">Correo</label>
          <input
            type="email"
            id="email_field"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password_field">Contraseña</label>
          <input
            type="password"
            id="password_field"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Sign in</button>
      </form>
      <br/>
      <button onClick={() => signIn("google")}>Sign in with Google</button>
    </div>
  )
}