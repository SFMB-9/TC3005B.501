"use client";

import Link from "next/link";
import React, { useState } from "react";
import { signIn } from "next-auth/react";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const data = await signIn("credentials", {
        redirect: true,
        email,
        password,
        callbackUrl: `${window.location.origin}/auth/logout`,
      });

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>

      <form onSubmit={submitHandler}>
        <h1>Login</h1>
        <div>
          <label htmlFor="email_field"> Email address </label>
          <input
            type="email"
            id="email_field"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password_field"> Password </label>
          <input
            type="password"
            id="password_field"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <br/>
        <button type="submit">Sign in</button>
      </form>
        <div>
          <button onClick={() => signIn("azuread-b2c")}>Sign in with Google</button>
          <br/>
          <button onClick={() => signIn("google")}>Sign in with Microsoft</button>
        </div>


        <div className="text-center">
          <p>
            Not a member? <Link href="/register">Register</Link>
          </p>
        </div>

    </>
  )
}