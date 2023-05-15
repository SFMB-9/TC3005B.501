"use client";

import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { data: session } = useSession();

  useEffect(() => {}, [session]);

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
        if (session.role === "seller") {
          callbackUrl = `${window.location.origin}/providers/seller/landing`;
        } else {
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

        <button type="submit">Sign in</button>
        <div className="text-center">
          <p>
            Not a member? <Link href="/register">Register</Link>
          </p>
        </div>
      </form>
    </>
  );
}
