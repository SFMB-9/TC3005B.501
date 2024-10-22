/*
Sebastián González Villacorta
05/06/2023
*/

"use client";

import axios from "axios";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";import {TextField} from "@mui/material";
import PhaseIndicator from '@/components/general/phase_indicator';
import GANavbar from '@/components/providers/GA/navbar';
import styles from '@/styles/test_details.module.css';
import mexicanStates from "@/components/general/states";

export default function RegisterForm() {
    const { data: session } = useSession();
    const router = useRouter();

    const [agencyName, setAgencyName] = useState("");
    const [agencyPhone, setAgencyPhone] = useState("");
    const [agencyEmail, setAgencyEmail] = useState("");
    const [url, setUrl] = useState("");
    const [rfc, setRfc] = useState("");
    const [street, setStreet] = useState("");
    const [exterior_num, setExteriorNum] = useState("");
    const [interior_num, setInteriorNum] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("México");
    const [postalCode, setPC] = useState("");

    const fetchGAId = async () => {
        const res = await fetch(`/api/managerProfile/managerP?id=${session.id}`);
        const ga_admin_data = await res.json();
        const ga_id = ga_admin_data.userData.grupo_automotriz_id;
        return ga_id;
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const ga_id = await fetchGAId();
            const result = await axios.post("/api/GA/agency-register", {
                nombre_agencia: agencyName,
                agencyPhone: agencyPhone,
                agencyEmail: agencyEmail,
                url: url,
                rfc: rfc,
                docs: ["Acta constitutiva", "RFC", "Comprobante de domicilio"],
                direccion: {
                    calle: street,
                    numero_exterior: exterior_num,
                    numero_interior: interior_num,
                    ciudad: city,
                    estado: state,
                    pais: country,
                    codigo_postal: postalCode,
                },
                grupo_automotriz_id: ga_id,

            });

            router.push(`/providers/GA/agency_management/registerAgency/${result.data.id}`);
        } catch (error) {
            console.log(error);
        }
    }
    const phases = ['Datos', 'Documentos'];

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
            }}
        >
            <GANavbar />
            <h1 className={styles.request}
            >Solicitud de registro de Agencia</h1>
            <PhaseIndicator phases={phases} currentPhaseIndex={0} />
            <div className="mt-5">
                <h3
                    style={{
                        paddingLeft: "12vw",
                        paddingRight: "12vw",
                    }}
                >Datos generales de la agencia</h3>
                <div className="container"
                    style={{
                        paddingLeft: "8vw",
                        paddingRight: "8vw",
                    }}
                >
                    <div className="row mt-4">
                        <div className="col-12 col-md-6">
                            <TextField
                                required
                                size="small"
                                className="w-100"
                                label="Nombre de la agencia"
                                value={agencyName}
                                onChange={(e) => setAgencyName(e.target.value)}
                                style={{ marginBottom: "0.8rem" }}
                            />
                        </div>
                        <div className="col-12 col-md-6">
                            <TextField
                                required
                                size="small"
                                className="w-100"
                                label="URL de la agencia"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                style={{ marginBottom: "0.8rem" }}
                            />
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-12 col-md-4">
                            <TextField
                                required
                                size="small"
                                className="w-100"
                                label="Teléfono de la agencia"
                                value={agencyPhone}
                                onChange={(e) => setAgencyPhone(e.target.value)}
                                style={{ marginBottom: "0.8rem" }}
                            />
                        </div>
                        <div className="col-12 col-md-4">
                            <TextField
                                required
                                size="small"
                                className="w-100"
                                label="RFC de la agencia"
                                value={rfc}
                                onChange={(e) => setRfc(e.target.value)}
                                style={{ marginBottom: "0.8rem" }}
                            />
                        </div>
                        <div className="col-12 col-md-4">
                            <TextField
                                required
                                size="small"
                                className="w-100"
                                label="Email de la agencia"
                                value={agencyEmail}
                                onChange={(e) => setAgencyEmail(e.target.value)}
                                style={{ marginBottom: "0.8rem" }}
                            />
                        </div>
                    </div>
                </div>
                <h3
                    style={{
                        paddingLeft: "12vw",
                        paddingRight: "12vw",
                        marginTop: "3rem"
                    }}
                >Dirección de la agencia</h3>
                <div className="container"
                    style={{
                        paddingLeft: "8vw",
                        paddingRight: "8vw",
                    }}
                >
                    <div className="row mt-4">
                        <div className="col-12 col-md-6">
                            <TextField
                                required
                                size="small"
                                className="w-100"
                                label="Calle"
                                value={street}
                                onChange={(e) => setStreet(e.target.value)}
                                style={{ marginBottom: "0.8rem" }}
                            />
                        </div>
                        <div className="col-12 col-md-3">
                            <TextField
                                required
                                size="small"
                                className="w-100"
                                label="Número exterior"
                                value={exterior_num}
                                onChange={(e) => setExteriorNum(e.target.value)}
                                style={{ marginBottom: "0.8rem" }}
                            />
                        </div>
                        <div className="col-12 col-md-3">
                            <TextField
                                required
                                size="small"
                                className="w-100"
                                label="Número interior"
                                value={interior_num}
                                onChange={(e) => setInteriorNum(e.target.value)}
                                style={{ marginBottom: "0.8rem" }}
                            />
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-12 col-md-4">
                            <TextField
                                required
                                size="small"
                                className="w-100"
                                label="Ciudad"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                style={{ marginBottom: "0.8rem" }}
                            />
                        </div>
                        <div className="col-12 col-md-4">
                        <select
                                    required
                                    className="form-control"
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                    id={styles.dropdownStates}
                                    >
                                    <option style={{color:"#6C757D"}} value="" selected="Elegir estado">Elegir estado</option>
                                    {mexicanStates.map((stateObj, index) => (
                                        <option style={{color:"black"}} key={index} value={stateObj.name}>
                                        {stateObj.name}
                                        </option>
                                    ))}
                                </select>
                            {/* <TextField
                                required
                                size="small"
                                className="w-100"
                                label="Estado"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                style={{ marginBottom: "0.8rem" }}
                            /> */}
                        </div>
                        <div className="col-12 col-md-2">
                            <TextField
                                required
                                disabled
                                size="small"
                                className="w-100"
                                label="País"
                                value={country}
                                inputProps={{ readOnly: true }}
                                onChange={(e) => setCountry(e.target.value)}
                                style={{ marginBottom: "0.8rem" }}
                            />
                        </div>
                        <div className="col-12 col-md-2">
                            <TextField
                                required
                                size="small"
                                className="w-100"
                                label="Código postal"
                                value={postalCode}
                                onChange={(e) => setPC(e.target.value)}
                                style={{ marginBottom: "0.8rem" }}
                            />
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-12 col-md-6">
                        </div>
                        <div className="col-12 col-md-3">
                            <button
                                style={{
                                    flex: '25%',
                                    backgroundColor: 'gray',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '6px',
                                    width: '100%',
                                    padding: '0.5rem 1rem',
                                }}
                                onClick={() => {
                                    router.push(`/providers/GA/agency_management`)
                                }}
                            >
                                Cancelar
                            </button>
                        </div>
                        <div className="col-12 col-md-3">
                            <button 
                                onClick={submitHandler}
                                style={{
                                    flex: '25%',
                                    backgroundColor: '#F55C7A',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '6px',
                                    width: '100%',
                                    padding: '0.5rem 1rem',
                                }}
                            >
                                Continuar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}