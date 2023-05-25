/*
Autores: Karla Mondragón, Andreína Sananez

Código utilizado para el formulario de registro de usuario comprador, para la información de su dirección
*/

"use client";

import axios from "axios";
import React, { useState } from "react";
import AuthComponent from "@/components/login/auth_component";

import "bootstrap/dist/css/bootstrap.min.css";
import Typography from "@mui/material/Typography";

/* Función que retorna el formulario de registro de comprador con su dirección, junto con los botones de ingreso  */
export default function SignupBuyerData() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [exterior_num, setExteriorNum] = useState("");
  const [interior_num, setInteriorNum] = useState("");
  const [street, setStreet] = useState("");
  const [postalCode, setPC] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const { encryptRole } = require("@/utils/crypto");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/register", {
        tipo_usuario: "user",
        nombres: name,
        apellidos: surname,
        email: email,
        password: password,
        numero_telefonico: phone,

        direccion: {
          calle: street,
          numero_exterior: exterior_num,
          numero_interior: interior_num,
          ciudad: city,
          estado: state,
          pais: country,
          codigo_postal: postalCode,
        },
      });
      console.log(data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <>
      {activeSectionIndex === 0 && (
        <>
          <AuthComponent
            title="Regístrate"
            fields={
              <form
                className="d-flex flex-column"
                onSubmit={() => {
                  setActiveSectionIndex(1);
                }}
              >
                <div className="form-outline mb-2">
                  <div className="d-flex flex-row ">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nombre(s)"
                      value={name}
                      pattern="[a-zA-Z0-9À-ÿ\u00f1\u00d1\s]+"
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Apellidos"
                      value={surname}
                      pattern="[a-zA-Z0-9À-ÿ\u00f1\u00d1\s]+"
                      onChange={(e) => setSurname(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="form-outline mb-2">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Correo Electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="form-outline mb-2">
                  <input
                    type="phone"
                    className="form-control"
                    placeholder="Teléfono"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
                <div className="form-outline mb-2">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="form-outline mb-2">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Confirmar Contraseña"
                    required
                  />
                </div>
                <div className="d-flex flex-column text-center pt-1 mb-2 pb-1">
                  <button
                    className="btn btn-primary btn-block mb-2"
                    onSubmit={submitHandler}
                  >
                    <Typography
                      wrap
                      sx={{
                        color: "white",
                        fontFamily: "lato",
                      }}
                    >
                      {" "}
                      Continuar el Registro{" "}
                    </Typography>
                  </button>
                  <button
                    type="submit"
                    className="btn btn-secondary btn-block mb-2"
                  >
                    <Typography
                      sx={{
                        color: "white",
                        fontFamily: "lato",
                      }}
                    >
                      {" "}
                      <img alt="logo de google" src="/google_logo.svg" />{" "}
                      Ingresar con Google{" "}
                    </Typography>
                  </button>
                </div>
                <div className="text-center">
                  <p>
                    ¿Representas a un Grupo Automotriz?
                    <a href="#!"> Regístrate aquí</a>
                  </p>
                </div>
              </form>
            }
          />
        </>
      )}

      {activeSectionIndex === 1 && (
        <>
          <AuthComponent
            title="Regístrate"
            fields={
              <form className="d-flex flex-column" onSubmit={submitHandler}>
                <div className="form-outline mb-2">
                  <div className="d-flex flex-row ">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Calle"
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      required
                    />
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Número Exterior"
                      value={exterior_num}
                      onChange={(e) => setExteriorNum(e.target.value)}
                      required
                    />
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Número Interior"
                      value={interior_num}
                      onChange={(e) => setInteriorNum(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="form-outline mb-2">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Código Postal"
                    value={postalCode}
                    onChange={(e) => setPC(e.target.value)}
                    required
                  />
                </div>
                <div className="form-outline mb-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ciudad"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                </div>
                <div className="form-outline mb-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Estado"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="País"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                  />
                </div>
                <div className="d-flex flex-column text-center pt-1 mb-2 pb-1">
                  <button
                    className="btn btn-primary btn-block mb-2"
                    onSubmit={() => setActiveSectionIndex(2)}
                  >
                    <Typography
                      wrap
                      sx={{ color: "white", fontFamily: "lato" }}
                    >
                      {" "}
                      Crear Cuenta{" "}
                    </Typography>
                  </button>
                  <button
                    type="submit"
                    className="btn btn-secondary btn-block mb-2"
                  >
                    <Typography sx={{ color: "white", fontFamily: "lato" }}>
                      {" "}
                      Cancelar{" "}
                    </Typography>
                  </button>
                </div>
              </form>
            }
          />
        </>
      )}
    </>
  );
}
