import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/router';
import PopUpComponent from "@/components/general/Popup"
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
      `http://localhost:3000/api/managerProfile/managerP?id=${session.id}`
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
                    // value={apiData.nombre}
                    // onChange={handleChange}
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
                    // value={apiData.surname}
                    // onChange={handleChange}
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
                    // value={apiData.nombre}
                    // onChange={handleChange}
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
                    // value={apiData.nombre}
                    // onChange={handleChange}
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
                    // value={apiData.nombre}
                    // onChange={handleChange}
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
                    Número
                  </Typography>

                  <TextField
                    required
                    size="small"
                    type="text"
                    name="numero"
                    id="numero"
                    defaultValue="123 (placeholder)"
                    // value={apiData.surname}
                    // onChange={handleChange}
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
                    // value={apiData.nombre}
                    // onChange={handleChange}
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
                    Colonia
                  </Typography>

                  <TextField
                    required
                    size="small"
                    type="text"
                    name="colonia"
                    id="colonia"
                    defaultValue="Colonia (placeholder)"
                    // value={apiData.nombre}
                    // onChange={handleChange}
                    label="Colonia"
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
                    // value={apiData.nombre}
                    // onChange={handleChange}
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
                    // value={apiData.nombre}
                    // onChange={handleChange}
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
                      style={{backgroundColor: "#D9D9D9"}}
                      sx={{
                        fontFamily: "Lato",
                        ":hover": {
                          backgroundColor: "red",
                        }
                      }}
                      >
                      Cancelar
                    </Button>

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