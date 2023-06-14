import React, { useState, useEffect } from "react";
import PopUpComponent from "@/components/general/Popup"
import { useSession } from "next-auth/react";
import { useRouter } from 'next/router';
import {
  Container,
  Typography,
  TextField,
  Switch,
  Select,
  MenuItem,
  IconButton,
  Button,
  Grid,
} from "@mui/material";
import EditAccount from "../../../components/providers/editData"

import AccountLayout from "@/components/providers/GA/ga_layout";
import GANavbar from '@/components/providers/GA/navbar';

function CancelBtn() {
    const router = useRouter();
  
    const handleClick = () => {
      router.push('/account');
    };
  
    return (
      <button
        onClick={handleClick}
        className="w-80"
        style={{
          backgroundColor: '#D9D9D9',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          height: '2.5vw',
          padding: '0.1rem 1rem',
          marginTop: '1rem'
        }}
      > Cancelar </button>
    );
  }
  
  export default function Account() {
    const [apiData, setApiData] = useState(null);
    const { data: session } = useSession();
    const [editMode, setEditMode] = useState(false);
  
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
  
    console.log("apiData", apiData);
  
    if (apiData && session) {
        return (
          <AccountLayout>
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
                       <PopUpComponent
                          title = "Editar datos"
                          popUpContent = {<EditAccount data={apiData}/>}
                          btnOpen = {
                            <Button
                            variant="contained"
                            type="submit"
                            className="w-80"
                            sx={{
                              fontFamily: "Lato",
                              ":hover": {
                                backgroundColor: "#333333",
                              },
                              border: 'none',
                            }}
                            >
                            Editar datos
                          </Button>
                        }
                        btnClose = {
                          <Button
                            variant="contained"
                            type="submit"
                            className="w-80"
                            sx={{
                              marginTop: "-6.7vw",
                              marginLeft: "2.8vw",
                              fontFamily: "Lato",
                              color: '#626262',
                              backgroundColor: "#D9D9D9",
                              "&:hover": {
                                backgroundColor: "#b3b3b3",
                                color: "#fff",
                              }
                            }}
                            >
                            Cancelar
                          </Button>
    
                          } 
                      /> 
                    </div>
                </div>
                
              </div>
              </div>
            </Container>
          </AccountLayout>
        )
      }
      else {
        return (
          <div
          >
            Cargando...
          </div>
        )
    }
}
