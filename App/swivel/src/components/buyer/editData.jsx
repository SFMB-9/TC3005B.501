import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import axios from "axios";

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

export default function EditAccount() {
  const [apiData, setApiData] = useState(null);
  const { data: session } = useSession();
  const [editMode, setEditMode] = useState(false);

  const [newName, setNewName] = useState("");
  const [newSurname, setNewSurname] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");

  const [newStreet, setNewStreet] = useState("");
  const [newExtNum, setNewExtNum] = useState("");
  const [newIntNum, setNewIntNum] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newState, setNewState] = useState("");
  const [newCountry, setNewCountry] = useState("");
  const [newZip, setNewZip] = useState("");

  const fetchData = async () => {
    const resData = await fetch(
      `http://localhost:3000/api/managerProfile/managerP?id=${session.id}`
    );

    const res = await resData.json();

    setApiData(res.userData);
  };


  const editProfile = async (e) => {
    e.preventDefault();

    try{
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
      console.log(data);
      window.location.href = "/account";

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


  if (apiData) {
    return (
        <Container maxWidth="xl">
          <div className="section p-3">
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
                    defaultValue={apiData.name}
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    label="Nombre(s)"
                    inputProps={{ readOnly: editMode, min: "0", style: { fontFamily: "Lato" } }}
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
                    defaultValue={apiData.surname}
                    value={newSurname}
                    onChange={(e) => setNewSurname(e.target.value)}
                    label="Apellido(s)"
                    inputProps={{ readOnly: editMode, min: "0", style: { fontFamily: "Lato" } }}
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
                    defaultValue={apiData.email}
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    label="Correo electrónico"
                    inputProps={{ readOnly: editMode, min: "0", style: { fontFamily: "Lato" } }}
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
                    defaultValue="5511223344 (placeholder)"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    label="Teléfono"
                    inputProps={{ readOnly: editMode, min: "0", style: { fontFamily: "Lato" } }}
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
                    defaultValue="Carlos Lazo (placeholder)"
                    value={newStreet}
                    onChange={(e) => setNewStreet(e.target.value)}
                    label="Calle"
                    inputProps={{ readOnly: editMode, min: "0", style: { fontFamily: "Lato" } }}
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
                    defaultValue="123 (placeholder)"
                    value={newExtNum}
                    onChange={(e) => setNewExtNum(e.target.value)}
                    label="Número"
                    inputProps={{ readOnly: editMode, min: "0", style: { fontFamily: "Lato" } }}
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
                    defaultValue="123 (placeholder)"
                    value={newIntNum}
                    onChange={(e) => setNewIntNum(e.target.value)}
                    label="Número"
                    inputProps={{ readOnly: editMode, min: "0", style: { fontFamily: "Lato" } }}
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
                    defaultValue="12345 (placeholder)"
                    value={newZip}
                    onChange={(e) => setNewZip(e.target.value)}
                    label="Código postal"
                    inputProps={{ readOnly: editMode, min: "0", style: { fontFamily: "Lato" } }}
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
                    defaultValue="Ciudad (placeholder)"
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value)}
                    label="Ciudad"
                    inputProps={{ readOnly: editMode, min: "0", style: { fontFamily: "Lato" } }}
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

                  <TextField
                    required
                    size="small"
                    type="text"
                    name="estado"
                    id="estado"
                    defaultValue="Estado de México (placeholder)"
                    value={newState}
                    onChange={(e) => setNewState(e.target.value)}
                    label="Estado"
                    inputProps={{ readOnly: editMode, min: "0", style: { fontFamily: "Lato" } }}
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
                    País
                  </Typography>

                  <TextField
                    required
                    size="small"
                    type="text"
                    name="estado"
                    id="estado"
                    defaultValue="Estado de México (placeholder)"
                    value={newCountry}
                    onChange={(e) => setNewCountry(e.target.value)}
                    label="Estado"
                    inputProps={{ readOnly: editMode, min: "0", style: { fontFamily: "Lato" } }}
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
              {
                editMode ? (
                  <div 
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <button
                      onClick={handleEditMode}
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        backgroundColor: 'lightgray',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        height: '50%',
                        padding: '0.5rem 1rem',
                        marginRight: '1rem'
                      }}
                    > Cancelar </button>
                    <button
                      // onClick={handleSave}
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        backgroundColor: '#F55C7A',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        height: '50%',
                        padding: '0.5rem 1rem',
                        marginLeft: '1rem'
                      }}
                    > Guardar </button>
                  </div>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    
                    <Button
                      variant="contained"
                      type="submit"
                      className="w-80"
                      style={{
                        background: "none",
                        border: "none",
                      }}
                      sx={{
                        fontFamily: "Lato",
                        
                      }}
                      >
                      
                    </Button>

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
                  )
              }
            </div>
          </div>
        </Container>
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