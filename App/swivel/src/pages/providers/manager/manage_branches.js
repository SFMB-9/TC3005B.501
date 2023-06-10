import React, { useState, useEffect, useMemo } from 'react';
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Grid, Typography, TextField, Button, Card, CardContent, IconButton, fabClasses } from '@mui/material';
import axios from "axios";
import ManagerLayout from "@/components/providers/manager/layout";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DataTable from "@/components/general/Table";
import CheckIcon from '@mui/icons-material/Check';
import CustomizedSnackbars from "@/components/general/Alert";

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

  // const handleAddFile = () => {
  //   const docs = [...documents, { _id: documents.length, name: name }];
  //       const newDocs = docs.map((doc, i) => {
  //         return {
  //           _id: i,
  //           name: doc.name,
  //         }
  //       }
  //       );
  //       setDocuments(newDocs);

  //     setName('');
  //     setShow(false);

  // }

  // const handleDeleteFile = (id) => {
  //   const docs = [...documents];
  //   console.log(documents);
  //   const deletedDocs = docs.filter((doc) => doc._id !== id);
  //   const newDocs = deletedDocs.map((doc, i) => {
  //     return {
  //       _id: i,
  //       name: doc.name,
  //     }
  //   }
  //   );
  //   console.log(newDocs);
  //   setDocuments(newDocs);
    
  // }


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

  const fetchData = async (retrievedAgencyId) => {
      // Get the agency data
      const resRaw = await fetch(`/api/managerProfile/managerP?id=${retrievedAgencyId}`);
      const res = await resRaw.json();
      const agencyData = res.userData;

      // Set the state variables accordingly
      setDocuments(agencyData.documentos_requeridos_compra);
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
      let agenciaIdRaw = await fetch(`http://localhost:3000/api/catalogo-gerente/buscar-id-agencia?_id=${session.id}`,
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

  // const columns = useMemo( ()=> [
  //   {
  //     field: "_id",
  //     headerName: "No.",
  //     type: "number",
  //     headerAlign: "center",
  //     align: "center",
  //     minWidth: 150,
  //     flex: 1,
  //   },
  //   {
  //     field: "name",
  //     headerName: "Documento",
  //     headerAlign: "center",
  //     align: "center",
  //     minWidth: 150,
  //     flex: 1,
  //   },
  //   {
  //     field: "botones",
  //     headerName: "",
  //     headerAlign: "center",
  //     align: "center",
  //     minWidth: 150,
  //     flex: 1,
  //     type: "actions",
  //     renderCell: (params) => (
  //       // <Button
  //       //   variant="contained"
  //       //   disableElevation
  //       //   onClick={() =>
  //       //     viewRequest(params.row._id, params.row.usuario_final_id)
  //       //   }
  //       //   className="py-0"
  //       //   sx={{
  //       //     fontFamily: "Lato",
  //       //     fontSize: "12px",
  //       //     backgroundColor: "#111439",
  //       //   }}
  //       // >
  //       //   Ver detalles
  //       // </Button>
  //       <>
  //       <IconButton aria-label="delete" size="small" onClick={()=>handleDeleteFile(params.row._id)}>
  //         <DeleteOutlineIcon />
  //       </IconButton>
  //       </>
  //     ),
  //   },
  // ], [documents]);


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
                        Gestiona los documentos que el cliente debera presentar en la agencia para completar su proceso de compra, y seleccione cuales aplican para una solicitud de prueba de manejo.
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

                      {(show &&
                      
                      <div className='d-flex justify-content-around align-items-center'>

                        <TextField
                          label="Nombre del documento"
                          onChange={(e) => setName(e.target.value)}
                          value={name}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          sx={{
                            flex: '50%',
                            marginRight: '0.5rem',
                          }}
                        />
                        <IconButton aria-label="delete" size="small" onClick={() => {setName(''); setShow(false)}}>
                          <DeleteOutlineIcon />
                        </IconButton>

                        <IconButton aria-label="delete" size="small" onClick={handleAddFile}>
                          <CheckIcon />
                        </IconButton>

                        </div>
                      )}
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          marginTop: '4%',
                        }}
                        className='w-100 d-flex justify-content-center'
                      >
                        
                        
                        <button
                onClick={()=>setShow(true)}
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
      <p>Cargando...</p>
    );
  }
};
