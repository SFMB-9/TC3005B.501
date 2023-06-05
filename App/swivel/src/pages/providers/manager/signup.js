
"use client";

import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/router";

export default function ManagerSignup() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();  

  const GA = router.query.GA_id;	
  const agency = router.query.agency_id;

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/register", {
        nombres: name,
        apellidos: surname,
        email: email.toLocaleLowerCase(),
        password: password,
        tipo_usuario: "manager",
        agencia_id: agency,
        grupo_automotriz_id: GA,
        numero_telefonico: phone,
      });

      console.log(data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <h1>Manager Register</h1>

        <div>
          <label htmlFor="name_field">Name</label>
          <input
            type="text"
            id="name_field"
            className="form-control"
            value={name}
            pattern="[a-zA-Z]+"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="name_field">Surname</label>
          <input
            type="text"
            id="name_field"
            className="form-control"
            value={surname}
            pattern="[a-zA-Z]+"
            onChange={(e) => setSurname(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="email_field">Email address</label>
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
          <label htmlFor="phone_field">Phone Number</label>
          <input
            type="text"
            id="phone_field"
            className="form-control"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password_field">Password</label>
          <input
            type="password"
            id="password_field"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </>
  );
}
