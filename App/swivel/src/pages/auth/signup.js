/*
Autores: Karla Mondragón, Andreína Sananez

Código utilizado para el formulario de registro de usuario comprador, para la información de su dirección

01/06/23:
Tonatiuh Reyes:
-Mensajes de errores y validaciones en front. Simplificación de código. Limitaciones de caracteres en campos de texto.
*/

"use client";

import axios from "axios";
import React, { useState } from "react";
import { Typography, TextField, Button, CircularProgress } from "@mui/material";

import AuthComponent from "@/components/login/auth_component";
import "bootstrap/dist/css/bootstrap.min.css";

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
    street: false,
    exterior_num: false,
    interior_num: false,
    city: false,
    state: false,
    country: false,
    postalCode: false,
  });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  let passStatus = null;
  const disabledFirst = () => {
    for (const key in errors) {
      if (errors[key]) return true;
    }
    return !(name && surname && email && password && confPassword && phone);
  };
  const disabledSecond = () => {
    for (const key in errors) {
      if (errors[key]) return true;
    }
    return !(street && exterior_num && city && state && country && postalCode);
  };
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
      setErrMessage("Usuario registrado exitosamente");
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
              <div className="d-flex flex-column">
                <div className="d-flex flex-row mb-2">
                  <TextField
                    required
                    size="small"
                    className="w-100"
                    label="Nombre(s)"
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
                  />
                  <TextField
                    required
                    size="small"
                    className="w-100"
                    label="Apellidos"
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
                    sx={{
                      '& input': { padding: "0.8vw" },
                    }}
                  />
                </div>
                <TextField
                  required
                  size="small"
                  className="w-100 mb-2"
                  label="Correo Electrónico"
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
                />
                <TextField
                  required
                  size="small"
                  className="w-100 mb-2"
                  label="Teléfono"
                  value={phone}
                  disabled={loading}
                  error={errors.phone}
                  helperText={errors.phone ? "Teléfono inválido" : ""}
                  onChange={(e) => {
                    const v = e.target.value;
                    setPhone(v)
                    if (v.length < 10 || v.length > 10 || !/^\d+$/.test(v)) {
                      setErrors({ ...errors, phone: true });
                    } else {
                      setErrors({ ...errors, phone: false });
                    }
                  }}    
                />
                <TextField
                  required
                  type="password"
                  size="small"
                  className="w-100 mb-2"
                  label="Contraseña"
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
                      } else if (!/[a-zA-Z]/.test(v)) {
                        setConfPasswordHelper("La contraseña debe tener al menos una letra")
                      } else if (!/\d/.test(v)) {
                        setConfPasswordHelper("La contraseña debe tener al menos un digito")
                      } else if (!/(!|@|%|&|#|\*|\?|¿|¡|\$)+/.test(v)) {
                        setConfPasswordHelper("La contraseña debe tener al menos un caracter especial")
                      }
                    } else {
                      setErrors({ ...errors, password: false })
                      setConfPasswordHelper("");
                    }
                  }}
                />
                <TextField
                  required
                  type="password"
                  size="small"
                  className="w-100 mb-2"
                  label="Confirmar Contraseña"
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
                <div className="d-flex flex-column text-center pt-1 mb-2 pb-1">
                  <Button
                    className="btn btn-primary btn-block mb-1" 
                    onClick={() =>{setLoading(true);setTimeout(()=>{setLoading(false);setActiveSectionIndex(1)}, 700)}}
                    disableElevation
                    disabled={disabledFirst()}
                  >
                    {loading ? <CircularProgress size={25} sx={{ color: "white"}}/> : 
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
                    }
                  </Button>
                  {/*<button
                    type="submit"
                    className="btn btn-secondary btn-block mb-1"
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
              </div>
            }
          />
        </>
      )}

      {activeSectionIndex === 1 && (
        <>
          <AuthComponent
            title="Regístrate"
            fields={
              <div className="d-flex flex-column">
                <div className="d-flex flex-row mb-2">
                  <TextField
                    required
                    size="small"
                    sx={{width: "50%"}}
                    label="Calle"
                    value={street}
                    disabled={loading}
                    error={errors.street}
                    helperText={errors.street ? "Calle inválida" : ""}
                    onChange={(e) => {
                      const v = e.target.value;
                      setStreet(v);
                      if (!/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/.test(v)) {
                        setErrors({ ...errors, street: true})
                      } else {
                        setErrors({ ...errors, street: false })
                      }
                    }}
                  />
                  <TextField
                    required
                    type="number"
                    size="small"
                    sx={{width: "45%"}}
                    label="nº Exterior"
                    value={exterior_num}
                    disabled={loading}
                    error={errors.exterior_num}
                    helperText={errors.exterior_num ? "Número inválido" : ""}
                    onChange={(e) => setExteriorNum(e.target.value)}
                  />
                  <TextField
                    size="small"
                    type="number"
                    sx={{width: "45%"}}
                    label="nº Interior"
                    value={interior_num}
                    disabled={loading}
                    error={errors.interior_num}
                    helperText={errors.interior_num ? "Número inválido" : ""}
                    onChange={(e) => setInteriorNum(e.target.value)}
                  />
                </div>
                <TextField
                  required
                  type="number"
                  size="small"
                  className="w-100 mb-2"
                  label="Código Postal"
                  value={postalCode}
                  disabled={loading}
                  error={errors.postalCode}
                  helperText={errors.postalCode ? "Código postal inválido" : ""}
                  onChange={(e) => setPC(e.target.value)}
                />
                <TextField
                  required
                  size="small"
                  className="w-100 mb-2"
                  label="Ciudad"
                  value={city}
                  disabled={loading}
                  error={errors.city}
                  helperText={errors.city ? "Solo letras" : ""}
                  onChange={(e) => {
                    const v = e.target.value;
                    setCity(v);
                    if (!/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/.test(v)) {
                      setErrors({ ...errors, city: true})
                    } else {
                      setErrors({ ...errors, city: false })
                    }
                  }}
                />
                <TextField
                  required
                  size="small"
                  className="w-100 mb-2"
                  label="Estado"
                  value={state}
                  disabled={loading}
                  error={errors.state}
                  helperText={errors.state ? "Solo letras" : ""}
                  onChange={(e) => {
                    const v = e.target.value;
                    setState(v);
                    if (!/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/.test(v)) {
                      setErrors({ ...errors, state: true})
                    } else {
                      setErrors({ ...errors, state: false })
                    }
                  }}
                />
                <TextField
                  required
                  size="small"
                  className="w-100 mb-2"
                  label="País"
                  value={country}
                  disabled={loading}
                  error={errors.country}
                  helperText={errors.country ? "Solo letras" : ""}
                  onChange={(e) => {
                    const v = e.target.value;
                    setCountry(v);
                    if (!/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/.test(v)) {
                      setErrors({ ...errors, country: true})
                    } else {
                      setErrors({ ...errors, country: false })
                    }
                  }}
                />
                <div className="d-flex flex-column text-center pt-1 mb-2 pb-1">
                  {error ? null : <Typography sx={{ fontFamily: "Lato", color: "red", fontSize: "12px" }}>{errMessage}</Typography>}
                  <Button
                    type="submit"
                    className="btn btn-primary btn-block mb-2"
                    disableElevation
                    disabled={disabledSecond()}
                    onClick={() => {
                      setLoading(true)
                      submitHandler()
                      if (!passStatus) {
                        //setActiveSectionIndex(0)
                        setError(false)
                        setLoading(false) 
                        setTimeout(() => {window.location.href = "/auth/login";}, 2000);
                      } else {
                        setLoading(false);
                        setError(true);
                        passStatus = null;
                      }
                    }}
                  >
                    {loading ? <CircularProgress size={25} sx={{ color: "white"}}/> : 
                      <Typography
                        wrap
                        sx={{ color: "white", fontFamily: "lato" }}
                      >
                        {" "}
                        Crear Cuenta{" "}
                      </Typography>
                    }
                  </Button>
                  <Button disabled={loading} className="btn btn-secondary btn-block mb-2" href="/auth/signup">
                    <Typography sx={{ color: "white", fontFamily: "lato" }}>
                      {" "}
                      Cancelar{" "}
                    </Typography>
                  </Button>
                </div>
              </div>
            }
          />
        </>
      )}
    </>
  );
}
