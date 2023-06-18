import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

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

  const editProfile = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.put("/api/GA/editGA", {
        id: session.id,
        nombres: newName,
        apellidos: newSurname,
        email: newEmail,
        numero_telefonico: newPhone,

      });
      window.location.href = "/providers/GA/editProfile";

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