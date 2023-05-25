import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import MyComponent from "@/components/general/Popup"
import EditAccount from "./edit_data"
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

import AccountLayout from "@/components/buyer/account_layout";

function EditProfileBtn() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/account/edit_data');
  };

  return (
    <button 
      onClick={handleClick}
      style={{
        backgroundColor:"none",
        border:"none"
      }}
      >
      <Button
        variant="contained"
        type="submit"
        className="w-80"
        sx={{
          fontFamily: "Lato",
          ":hover": {
            backgroundColor: "#333333",
          },
        }}
        >
        Editar cuenta
      </Button>
    </button>
  );
}

export default function Account() {
  const [apiData, setApiData] = useState(null);
  const { data: session } = useSession();
  const [editMode, setEditMode] = useState(false);

  const fetchData = async () => {
    const resData = await fetch(
      `http://localhost:3000/api/managerProfile/managerP?id=${session.id}`
    );

    const res = await resData.json();

    setApiData(res.userData);
  };

  console.log("session", editMode);
  // const handleEditMode = () => {
  //   setEditMode((prevEditMode) => {
  //     const newEditMode = !prevEditMode;
  //     console.log("editMode", newEditMode);
  //     return newEditMode;
  //   });
  //   // setEditMode((prevEditMode) => !prevEditMode);
  //   // console.log("editMode", editMode);
  // };

  useEffect(() => {
    if (session) {
      fetchData();
    }
  }, [session]);

  console.log("apiData", apiData);

  if (apiData) {
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
                    {apiData.name}
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
                    {apiData.surname}
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
                    55 5555 5555 (p)
                  </Typography>

                </div>
              </div>
              <Typography
                fontFamily="Lato"
                color="#1F1F1F"
                className="pb-3"
                fontWeight="bold"
                fontSize={{ xs: 16, md: 17, lg: 19 }}
                sx={{ marginTop: "2rem" }}
              >
                Dirección
              </Typography>
              <div className="row">
                <div className="col-xl-6 col-md-6">
                  <Typography
                    fontFamily="Lato"
                    color="#8A8A8A"
                    className="pb-3"
                    fontSize={{ xs: 15, md: 16, lg: 18 }}
                  >
                    Calle
                  </Typography>
                  <Typography
                    fontFamily="Lato"
                    color="#1F1F1F"
                    className="mb-3 w-100"
                    fontSize={{ xs: 13, md: 14, lg: 16 }}
                  >
                    Carlos Lazo (p)
                  </Typography>
                </div>
                <div className="col-xl-6 col-md-6">
                  <Typography
                    fontFamily="Lato"
                    color="#8A8A8A"
                    className="pb-3"
                    fontSize={{ xs: 15, md: 16, lg: 18 }}
                  >
                    Número
                  </Typography>
                  <Typography
                    fontFamily="Lato"
                    color="#1F1F1F"
                    className="mb-3 w-100"
                    fontSize={{ xs: 13, md: 14, lg: 16 }}
                  >
                    137 (p)
                  </Typography>
                </div>
                <div className="col-xl-6 col-md-6">
                  <Typography
                    fontFamily="Lato"
                    color="#8A8A8A"
                    className="pb-3"
                    fontSize={{ xs: 15, md: 16, lg: 18 }}
                  >
                    Código postal
                  </Typography>
                  <Typography
                    fontFamily="Lato"
                    color="#1F1F1F"
                    className="mb-3 w-100"
                    fontSize={{ xs: 13, md: 14, lg: 16 }}
                  >
                    14450 (p)
                  </Typography>
                </div>
                <div className="col-xl-6 col-md-6">
                  <Typography
                    fontFamily="Lato"
                    color="#8A8A8A"
                    className="pb-3"
                    fontSize={{ xs: 15, md: 16, lg: 18 }}
                  >
                    Colonia
                  </Typography>
                  <Typography
                    fontFamily="Lato"
                    color="#1F1F1F"
                    className="mb-3 w-100"
                    fontSize={{ xs: 13, md: 14, lg: 16 }}
                  >
                    Colonial (p)
                  </Typography>
                </div>
                <div className="col-xl-6 col-md-6">
                  <Typography
                    fontFamily="Lato"
                    color="#8A8A8A"
                    className="pb-3"
                    fontSize={{ xs: 15, md: 16, lg: 18 }}
                  >
                    Ciudad
                  </Typography>
                  <Typography
                    fontFamily="Lato"
                    color="#1F1F1F"
                    className="mb-3 w-100"
                    fontSize={{ xs: 13, md: 14, lg: 16 }}
                  >
                    Ciudad de México (p)
                  </Typography>
                </div>
                <div className="col-xl-6 col-md-6">
                  <Typography
                    fontFamily="Lato"
                    color="#8A8A8A"
                    className="pb-3"
                    fontSize={{ xs: 15, md: 16, lg: 18 }}
                  >
                    Estado
                  </Typography>
                  <Typography
                    fontFamily="Lato"
                    color="#1F1F1F"
                    className="mb-3 w-100"
                    fontSize={{ xs: 13, md: 14, lg: 16 }}
                  >
                    Estado de México (p)
                  </Typography>
                </div>
              </div>
              <div className="row mt-3">
                <div className="align-self-center col-xl-6 col-md-6">
                  {/* <MyComponent
                      title = "Editar datos"
                      popUpContent = {<EditAccount/>}
                      btnOpen = {
                        <button
                        // onClick={handleEditMode}
                        style={{
                          backgroundColor: '#F55C7A',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          height: '100%',
                          padding: '0.1rem 1rem',
                          marginTop: '1rem'
                        }}
                      > Editar datos </button>
                    } 
                  /> */}
                  {/* <Button
                    variant="contained"
                    type="submit"
                    className="w-80"
                    sx={{
                      fontFamily: "Lato",
                      ":hover": {
                        backgroundColor: "#333333",
                      },
                    }}
                    >
                    Editar cuenta
                  </Button> */}
                  <EditProfileBtn/>
                  
                  
                </div>
                <div className=" align-self-center col-xl-6 col-md-6">
                  <MyComponent
                    title = "Eliminar cuenta"
                    popUpContent = {
                    <div className="text-center mt-3"> <p> ¿Estas segurx que quieres eliminar tu cuenta? </p>
                    <p> Al hacer click en "Confirmar" estas confirmando de forma definitiva que quieres eliminar tu cuenta. </p> 
                      <Button
                        variant="contained"
                        type="submit"
                        className="w-80"
                        sx={{
                          fontFamily: "Lato",
                          ":hover": {
                            backgroundColor: "red",
                          },
                        }}
                        >
                        Eliminar cuenta
                      </Button>
                    </div>}
                    btnOpen = {
                      <div className="text-center">
                        <Button
                          variant="contained"
                          type="submit"
                          className="w-80"
                          sx={{
                            fontFamily: "Lato",
                            ":hover": {
                              backgroundColor: "red",
                            },
                          }}
                        >
                          Eliminar cuenta
                        </Button>
                      </div>} 
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