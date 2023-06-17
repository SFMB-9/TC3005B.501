import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import axios from "axios";
import LoadingScreen from "@/components/general/LoadingScreen";

import {
    Container,
    Typography,
    Button,
  } from "@mui/material";
  
  
import PopUpComponent from "@/components/general/Popup"
import ManagerNavbar from "@/components/providers/Manager/navbar";

export default function Profile() {
    const [apiData, setApiData] = useState(null);
    const { data: session } = useSession();
  
    const fetchData = async () => {
      const resData = await fetch(
        `/api/managerProfile/managerP?id=${session.id}`
      );
  
      const res = await resData.json();
  
      setApiData(res.userData);
    };

    useEffect(() => {
        if (session) {
          fetchData();
        }
      }, [session]);
    
    if (apiData && session) {
        return (
        <>
            <ManagerNavbar/>
            <Container maxWidth="xl">
                <div className="section p-5">
                    <Typography
                    fontFamily="Raleway"
                    color="#1F1F1F"
                    fontSize={{ xs: 25, md: 28, lg: 33 }}
                    className="pt-2 pb-4"
                    >
                    Mi cuenta
                    </Typography>
                    <div>
                    <Typography
                        fontFamily="Lato"
                        color="#1F1F1F"
                        className="pb-3"
                        fontWeight="bold"
                        fontSize={{ xs: 16, md: 17, lg: 19 }}
                    >
                        Datos personales
                    </Typography>
                    <div className="row">
                        <div className="col-xl-6 col-md-6">
                        <Typography
                            fontFamily="Lato"
                            color="#8A8A8A"
                            className="pb-3"
                            fontSize={{ xs: 14, md: 15, lg: 17 }}
                        >
                            Nombre(s)
                        </Typography>
                        <Typography
                            fontFamily="Lato"
                            color="#1F1F1F"
                            className="mb-3 w-100"
                            fontSize={{ xs: 13, md: 14, lg: 16 }}
                        >
                            {apiData.nombres}
                        </Typography>
                    </div>
                    <div className="col-xl-6 col-md-6">
                        <Typography
                            fontFamily="Lato"
                            color="#8A8A8A"
                            className="pb-3"
                            fontSize={{ xs: 14, md: 15, lg: 17 }}
                        >
                            Apellido(s)
                        </Typography>
                        <Typography
                            fontFamily="Lato"
                            color="#1F1F1F"
                            className="mb-3 w-100"
                            fontSize={{ xs: 13, md: 14, lg: 16 }}
                        >
                            {apiData.apellidos}
                        </Typography>
                    </div>
                    <div className="col-xl-6 col-md-6">
                        <Typography
                            fontFamily="Lato"
                            color="#8A8A8A"
                            className="pb-3"
                            fontSize={{ xs: 14, md: 15, lg: 17 }}
                        >
                            Correo electrónico
                        </Typography>
                        <Typography
                            fontFamily="Lato"
                            color="#1F1F1F"
                            className="mb-3 w-100"
                            fontSize={{ xs: 13, md: 14, lg: 16 }}
                        >
                            {apiData.email}
                        </Typography>
                    </div>
                    <div className="col-xl-6 col-md-6">
                        <Typography
                            fontFamily="Lato"
                            color="#8A8A8A"
                            className="pb-3"
                            fontSize={{ xs: 15, md: 16, lg: 18 }}
                        >
                            Teléfono
                        </Typography>
                        <Typography
                            fontFamily="Lato"
                            color="#1F1F1F"
                            className="mb-3 w-100"
                            fontSize={{ xs: 13, md: 14, lg: 16 }}
                        >
                            {apiData.numero_telefonico}
                        </Typography>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="align-self-center col-xl-6 col-md-6">
                    </div>
                    <div className=" align-self-center col-xl-6 col-md-6">
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          </>
        )
      }
    else {
        return (
            <div>
            <LoadingScreen/>
            </div>
        )
    }
}