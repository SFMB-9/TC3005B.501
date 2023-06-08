"use client";

import axios from "axios";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import AuthComponent from "@/components/login/auth_component";
import { useSession } from "next-auth/react";

export default function registerForm() {
    const { data: session } = useSession();
    const router = useRouter();

    const [GAName, setGAName] = useState("");
    const [url, setUrl] = useState("");
    const [rfc, setRfc] = useState("");
    const [GAphone, setGAPhone] = useState("");
    const [street, setStreet] = useState("");
    const [exterior_num, setExteriorNum] = useState("");
    const [interior_num, setInteriorNum] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [postalCode, setPC] = useState("");
    const [GAemail, setGAEmail] = useState("");
    
    const [legalName, setLegalName] = useState("");
    const [legalSurname, setLegalSurname] = useState("");
    const [legalEmail, setLegalEmail] = useState("");
    const [legalPhone, setLegalPhone] = useState("");

    const [first, setFirst] = useState(true);
    const [second, setSecond] = useState(false);

    useEffect(() => {
    }, [first, second]);

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const result = await axios.post("/api/GA/GA-register", {
                nombre_agencia: GAName,
                GAPhone: GAphone,
                GAemail: GAemail,
                url: url,
                rfc: rfc,
                docs: ["Acta constitutiva", "RFC", "Comprobante de domicilio"],
                admin: session.id,

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

            console.log(result)

            router.push(`/providers/GA/registerGroup/${result.data.id}`);
        } 
        catch (error) {
            console.log(error);
        }
    };

    const firstSection = () => {
        setFirst(true);
        setSecond(false);
    };

    const secondSection = () => {
        setFirst(false);
        setSecond(true);
    };

    return(
        <div 
            className="container align-self-center"
            // style={{
            //     display: "flex",
            //     flexDirection: "column",
            //     justifyContent: "center",
            //     alignItems: "center", 
            // }}
        >
            {first && <div 
                style={{
                    padding: "2rem"
                }}
                className="d-flex flex-column justify-content-center"
                >
                <div className="d-flex flex-row">
                <h1
                    // style={{
                    //     marginBottom: "1.2rem"
                    // }}
                >Registro de GA</h1>
                </div>
                <div className="row">
                    <div className="col-xl-6 col-md-12">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nombre del GA"
                        value={GAName}
                        onChange={(e) => setGAName(e.target.value)}
                        required
                        style={{
                            marginBottom: "0.8rem"
                        }}
                    />
                    </div>
                    <div className="col-xl-6 col-md-12">
                    <input
                    type="text"
                    className="form-control"
                    placeholder="RFC"
                    value={rfc}
                    onChange={(e) => setRfc(e.target.value)}
                    required
                    style={{
                        marginBottom: "0.8rem"
                    }}
                />
                </div>
                </div>
                
                <div className="row">
                    <div className="col-xl-4 col-md-12">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Calle"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    required
                    style={{
                        marginBottom: "0.8rem"
                    }}
                />
                </div>
                <div className="col-xl-4 col-md-12">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Numero exterior"
                    value={exterior_num}
                    onChange={(e) => setExteriorNum(e.target.value)}
                    required
                    style={{
                        marginBottom: "0.8rem"
                    }}
                />
                </div>
                <div className="col-xl-4 col-md-12">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Numero interior"
                    value={interior_num}
                    onChange={(e) => setInteriorNum(e.target.value)}
                    required
                    style={{
                        marginBottom: "0.8rem"
                    }}
                />
                </div>
                </div>
                <div className="row">
                    <div className="col-xl-4 col-md-12">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Ciudad"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    style={{
                        marginBottom: "0.8rem"
                    }}
                />
                </div>
                <div className="col-xl-4 col-md-12">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Estado"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                    style={{
                        marginBottom: "0.8rem"
                    }}
                />
                </div>
                <div className="col-xl-4 col-md-12">
                <input
                    type="text"
                    className="form-control"
                    placeholder="País"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                    style={{
                        marginBottom: "0.8rem"
                    }}
                />
                </div>
                </div>
                <div className="row">
                    <div className="col-xl-6 col-md-12">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Código postal"
                    value={postalCode}
                    onChange={(e) => setPC(e.target.value)}
                    required
                    style={{
                        marginBottom: "0.8rem"
                    }}
                />
                </div>
                <div className="col-xl-6 col-md-12">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Número telefónico"
                    value={GAphone}
                    onChange={(e) => setGAPhone(e.target.value)}
                    required
                    style={{
                        marginBottom: "0.8rem"
                    }}
                />     
                </div>           
                </div>
                <div className="row">
                    <div className="col-xl-6 col-md-12">
                <input
                    type="text"
                    className="form-control"
                    placeholder="URL Sitio web"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                    style={{
                        marginBottom: "0.8rem"
                    }}
                />
                </div>
                <div className="col-xl-6 col-md-12">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Email de Contacto del GA"
                    value={GAemail}
                    onChange={(e) => setGAEmail(e.target.value)}
                    required
                    style={{
                        marginBottom: "0.8rem"
                    }}
                />
                </div>
                </div>
                <div className="row">
                <button 
                    style={{
                        marginBottom: "2rem"
                    }}
                    onClick={secondSection}>
                    Siguiente
                </button>
                </div>
            </div>}

            {second && <div>
                <h1>Registro de GA Legal</h1>
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

                <button onClick={firstSection}>
                    Atrás
                </button>

                <button onClick={submitHandler}>
                    Confirmar
                </button>
            </div>}
        </div>
    )
}