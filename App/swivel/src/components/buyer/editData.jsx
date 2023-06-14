import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import mexicanStates from "@/components/general/states";
import styles from '@/styles/signup.module.css';

import {
  Container,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import LoadingScreen from "@/components/general/LoadingScreen";

export default function EditAccount(props) {
  const { data: session } = useSession();

  const [newName, setNewName] = useState(props.data.nombres);
  const [newSurname, setNewSurname] = useState(props.data.apellidos);
  const [newEmail, setNewEmail] = useState(props.data.email);
  const [newPhone, setNewPhone] = useState(props.data.numero_telefonico);

  const [newStreet, setNewStreet] = useState(props.data.direccion.calle);
  const [newExtNum, setNewExtNum] = useState(props.data.direccion.numero_exterior);
  const [newIntNum, setNewIntNum] = useState(props.data.direccion.numero_interior);
  const [newCity, setNewCity] = useState(props.data.direccion.ciudad);
  const [newState, setNewState] = useState(props.data.direccion.estado);
  const [newCountry, setNewCountry] = useState(props.data.direccion.pais);
  const [newZip, setNewZip] = useState(props.data.direccion.codigo_postal);


  const editProfile = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.put("/api/buyerProfile/updateBuyerProfile", {
        id: session.id,
        nombres: newName,
        apellidos: newSurname,
        email: newEmail,
        numero_telefonico: newPhone,

        direccion: {
          calle: newStreet,
          numero_exterior: newExtNum,
          numero_interior: newIntNum,
          ciudad: newCity,
          estado: newState,
          pais: newCountry,
          codigo_postal: newZip,
        }

      });
      window.location.href = "/account";

    } catch (error) {
      console.log(error);
      //console.log(error.response.data);

    }

  };


  if (props.data) {
    return (
      <Container maxWidth="xl">
        <div className="section p-3">

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
              <div className="col-xl-6 col-md-12">
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
                  name="nombre"
                  id="nombre"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  label="Nombre(s)"
                  inputProps={{ min: "0", style: { fontFamily: "Lato" } }}
                  InputLabelProps={{ style: { fontFamily: "Lato" } }}
                  className="mb-3 w-100"
                />
              </div>
              <div className="col-xl-6 col-md-12">
                <Typography
                  fontFamily="Lato"
                  color="#8A8A8A"
                  className="pb-3"
                  fontSize={{ xs: 15, md: 16, lg: 18 }}
                >
                  Apellido(s)
                </Typography>
                <TextField
                  required
                  size="small"
                  type="text"
                  name="apellidos"
                  id="apellidos"
                  value={newSurname}
                  onChange={(e) => setNewSurname(e.target.value)}
                  label="Apellido(s)"
                  inputProps={{ min: "0", style: { fontFamily: "Lato" } }}
                  InputLabelProps={{ style: { fontFamily: "Lato" } }}
                  className="mb-3 w-100"
                />
              </div>
              <div className="col-xl-6 col-md-12">
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
                  type="text"
                  name="mail"
                  id="mail"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  label="Correo electrónico"
                  inputProps={{ min: "0", style: { fontFamily: "Lato" } }}
                  InputLabelProps={{ style: { fontFamily: "Lato" } }}
                  className="mb-3 w-100"
                />
              </div>
              <div className="col-xl-6 col-md-12">
                <Typography
                  fontFamily="Lato"
                  color="#8A8A8A"
                  className="pb-3"
                  fontSize={{ xs: 15, md: 16, lg: 18 }}
                >
                  Teléfono
                </Typography>

                <TextField
                  required
                  size="small"
                  type="text"
                  name="telefono"
                  id="telefono"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  label="Teléfono"
                  inputProps={{ min: "0", style: { fontFamily: "Lato" } }}
                  InputLabelProps={{ style: { fontFamily: "Lato" } }}
                  className="mb-3 w-100"
                />
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
              <div className="col-xl-6 col-md-12">
                <Typography
                  fontFamily="Lato"
                  color="#8A8A8A"
                  className="pb-3"
                  fontSize={{ xs: 15, md: 16, lg: 18 }}
                >
                  Calle
                </Typography>

                <TextField
                  required
                  size="small"
                  type="text"
                  name="calle"
                  id="calle"
                  value={newStreet}
                  onChange={(e) => setNewStreet(e.target.value)}
                  label="Calle"
                  inputProps={{ min: "0", style: { fontFamily: "Lato" } }}
                  InputLabelProps={{ style: { fontFamily: "Lato" } }}
                  className="mb-3 w-100"
                />
              </div>
              <div className="col-xl-6 col-md-12">
                <Typography
                  fontFamily="Lato"
                  color="#8A8A8A"
                  className="pb-3"
                  fontSize={{ xs: 15, md: 16, lg: 18 }}
                >
                  Número Exterior
                </Typography>

                <TextField
                  required
                  size="small"
                  type="text"
                  name="numero ext"
                  id="numero"
                  value={newExtNum}
                  onChange={(e) => setNewExtNum(e.target.value)}
                  label="Número"
                  inputProps={{ min: "0", style: { fontFamily: "Lato" } }}
                  InputLabelProps={{ style: { fontFamily: "Lato" } }}
                  className="mb-3 w-100"
                />
              </div>
              <div className="col-xl-6 col-md-12">
                <Typography
                  fontFamily="Lato"
                  color="#8A8A8A"
                  className="pb-3"
                  fontSize={{ xs: 15, md: 16, lg: 18 }}
                >
                  Número Interior
                </Typography>

                <TextField
                  required
                  size="small"
                  type="text"
                  name="numero int"
                  id="numero"
                  value={newIntNum}
                  onChange={(e) => setNewIntNum(e.target.value)}
                  label="Número"
                  inputProps={{ min: "0", style: { fontFamily: "Lato" } }}
                  InputLabelProps={{ style: { fontFamily: "Lato" } }}
                  className="mb-3 w-100"
                />
              </div>
              <div className="col-xl-6 col-md-12">
                <Typography
                  fontFamily="Lato"
                  color="#8A8A8A"
                  className="pb-3"
                  fontSize={{ xs: 15, md: 16, lg: 18 }}
                >
                  Código postal
                </Typography>

                <TextField
                  required
                  size="small"
                  type="text"
                  name="cp"
                  id="cp"
                  value={newZip}
                  onChange={(e) => setNewZip(e.target.value)}
                  label="Código postal"
                  inputProps={{ min: "0", style: { fontFamily: "Lato" } }}
                  InputLabelProps={{ style: { fontFamily: "Lato" } }}
                  className="mb-3 w-100"
                />
              </div>
              <div className="col-xl-6 col-md-12">
                <Typography
                  fontFamily="Lato"
                  color="#8A8A8A"
                  className="pb-3"
                  fontSize={{ xs: 15, md: 16, lg: 18 }}
                >
                  Ciudad
                </Typography>

                <TextField
                  required
                  size="small"
                  type="text"
                  name="ciudad"
                  id="ciudad"
                  value={newCity}
                  onChange={(e) => setNewCity(e.target.value)}
                  label="Ciudad"
                  inputProps={{ min: "0", style: { fontFamily: "Lato" } }}
                  InputLabelProps={{ style: { fontFamily: "Lato" } }}
                  className="mb-3 w-100"
                />
              </div>
              <div className="col-xl-6 col-md-12">
                <Typography
                  fontFamily="Lato"
                  color="#8A8A8A"
                  className="pb-3"
                  fontSize={{ xs: 15, md: 16, lg: 18 }}
                >
                  Estado
                </Typography>

                <select
                  required
                  className="mb-2"
                  value={newState}
                  onChange={(e) => setNewState(e.target.value)}
                  id={styles.dropdownStates}
                >
                  <option value="">Elegir estado</option>
                  {mexicanStates.map((stateObj, index) => (
                    <option key={index} value={stateObj.name}>
                      {stateObj.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-xl-6 col-md-12">
                <Typography
                  fontFamily="Lato"
                  color="#8A8A8A"
                  className="pb-3"
                  fontSize={{ xs: 15, md: 16, lg: 18 }}
                >
                  País
                </Typography>

                <TextField
                  required
                  size="small"
                  type="text"
                  name="pais"
                  id="pais"
                  value={newCountry}
                  onChange={(e) => setNewCountry(e.target.value)}
                  label="País"
                  inputProps={{ min: "0", style: { fontFamily: "Lato" } }}
                  InputLabelProps={{ style: { fontFamily: "Lato" } }}
                  className="mb-3 w-100"
                  disabled
                />
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Button
              onClick={editProfile}
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
              Guardar datos
            </Button>
          </div>
        </div>
      </Container>
    )
  }
  else {
    return (
      <div
      >
        <LoadingScreen/>
      </div>
    )
  }
}