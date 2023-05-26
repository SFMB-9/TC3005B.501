"use client";

import axios from "axios";
import React, { useState } from "react";
import AuthComponent from "@/components/login/auth_component";

/* Función que retorna el formulario de registro de GA con su dirección, junto con los botones de ingreso  */
export default function SignupBuyerData() {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [url, setUrl] = useState("");
    const [rfc, setRfc] = useState("");

    const [agencyName, setAgencyName] = useState("");

    const [street, setStreet] = useState("");
    const [exterior_num, setExteriorNum] = useState("");
    const [interior_num, setInteriorNum] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [postalCode, setPC] = useState("");
    

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post("/api/GA/GA-register", {
                tipo_agencia: 'GA',
                tipo_usuario: 'GAdmin',
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
            });
            console.log(data);
            window.location.href = "/auth/login";
        } 
        catch (error) {
            console.log(error.response.data);
        }
    };

    return (
        <div>  
            
        </div>
    );
}