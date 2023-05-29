"use client";

import axios from "axios";
import React, { useState, useEffect } from "react";
import AuthComponent from "@/components/login/auth_component";
import "bootstrap/dist/css/bootstrap.min.css";
import Typography from "@mui/material/Typography";

/* Función que retorna el formulario de registro de GA con su dirección, junto con los botones de ingreso  */
export default function SignupBuyerData() {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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

    const [activeSectionIndex, setActiveSectionIndex] = useState(0);

    const [first, setFirst] = useState(true);
    const [second, setSecond] = useState(false);
    const [third, setThird] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post("/api/GA/GA-register", {
                tipo_usuario: 'GA',
                tipo_entidad: 'GAEntity',
                nombre_agencia: agencyName,
                nombres: name,
                last_name: surname,
                email: email,
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
            console.log(data);
            window.location.href = "/auth/login";
        } 
        catch (error) {
            console.log(error.response.data);
        }
    };
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
                                </div>
                                <div className="text-center">
                                    <p>
                                        ¿Ya tienes una cuenta?<a href="#!"> Regístrate aquí</a> 
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
                        title="Información del grupo"
                        fields={
                            <form className="d-flex flex-column" onSubmit={submitHandler}>
                                <div className="form-outline mb-2">
                                    <div className="d-flex flex-row ">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Nombre del GA"
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
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Calle"
                                            value={street}
                                            onChange={(e) => setStreet(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-outline mb-2">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Numero interior"
                                        value={interior_num}
                                        onChange={(e) => setInteriorNum(e.target.value)}
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
                                    <button className="btn btn-primary btn-block mb-2" onSubmit={() => setActiveSectionIndex(2)}>
                                        <Typography
                                            wrap sx={{ color: "white", fontFamily: "lato" }}>
                                            {" "}
                                            Crear Cuenta{" "}
                                        </Typography>
                                    </button>
                                    <button type="submit" className="btn btn-secondary btn-block mb-2">
                                        <Typography
                                            sx={{ color: "white", fontFamily: "lato" }}>
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
/*
    useEffect(() => {
    }, [first, second, third]);

    const firstSection = () => {
        setFirst(true);
        setSecond(false);
        setThird(false);
    };

    const secondSection = () => {
        setFirst(false);
        setSecond(true);
        setThird(false);
    };

    const thirdSection = () => {
        setFirst(false);
        setSecond(false);
        setThird(true);
    };
*/


    /*
    return (
        
        <div> 
            {first && <div>
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
                    placeholder="Apellido(s)"
                    value={surname}
                    pattern="[a-zA-Z0-9À-ÿ\u00f1\u00d1\s]+"
                    onChange={(e) => setSurname(e.target.value)}
                    required
                />

                <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    className="form-control"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <input
                    type="password"
                    className="form-control"
                    placeholder="Confirmar contraseña"
                    required
                />

                <button onClick={secondSection}>
                    Siguiente
                </button>
            </div>}

            {second && <div>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Nombre del GA"
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
                    placeholder="Numero exterior"
                    value={exterior_num}
                    onChange={(e) => setExteriorNum(e.target.value)}
                    required
                />

                <input
                    type="text"
                    className="form-control"
                    placeholder="Numero interior"
                    value={interior_num}
                    onChange={(e) => setInteriorNum(e.target.value)}
                    required
                />

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

                <input
                    type="password"
                    className="form-control"
                    placeholder="URL Sitio web"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                />

                <button onClick={firstSection}>
                    Atrás
                </button>

                <button onClick={thirdSection}>
                    Siguiente
                </button>
            </div>}

            {third && <div><input
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

                <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    value={legalEmail}
                    onChange={(e) => setLegalEmail(e.target.value)}
                    required
                />

                <input
                    type="text"
                    className="form-control"
                    placeholder="Teléfono"
                    value={legalPhone}
                    onChange={(e) => setLegalPhone(e.target.value)}
                    required
                />

                <button onClick={secondSection}>
                    Atrás
                </button>

                <button onClick={submitHandler}>
                    Confirmar
                </button>
            </div>}
        </div>
    );*/
}
