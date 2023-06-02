import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import PopUpComponent from "@/components/general/Popup"
import EditAccount from "../../components/buyer/editData"
import { signOut } from "next-auth/react";
import axios from "axios";

import {
  Container,
  Typography,
  Button,
} from "@mui/material";

import AccountLayout from "@/components/buyer/account_layout";

export default function Account() {
  const [apiData, setApiData] = useState(null);
  const { data: session } = useSession();

  const fetchData = async () => {
    const resData = await fetch(
      `/api/managerProfile/managerP?id=${session.id}`
    );

    const res = await resData.json();

    setApiData(res.userData);
  };

  const deleteAccount = async (e) => {
    e.preventDefault();

    try{
      axios.delete("../api/buyerProfile/deleteUser", {
        params: {
          id: session.id,
        }
      });
      signOut({ callbackUrl: "/auth/login" })
    } catch (error) {
      console.log(error);
      console.log(error.response.data);

    }
  };

  useEffect(() => {
    if (session) {
      fetchData();
    }
  }, [session]);

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
                    {apiData.direccion.calle}
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
                    {apiData.direccion.numero_exterior} ext. {apiData.direccion.numero_interior} int.
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
                    {apiData.direccion.codigo_postal}
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
                    {apiData.direccion.ciudad}
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
                    {apiData.direccion.estado}
                  </Typography>
                </div>
                <div className="col-xl-6 col-md-6">
                  <Typography
                    fontFamily="Lato"
                    color="#8A8A8A"
                    className="pb-3"
                    fontSize={{ xs: 15, md: 16, lg: 18 }}
                  >
                    País
                  </Typography>
                  <Typography
                    fontFamily="Lato"
                    color="#1F1F1F"
                    className="mb-3 w-100"
                    fontSize={{ xs: 13, md: 14, lg: 16 }}
                  >
                    {apiData.direccion.pais}
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
                <div className=" align-self-center col-xl-6 col-md-6">
                  <PopUpComponent
                    title = "Eliminar cuenta"
                    popUpContent = {
                    <div className="text-center mt-3"> <p> ¿Estas segurx que quieres eliminar tu cuenta? </p>
                    <p> Al hacer click en "Confirmar" estas confirmando de forma definitiva que quieres eliminar tu cuenta. </p> 
                      <Button
                        variant="contained"
                        onClick={deleteAccount}
                        type="submit"
                        className="w-80"
                        sx={{
                          fontFamily: "Lato",
                          color: '#626262',
                          backgroundColor: "#D9D9D9",
                          "&:hover": {
                            backgroundColor: "#F55C7A",
                            color: "#fff",
                          }
                        }}
                        >
                        Eliminar Cuenta
                      </Button>
                    </div>}
                    btnOpen = {
                      <div className="text-center">
                        <Button
                          variant="contained"
                          type="submit"
                          className="w-80"
                          sx={{
                            border: "none",
                            fontFamily: "Lato",
                            color: '#626262',
                            backgroundColor: "#D9D9D9",
                            "&:hover": {
                              backgroundColor: "#b3b3b3",
                              color: "#fff",
                            }
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