"use client";

import axios from "axios";
import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
} from "@mui/material";

import ManagerLayout from "@/components/providers/manager/layout";

export default function SellerSignup() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [confPasswordHelper, setConfPasswordHelper] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [errors, setErrors] = useState({
    name: false,
    surname: false,
    email: false,
    phone: false,
    password: false,
  });

  const disabled = () => {
    for (let key in errors) {
      if (errors[key] !== "") return true;
    }
    return !(name && surname && email && phone && password && confPassword);
  };
  
  const agency = "647af5ebfb2360082e89094b";

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post("/api/register", {
        nombres: name,
        apellidos: surname,
        email: email,
        password: password,
        tipo_usuario: "seller",
        agencia_id: agency,
        numero_telefonico: phone,
      });
      setError(true);
      setErrMessage("Usuario registrado correctamente");
      setLoading(false);
      console.log(data);
      setTimeout(()=>{window.location.href = `${window.location.origin}/providers/manager/manage_sellers`;}, 2000)
      
    } catch (error) {
      console.log(error.response.data);
      setError(true);
      setErrMessage("Error al registrar usuario");
      setLoading(false);
    }
  };

  return (
    <>
    <ManagerLayout>
      <Container maxWidth="xl"> 
        <div className="section pt-3 p-5">
          <Typography
            fontFamily="Lato"
            color="#1F1F1F"
            fontSize={{ xs: 25, md: 28, lg: 33 }}
            className="pt-2 pb-4"
          >
            Registra un vendedor
          </Typography>
          <Typography
            fontFamily="Lato"
            color="#1F1F1F"
            className="pb-3"
            fontWeight="bold"
            fontSize={{ xs: 16, md: 17, lg: 19 }}
          >
            Datos Personales
          </Typography>
          <form onSubmit={submitHandler}>
            <div className="d-sm-flex justify-content-between mb-4">
              <div className="row">
                <div className="col-xl-6 col-md-8">
                  <Typography
                    fontFamily="Lato"
                    color="#8A8A8A"
                    className="pb-3"
                    fontSize={{ xs: 15, md: 16, lg: 18 }}
                  >
                    Nombre(s)
                  </Typography>
                  <TextField
                    required
                    size="small"
                    type="text"
                    name="name"
                    id="name_field"
                    value={name}
                    pattern="[a-zA-Z]+"
                    onChange={(e) => setName(e.target.value)}
                    label="Nombre(s)"
                    inputProps={{ min: "0", style: { fontFamily: "Lato" } }}
                    InputLabelProps={{ style: { fontFamily: "Lato" } }}
                    className="mb-3 w-100"
                  />
                </div>
                <div className="col-xl-6 col-md-8">
                  <Typography
                    fontFamily="Lato"
                    color="#8A8A8A"
                    className="pb-3"
                    fontSize={{ xs: 15, md: 16, lg: 18 }}
                  >
                    Apellidos
                  </Typography>
                  <TextField
                    required
                    size="small"
                    type="text"
                    name="surname"
                    id="name_field"
                    value={surname}
                    pattern="[a-zA-Z]+"
                    onChange={(e) => setSurname(e.target.value)}
                    label="Apellidos"
                    inputProps={{ min: "0", style: { fontFamily: "Lato" } }}
                    InputLabelProps={{ style: { fontFamily: "Lato" } }}
                    className="mb-3 w-100"
                  />
                </div>
                <div className="col-xl-6 col-md-8">
                  <Typography
                    fontFamily="Lato"
                    color="#8A8A8A"
                    className="pb-3"
                    fontSize={{ xs: 15, md: 16, lg: 18 }}
                  >
                    Correo electrónico
                  </Typography>
                  <TextField
                    required
                    size="small"
                    type="email"
                    name="email"
                    id="email_field"
                    value={email}
                    pattern="[a-zA-Z]+"
                    onChange={(e) => setEmail(e.target.value)}
                    label="Correo electrónico"
                    inputProps={{ min: "0", style: { fontFamily: "Lato" } }}
                    InputLabelProps={{ style: { fontFamily: "Lato" } }}
                    className="mb-3 w-100"
                  />
                </div>
                <div className="col-xl-6 col-md-8">
                  <Typography
                    fontFamily="Lato"
                    color="#8A8A8A"
                    className="pb-3"
                    fontSize={{ xs: 15, md: 16, lg: 18 }}
                  >
                    Celular
                  </Typography>
                  <TextField
                    required
                    size="small"
                    type="text"
                    name="phone_field"
                    id="phone"
                    value={phone}
                    pattern="[a-zA-Z]+"
                    onChange={(e) => setPhone(e.target.value)}
                    label="Celular"
                    inputProps={{ min: "0", style: { fontFamily: "Lato" } }}
                    InputLabelProps={{ style: { fontFamily: "Lato" } }}
                    className="mb-3 w-100"
                  />
                </div>
                <Typography
                  fontFamily="Lato"
                  color="#1F1F1F"
                  className="pt-5 pb-1"
                  fontWeight="bold"
                  fontSize={{ xs: 16, md: 17, lg: 19 }}
                >
                  Contraseña
                </Typography>
                <Typography
                  fontFamily="Lato"
                  color="#8A8A8A"
                  className="pb-3"
                  fontSize={{ xs: 14, md: 15, lg: 16 }}
                >
                  La contraseña debe tener al menos seis caracteres, e incluir una combinación de números, letras y caracteres especiales (!$@%).
                </Typography>
                <div className="col-xl-6 col-md-8">
                  <Typography
                    fontFamily="Lato"
                    color="#8A8A8A"
                    className="pb-3"
                    fontSize={{ xs: 15, md: 16, lg: 18 }}
                  >
                    Contraseña
                  </Typography>
                  <TextField
                    required
                    size="small"
                    type="password"
                    name="paswword_field"
                    id="password"
                    value={password}
                    pattern="[a-zA-Z]+"
                    onChange={(e) => setPassword(e.target.value)}
                    label="Contraseña"
                    inputProps={{ min: "0", style: { fontFamily: "Lato" } }}
                    InputLabelProps={{ style: { fontFamily: "Lato" } }}
                    className="mb-3 w-100"
                  />
                </div>
                <div className="col-xl-6 col-md-8">
                  <Typography
                    fontFamily="Lato"
                    color="#8A8A8A"
                    className="pb-3"
                    fontSize={{ xs: 15, md: 16, lg: 18 }}
                  >
                    Confirmar contraseña
                  </Typography>
                  <TextField
                    required
                    size="small"
                    type="password"
                    name="passwordConfirmation"
                    id="passwordConfirmation"
                    value={confPassword}
                    pattern="[a-zA-Z]+"
                    onChange={(e) => setConfPassword(e.target.value)}
                    label="Confirmar contraseña"
                    inputProps={{ min: "0", style: { fontFamily: "Lato" } }}
                    InputLabelProps={{ style: { fontFamily: "Lato" } }}
                    className="mb-3 w-100"
                  />
                </div>
                <Typography
                  fontFamily="Lato"
                  color="#1F1F1F"
                  className="pt-5 pb-3"
                  fontWeight="bold"
                  fontSize={{ xs: 16, md: 17, lg: 19 }}
                >
                  Datos Administrativos
                </Typography>
                <div className="col-xl-6 col-md-8">
                  <Typography
                    fontFamily="Lato"
                    color="#8A8A8A"
                    className="pb-3"
                    fontSize={{ xs: 15, md: 16, lg: 18 }}
                  >
                    Agencia
                  </Typography>
                  <TextField
                    disabled
                    size="small"
                    type="text"
                    name="agencia"
                    id="agencia"
                    value={agency}
                    pattern="[a-zA-Z]+"
                    onChange={(e) => setAgency(e.target.value)}
                    //label="Nombre de agencia (automático)"
                    inputProps={{ min: "0", style: { fontFamily: "Lato" } }}
                    InputLabelProps={{ style: { fontFamily: "Lato" } }}
                    className="mb-3 w-100"
                  />
                </div>
                <div className="col-xl-6 col-md-8">
                  <Typography
                    fontFamily="Lato"
                    color="#8A8A8A"
                    className="pb-3"
                    fontSize={{ xs: 15, md: 16, lg: 18 }}
                  >
                    Ubicación
                  </Typography>
                  <TextField
                    disabled
                    size="small"
                    type="text"
                    name="location"
                    id="location"
                    //value=""
                    pattern="[a-zA-Z]+"
                    onChange=""
                    label="Ubicación (automático)"
                    inputProps={{ min: "0", style: { fontFamily: "Lato" } }}
                    InputLabelProps={{ style: { fontFamily: "Lato" } }}
                    className="mb-3 w-100"
                  />
                </div>
                <div className="text-center mt-5">
                  <Button
                    variant="contained"
                    type="submit"
                    className="w-50"
                    sx={{
                      fontFamily: "Lato",
                      ":hover": {
                        backgroundColor: "red",
                      },
                    }}
                  >
                    Crear vendedor
                  </Button>
                </div> 
              </div>
            </div>
          </form>
        </div>
      </Container>
    </ManagerLayout>
    </>
  );
}
