import React, { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Grid, Typography, TextField, Card, CardContent, IconButton, Fade } from '@mui/material';
import axios from "axios";
import ManagerLayout from "@/components/providers/Manager/layout";
import CustomizedSnackbars from "@/components/general/Alert";
import CloseIcon from "@mui/icons-material/Close";
import LoadingScreen from "@/components/general/LoadingScreen";

export default function WorkingHoursComponent() {
  const router = useRouter();
  const { data: session } = useSession();

  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [preDays, setPreDays] = useState(0);
  const [maxDays, setMaxDays] = useState(0);
  const [agencyId, setAgencyId] = useState("");
  const [documents, setDocuments] = useState([]);
  const [name, setName] = useState('');
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [docs, setDoc] = useState([]);

  const createEmptyDoc = () => ({ 0: '' });

  const handleRemoveDoc = (index) => {
    setDoc((prevPlazo) => {
      const updatedDoc = [...prevPlazo];
      updatedDoc.splice(index, 1);
      return updatedDoc;
    });
    const updatedDoc = [...docs];
    updatedDoc.splice(index, 1);
    setDoc(updatedDoc);
  };


  // Handle input changes
  const handleStartTimeChange = (event) => {
    setStartTime(parseInt(event.target.value));
  };

  const handleEndTimeChange = (event) => {
    setEndTime(parseInt(event.target.value));
  };

  const handlePreDaysChange = (event) => {
    setPreDays(parseInt(event.target.value));
  };

  const handleMaxDaysChange = (event) => {
    setMaxDays(parseInt(event.target.value));
  };

  const handleAddRow = (setStateFunc, createEmptyFunc) => {
    setStateFunc((prevState) => [...prevState, createEmptyFunc()]);
  };

  const handleValueChange = (newValue, index) => {
    const newPlazos = [...docs];
    const key = Object.keys(newPlazos[index])[0];
    const updatedObject = { [key]: newValue};
    newPlazos[index] = updatedObject;
    setDoc(newPlazos);
  };

  const fetchData = async (retrievedAgencyId) => {
    // Get the agency data
    const resRaw = await fetch(`/api/managerProfile/managerP?id=${retrievedAgencyId}`);
    const res = await resRaw.json();
    const agencyData = res.userData;

    // Map the documents to the format expected by the table
    const docs = agencyData.documentos_requeridos_compra.map((doc) => {
      return { 0: doc };
    });

    // Set the state variables accordingly
    setDoc(docs);
    setStartTime(agencyData.horas_min);
    setEndTime(agencyData.horas_max);
    setPreDays(agencyData.dias_anticipo);
    setMaxDays(agencyData.dias_max);
    setAgencyId(retrievedAgencyId);
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (
      startTime > 24 || startTime < 0 ||
      endTime > 24 || endTime < 0
    ) {
      setOpen(true);
      return;
    }

    // Map the documents to the format expected by the backend
    const documents = docs.map((doc) => {
      return Object.values(doc)[0];
    });
    console.log('DOCS: ', documents);

    await axios.put('/api/agencia/actualizar-agencia', {
      id: agencyId,

      documentos: documents,
      horas_min: startTime,
      horas_max: endTime,
      dias_anticipo: preDays,
      dias_max: maxDays
    });

    returnToLastPage();
  };

  const returnToLastPage = () => {
    router.back();
  };

  useEffect(() => {
    const getIdAgencia = async () => {
      let agenciaIdRaw = await fetch(`/api/catalogo-gerente/buscar-id-agencia?_id=${session.id}`,
        { method: 'GET' });

      const agenciaId = await agenciaIdRaw.json();

      return agenciaId.user.agencia_id;
    }

    if (router.isReady && session) {
      getIdAgencia().then((a_id) =>
        fetchData(a_id)
      );
    }
  }, [router.isReady, session]);

  if (agencyId) {
    return (
      <>
        <ManagerLayout>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'start',
                alignItems: 'center',
                paddingLeft: '3%',
                paddingRight: '3%',
                paddingTop: '2%',
              }}
            >
              <Typography variant="h4"
                sx={{
                  display: 'flex',
                  justifyContent: 'start',
                  fontWeight: 'bold',
                  fontFamily: 'Raleway',
                }}>
                Gestionar servicios
              </Typography>
            </div>
            <Grid container spacing={3} sx={
              {
                display: 'flex',
                padding: "2% 5%"
                // paddingLeft: '5%',
                // paddingRight: '5%',
                // paddingTop: '2%',

              }}>
              <Grid item xs={12} sm={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Card
                  sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <CardContent
                    sx={{
                      width: '100%',
                      padding: '5%',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: '5%',
                      }}
                    >
                      <Typography variant="h4" component="div"
                        sx={{
                          marginBottom: '2%',
                          justifyContent: 'center',
                        }}
                      >
                        Horario de atención
                      </Typography>
                      <Typography sx={{
                        marginBottom: '2%',
                        textAlign: 'center',
                      }} color="text.secondary">
                        Seleccione los horarios en los que opera su agencia, así como los días mínimos y máximos de anticipo para agendar una prueba de manejo.
                      </Typography>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '0% 5%',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          marginTop: '2%',
                          marginBottom: '2%',
                        }}
                      >
                        <TextField
                          id="time"
                          label="Hora de apertura (0 a 24)"
                          type="number"
                          value={startTime}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          inputProps={{
                            min: 0,
                            max: 24
                          }}
                          sx={{
                            flex: '50%',
                            marginRight: '1rem',
                          }}
                          onChange={handleStartTimeChange}
                        />
                        <TextField
                          id="time"
                          label="Hora de cierre (0 a 24)"
                          type="number"
                          value={endTime}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          inputProps={{
                            min: 0,
                            max: 24
                          }}
                          sx={{
                            flex: '50%',
                            marginLeft: '1rem',
                          }}
                          onChange={handleEndTimeChange}
                        />
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          marginTop: '4%',
                        }}
                      >
                        <TextField
                          id="number"
                          label="Días de anticipio mínimos"
                          type="number"
                          value={preDays}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          inputProps={{
                            step: 1,
                          }}
                          sx={{
                            flex: '50%',
                            marginRight: '1rem',
                          }}
                          onChange={handlePreDaysChange}
                        />
                        <TextField
                          id="number"
                          label="Días de anticipo máximos"
                          type="number"
                          value={maxDays}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          inputProps={{
                            step: 1,
                          }}
                          sx={{
                            flex: '50%',
                            marginLeft: '1rem',
                            marginBottom: '2%',
                          }}
                          onChange={handleMaxDaysChange}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Card
                  sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <CardContent
                    sx={{
                      width: '100%',
                      padding: '5%',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: '5%',
                      }}
                    >
                      <Typography variant="h4" component="div"
                        className='text-center'
                        sx={{
                          marginBottom: '2%',
                          justifyContent: 'center',
                        }}
                      >
                        Documentos necesarios para el servicio
                      </Typography>
                      <Typography sx={{
                        marginBottom: '2%',
                        textAlign: 'center',
                      }} color="text.secondary">
                        Gestiona los documentos que el cliente deberá presentar en la Agencia para completar su proceso de compra, y seleccione cuáles aplican para una solicitud de prueba de manejo.
                      </Typography>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          marginTop: '2%',
                          marginBottom: '2%',
                        }}
                      >
                        {/* {documents ? (
                        <div className="section d-flex justify-content-center w-100">
                        <div className="pt-4">
                          <DataTable
                            columns={columns}
                            rows={documents}
                            rowSelection={false}
                            sx={{
                              border: 1,
                              borderColor: "#D9D9D9",
                              "& .MuiDataGrid-cell": {
                                border: 1,
                                borderRight: 0,
                                borderTop: 0,
                                borderLeft: 0,
                                borderColor: "#D9D9D9",
                                fontFamily: "Lato",
                                fontWeight: 500,
                                fontSize: "12px",
                                color: "#333333",
                              },
                              "& .MuiDataGrid-columnHeaders": {
                                fontFamily: "Lato",
                                fontSize: "16px",
                                color: "#333333",
                                borderBottom: 0,
                              },
                              "& .MuiDataGrid-columnHeaderTitle": {
                                fontWeight: 800,
                              },
                              "& .MuiPaginationItem-text": {
                                fontFamily: "Lato",
                                color: "#333333",
                              },
                            }}
                          />
                        </div>
                      </div>
                      ) : (
                        <div>
                          <h2>No se econtraron docs.</h2>
                        </div>
                      )} */}
                      </div>
                      <div className="col-md">
                        <div>
                          <div className="mb-4">
                            <div
                              className="p-3 py-2 shadow-sm"
                              style={{
                                backgroundColor: "#f5f5f5",
                                borderRadius: 10,
                                borderBottomLeftRadius: 0,
                                borderBottomRightRadius: 0,
                              }}
                            >
                              <div className="w-100 row">
                                <div className="col">
                                  <Typography
                                    fontFamily="Lato"
                                    color="#1f1f1f"
                                    fontSize={{ xs: 15, md: 16, lg: 18 }}
                                  >
                                    Documentos
                                  </Typography>
                                </div>
                              </div>
                            </div>
                            <div
                              className="p-3 py-3 shadow-sm"
                              style={{
                                borderRadius: 10,
                                borderTopLeftRadius: 0,
                                borderTopRightRadius: 0,
                              }}
                            >
                              {docs.map((jsonObject, index) => (
                                <Fade in={true} key={index}>
                                  <div className="row">
                                    <div className="col d-flex">
                                      <TextField
                                        required
                                        size="small"
                                        type="text"
                                        name="value"
                                        value={Object.values(jsonObject)[0]}
                                        onChange={(event) => handleValueChange(event.target.value, index)}
                                        label="Documento"
                                        inputProps={{
                                          min: "0",
                                          style: { fontFamily: "Lato" },
                                        }}
                                        InputLabelProps={{
                                          style: { fontFamily: "Lato" },
                                        }}
                                        className="mb-2 w-100"
                                      />
                                      <IconButton
                                        aria-label="delete"
                                        size="small"
                                        className="mb-2"
                                        onClick={() => handleRemoveDoc(index)}
                                      >
                                        <CloseIcon fontSize="inherit" />
                                      </IconButton>
                                    </div>
                                  </div>
                                </Fade>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          marginTop: '4%',
                        }}
                        className='w-100 d-flex justify-content-center'
                      >
                        <button
                          onClick={() => { handleAddRow(setDoc, createEmptyDoc)}}
                          style={{
                            width: '10rem',
                            backgroundColor: '#F55C7A',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            height: '50%',
                            padding: '0.5rem 1rem',
                            marginLeft: '1rem',
                          }}
                        >
                          Agregar
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>





            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: '2%',
              }}
            >
              <button
                onClick={returnToLastPage}
                style={{
                  width: '10rem',
                  backgroundColor: 'gray',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  height: '50%',
                  padding: '0.5rem 1rem',
                  marginRight: '1rem',
                }}
              >
                Cancelar
              </button>
              <button
                onClick={handleSubmit}
                style={{
                  width: '10rem',
                  backgroundColor: '#F55C7A',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  height: '50%',
                  padding: '0.5rem 1rem',
                  marginLeft: '1rem',
                }}
              >
                Guardar cambios
              </button>
            </div>
            <CustomizedSnackbars setOpen={setOpen} message="Valor de hora fuera de rango" open={open} severity="error" />
          </div>
          {/* <div>
            
            <label>Hora de apertura</label>
            <input
              type="time"
              value={startTime}
              onChange={handleStartTimeChange}
            />
            <label>Hora de cierre</label>
            <input
              type="time"
              value={endTime}
              onChange={handleEndTimeChange}
            />
            <label>Días de antelación</label>
            <input
              type="number"
              value={preDays}
              onChange={handlePreDaysChange}
              inputProps={{ min: 0 }}
            />
            <label>Número de días disponible</label>
            <input
              type="number"
              value={maxDays}
              onChange={handleMaxDaysChange}
              inputProps={{ min: 0 }}
            />

            <div>
              <label htmlFor="agency_field">Agencia</label>
              <input
                type="text"
                id="agency_field"
                className="form-control"
                value={agency}
                onChange={(e) => setAgency(e.target.value)}
                required
              />
            </div>

            <button onClick={handleSubmit}>
              Submit
            </button>
          </div> */}
        </ManagerLayout>
      </>
    );
  } else {
    return (
      <LoadingScreen/>
    );
  }
};
