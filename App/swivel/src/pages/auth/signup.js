/*
Autores: Karla Mondragón, Andreína Sananez

Código utilizado para el formulario de registro de usuario comprador, para la información de su dirección
*/

"use client";

import axios from "axios";
import React, { useState } from "react";
import AuthComponent from "@/components/login/auth_component";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Typography, TextField, Button, CircularProgress } from "@mui/material";

/* Función que retorna el formulario de registro de comprador con su dirección, junto con los botones de ingreso  */
export default function SignupBuyerData() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [confPasswordHelper, setConfPasswordHelper] = useState("");
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
  const [errors, setErrors] = useState({
    name: false,
    surname: false,
    email: false,
    password: false,
    confPassword: false,
    phone: false,
  });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const disabled = () => {
    for (const key in errors) {
      if (errors[key]) return true;
    }
    return false;
  };

  const [errMessage, setErrMessage] = useState("");
  let passStatus = null;


  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/register", {
        tipo_usuario: 'user',
        nombres: name,
        apellidos: surname,
        email: email.toLocaleLowerCase(),
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
      passStatus = true;
      setErrMessage("Usuario registrado exitosamente");
      setTimeout(() => {window.location.href = "/auth/login";}, 1000);
    } catch (error) {
      console.log(error.response.data);
      passStatus = false;
      setErrMessage("Hubo un error al registrarse");
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
                <div className="mb-2">
                  <div className="d-flex flex-row ">
                    <TextField
                      type="text"
                      className="w-100"
                      placeholder="Nombre(s)"
                      value={name}
                      disabled={loading}
                      error={errors.name}
                      helperText={errors.name ? "Solo letras" : ""}
                      onChange={(e) => {
                        const v = e.target.value;
                        setName(v);
                        if (!/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/.test(v)) {
                          setErrors({ ...errors, name: true})
                        } else {
                          setErrors({ ...errors, name: false })
                        }
                      }}
                      required
                    />
                    <TextField
                      ype="text"
                      className="w-100"
                      placeholder="Apellidos"
                      value={surname}
                      disabled={loading}
                      error={errors.surname}
                      helperText={errors.surname ? "Solo letras" : ""}
                      onChange={(e) => {
                        const v = e.target.value;
                        setSurname(v);
                        if (!/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/.test(v)) {
                          setErrors({ ...errors, surname: true})
                        } else {
                          setErrors({ ...errors, surname: false })
                        }
                      }}
                      required
                    />
                  </div>
                </div>
                <div className="mb-2">
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
                <div className="mb-2">
                  <TextField
                    type="phone"
                    className="w-100"
                    placeholder="Teléfono"
                    value={phone}
                    disabled={loading}
                    error={errors.phone}
                    helperText={errors.phone ? "Teléfono inválido" : ""}
                    onChange={(e) => {
                      const v = e.target.value;
                      setPhone(v)
                      if (v.length < 10 || !/^\d+$/.test(v)) {
                        setErrors({ ...errors, phone: true });
                      } else {
                        setErrors({ ...errors, phone: false });
                      }
                    }}
                    required
                  />
                </div>
                <div className="mb-2">
                  <TextField
                    type="password"
                    className="w-100"
                    placeholder="Contraseña"
                    value={password}
                    disabled={loading}
                    error={errors.password}
                    helperText={errors.password ? confPasswordHelper : ""}
                    onChange={(e) => {
                      const v = e.target.value;
                      setPassword(v);
                      if (v.length < 6 || !/(!|@|%|&|#|\*|\?|¿|¡|\$)+/.test(v) || !/\w/.test(v)  || !/\d/.test(v)) {
                        setErrors({ ...errors, password: true })
                        if (v.length < 6) {
                          setConfPasswordHelper("La contraseña debe tener al menos 6 caracteres")
                        }
                        else if (!/[a-zA-Z]/.test(v)) {
                          setConfPasswordHelper("La contraseña debe tener al menos una letra")
                        }
                        else if (!/\d/.test(v)) {
                          setConfPasswordHelper("La contraseña debe tener al menos un digito")
                        }
                        else if (!/(!|@|%|&|#|\*|\?|¿|¡|\$)+/.test(v)) {
                          setConfPasswordHelper("La contraseña debe tener al menos un caracter especial")
                        }
                      } else {
                        setErrors({ ...errors, password: false })
                        setConfPasswordHelper("");
                      }
                    }}
                    required
                  />
                </div>
                <div className="mb-2">
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
                  {/*<button
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
                    </button>*/}
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
              <div>
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
                  </div>
                </form>
                <a className="d-flex flex-column" href="/auth/signup" style={{ textDecoration: 'none' }}>
                  <button className="btn btn-secondary btn-block mb-2">
                    <Typography sx={{ color: "white", fontFamily: "lato" }}>
                      {" "}
                      Cancelar{" "}
                    </Typography>
                  </button>
                </a>
              </div>
            }
          />
        </>
      )}
    </>
  );
}
