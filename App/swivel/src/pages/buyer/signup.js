/*
Autores: Karla Mondragón, Andreína Sananez

Código utilizado para el formulario de registro de usuario comprador, para la información de su dirección
*/

"use client";

import axios from "axios";
import React, { useState } from "react";
import AuthComponent from "@/components/login/auth_component";

import "bootstrap/dist/css/bootstrap.min.css";
import { Typography, TextField, Button, CircularProgress } from "@mui/material";

/* Función que retorna el formulario de registro de comprador con su dirección, junto con los botones de ingreso  */
export default function SignupBuyerData() {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");
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
        for (const k in errors) {
            if (errors[k]) return true;
        }
        return !(password && email && name && surname && confPassword && phone);
    };

    let passStatus = null;
    let message = "";

    const submitHandler = async (e) => {
        

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
      message = "Usuario registrado exitosamente";
    } catch (error) {
      console.log(error.response.data);
      passStatus = false;
      if (error.response.data.message === "Account already exists") {
        message = "El correo electrónico ya está registrado";
      }
    }
  };

  return (
    <>
    {activeSectionIndex === 0 && (
        <>
            <AuthComponent
                title="Regístrate"
                fields={
                <form className="d-flex flex-column" onSubmit={() => {setActiveSectionIndex(1)}}>
                    <div className="form-outline mb-1">
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
                    <div className="form-outline mb-1">
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

                    <div className="form-outline mb-1">
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
                    <div className="form-outline mb-1">
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
                    <div className="form-outline mb-1">
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
                    <div className="d-flex flex-column text-center pt-1 mb-1 pb-1">
                    <button className="btn btn-primary btn-block mb-2" onSubmit={submitHandler}>
                            <Typography
                                wrap sx={{
                                    color: "white",
                                    fontFamily: "lato",
                                }}
                                >
                                {" "}
                                Continuar el Registro{" "}
                            </Typography>
                        </button>
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
                      {error ? <Typography sx={{ color: "red", fontFamily: "lato" }}>{message}</Typography> : null}
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
                        <Typography
                            wrap sx={{ color: "white", fontFamily: "lato" }}>
                            {" "}
                            Crear Cuenta{" "}
                        </Typography>
                    </Button>
                    <button type="submit" className="btn btn-secondary btn-block mb-2">
                        <Typography
                            sx={{ color: "white", fontFamily: "lato"}}>
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