"use client";

import axios from "axios";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import AuthComponent from "@/components/login/auth_component";
import "bootstrap/dist/css/bootstrap.min.css";
import Typography from "@mui/material/Typography";

/* Función que retorna el formulario de registro de GA con su dirección, junto con los botones de ingreso  */
export default function SignupGAData() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");
    const [confPasswordHelper, setConfPasswordHelper] = useState("");

    const [agencyName, setAgencyName] = useState("");
    const [url, setUrl] = useState("");
    const [rfc, setRfc] = useState("");
    const [phone, setPhone] = useState("");
    const [street, setStreet] = useState("");
    const [exterior_num, setExteriorNum] = useState("");
    const [interior_num, setInteriorNum] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [postalCode, setPC] = useState("");
    
    const [legalName, setLegalName] = useState("");
    const [legalSurname, setLegalSurname] = useState("");
    const [legalEmail, setLegalEmail] = useState("");
    const [legalPhone, setLegalPhone] = useState("");
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
    
    
    const [activeSectionIndex, setActiveSectionIndex] = useState(0);

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post("/api/register", {
                tipo_usuario: 'user',
                tipo_entidad: 'GAEntity',
                nombre_agencia: agencyName,
                nombres: name,
                last_name: surname,
                email: email.toLocaleLowerCase(),
                password: password,
                numero_telefonico: phone,
                url: url,
                rfc: rfc,

                direccion: {
                    calle: street,
                    numero_exterior: exterior_num,
                    numero_interior: interior_num,
                    ciudad: city,
                    estado: state,
                    pais: country,
                    codigo_postal: postalCode,
                },

                legal: {
                    lNombres: legalName,
                    lApellidos: legalSurname,
                    lEmail: legalEmail,
                    lNumero_telefonico: legalPhone
                }
            });
            
            //routDocs(data);

            console.log(data);
            passStatus = true;
            setErrMessage("Usuario registrado exitosamente");
            setTimeout(() => { window.location.href = "/auth/login"; }, 1000);
        } 
        catch (error) {
            console.log(error.response.data);
            passStatus = false;
            setErrMessage("Hubo un error al registrarse");
        }
    };
/*
    const routDocs = (data) => {
        router.push(`/providers/GA/documentosGA?_id=${data}`);
    }
    */

    return (
        <>
            {activeSectionIndex === 0 && (
                <>
                    <AuthComponent
                        title="Crea tu cuenta"
                        fields={
                            <form className="d-flex flex-column" onSubmit={() => { setActiveSectionIndex(1) }}>
                                <div className="form-outline mb-2">
                                    <div className="d-flex flex-row ">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Nombre(s)"
                                            value={name}
                                            disabled={loading}
                                            error={errors.name}
                                            helperText={errors.name ? "Solo letras" : ""}
                                            //pattern="[a-zA-Z0-9À-ÿ\u00f1\u00d1\s]+"
                                            onChange={(e) => {
                                                const v = e.target.value;
                                                setName(v);
                                                if (!/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/.test(v)) {
                                                  setErrors({ ...errors, name: true })
                                                } else {
                                                  setErrors({ ...errors, name: false })
                                                }
                                              }}
                                              sx={{
                                                '& input': { padding: "0.8vw", marginRight: "0.1vw" },
                                              }}
                                            required
                                        />
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Apellidos"
                                            value={surname}
                                            disabled={loading}
                                            error={errors.surname}
                                            helperText={errors.surname ? "Solo letras" : ""}
                                            onChange={(e) => {
                                                const v = e.target.value;
                                                setSurname(v);
                                                if (!/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/.test(v)) {
                                                setErrors({ ...errors, surname: true })
                                                } else {
                                                setErrors({ ...errors, surname: false })
                                                }
                                            }}
                                            sx={{
                                                '& input': { padding: "0.8vw" },
                                            }}
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
                                        sx={{
                                        '& input': { padding: "0.8vw" },
                                        }}
                                        required
                                    />
                                </div>
                                <div className="form-outline mb-2">
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Contraseña"
                                        value={password}
                                        disabled={loading}
                                        error={errors.password}
                                        helperText={errors.password ? confPasswordHelper : ""}
                                        onChange={(e) => {
                                        const v = e.target.value;
                                        setPassword(v);
                                        if (v.length < 6 || !/(!|@|%|&|#|\*|\?|¿|¡|\$)+/.test(v) || !/\w/.test(v) || !/\d/.test(v)) {
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
                                        sx={{
                                        '& input': { padding: "0.8vw" },
                                        }}
                                        required
                                    />
                                </div>
                                <div className="form-outline mb-2">
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Confirmar Contraseña"
                                        value={confPassword}
                                        disabled={loading}
                                        error={errors.confPassword}
                                        helperText={errors.confPassword ? "Las contraseñas no coinciden" : ""}
                                        onChange={(e) => {
                                        const v = e.target.value;
                                        setConfPassword(v);
                                        if (v !== password) {
                                            setErrors({ ...errors, confPassword: true })
                                        } else {
                                            setErrors({ ...errors, confPassword: false })
                                        }
                                        }}
                                        sx={{
                                        '& input': { padding: "0.8vw" },
                                        }}
                                        required
                                    />
                                </div>
                                <div className="d-flex flex-column text-center pt-1 mb-2 pb-1">
                                    <button className="btn btn-primary btn-block mb-2"  onSubmit={() => setActiveSectionIndex(1)}>
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
                                </div>
                                <div className="text-center">
                                    <p>
                                        ¿Ya tienes una cuenta?<a href="./login"> Inicia sesión</a> 
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
                        title="Información del grupo automotriz"
                        fields={
                            <form className="d-flex flex-column" onSubmit={() => { setActiveSectionIndex(2) }}>
                                <div className="form-outline mb-2">
                                    <div className="d-flex flex-row ">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Nombre del G.A."
                                            value={agencyName}
                                            onChange={(e) => setAgencyName(e.target.value)}
                                            required
                                        />
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="RFC"
                                            value={rfc}
                                            onChange={(e) => setRfc(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
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
                                            type="text"
                                            className="form-control"
                                            placeholder="No. exterior"
                                            value={exterior_num}
                                            onChange={(e) => setExteriorNum(e.target.value)}
                                            required
                                        />
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="No. interior"
                                            value={interior_num}
                                            onChange={(e) => setInteriorNum(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-outline mb-2">
                                    <div className="d-flex flex-row "> 
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Ciudad"
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)}
                                            required
                                        />
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
                                </div>
                                <div className="form-outline mb-2">
                                    <div className="d-flex flex-row ">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Código postal"
                                            value={postalCode}
                                            onChange={(e) => setPC(e.target.value)}
                                            required
                                        />

                                        <input
                                            type="password"
                                            className="form-control"
                                            placeholder="Número telefónico"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-outline mb-2">
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="URL Sitio web"
                                        value={url}
                                        onChange={(e) => setUrl(e.target.value)}
                                        required
                                    />
                                    
                                 </div>
                                <div className="d-flex flex-column text-center pt-1 mb-2 pb-1">
                                    <button className="btn btn-primary btn-block mb-2"  onSubmit={() => setActiveSectionIndex(2)}>
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
                                </div> 
                            </form>
                        }
                    />
                </>
            )}

            {activeSectionIndex === 2 && (
                <>
                    <AuthComponent
                        title="Representante legal"
                        fields={
                            <form className="d-flex flex-column" onSubmit={submitHandler}>
                                <div className="form-outline mb-2">
                                    <div className="d-flex flex-row ">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Nombre(s)"
                                            value={legalName}
                                            pattern="[a-zA-Z0-9À-ÿ\u00f1\u00d1\s]+"
                                            onChange={(e) => setLegalName(e.target.value)}
                                            required
                                        />
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Apellido(s)"
                                            value={legalSurname}
                                            pattern="[a-zA-Z0-9À-ÿ\u00f1\u00d1\s]+"
                                            onChange={(e) => setLegalSurname(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-outline mb-2">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Email"
                                    value={legalEmail}
                                    onChange={(e) => setLegalEmail(e.target.value)}
                                    required
                                /> 
                                </div>
                                <div className="form-outline mb-2">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Teléfono"
                                    value={legalPhone}
                                    onChange={(e) => setLegalPhone(e.target.value)}
                                    required
                                /> 
                                </div>
                                 <div className="d-flex flex-column text-center pt-1 mb-2 pb-1">
                                    <button
                                    className="btn btn-primary btn-block mb-2"
                                    onSubmit={() => setActiveSectionIndex(3)}
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
                        }

                    />
                </>
            )}
        </>
    );
}

