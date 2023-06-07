/*
Diego Corrales Pinedo,
Salvador Milanes Braniff
15/5/2023

Page to visualize the details of a driving
test request before confirming it. The 
request will only be saved to the db once 
the user has selected the "confirm" button.
Here the user is able to choose a date and
time for their driving test.
*/

import { Container, Grid, Typography, Button, IconButton, Fade } from '@mui/material';
import React, { useState, useEffect, useMemo } from 'react';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/router';
import UploadIcon from "@mui/icons-material/Upload";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";

import DataTable from '@/components/general/Table';
import FileUpload from '@/pages/api/uploadBucketDoc/uploadBucketDoc';
import { formatDate } from "@/components/general/date_utils";

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import setHours from "date-fns/setHours";
import addDays from 'date-fns/addDays';
import { format } from "date-fns";
import axios from 'axios';

import BuyerNavbar from '@/components/buyer/navbar';
import PhaseIndicator from '@/components/general/phase_indicator';
import LocationsMap from '@/components/general/locations_map';
import PopUpComponent from '@/components/general/Popup';

import styles from '@/styles/test_details.module.css';

export default function RequestDetails() {
  const { data: session } = useSession();
  const router = useRouter();
  const [documents, setDocuments] = useState([]);
  const [uploadedDocument, setUploadedDocument] = useState(null);
  const [changedDocumentIndex, setChangedDocumentIndex] = useState([]);
  const [userAddress, setUserAddress] = useState(null);
  const [carData, setCarData] = useState(null);
  const [firstImage, setFirstImage] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);
  const [userData, setUserData] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [agencyData, setAgencyData] = useState(null);
  const [isOpen, setIsOpen] = useState([]);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [validatedDocs, setValidatedDocs] = useState(true);
  const [agencyCoords, setAgencyCoords] = useState({});
  const { auto_id, colorName } = router.query;

  const fetchDetails = async () => {
    let rawCar = await fetch(`http://localhost:3000/api/prueba-manejo/get-car-info-elastic?auto_id=${auto_id}`,
      { method: 'GET' });
    const res = await rawCar.json();
    const retrievedAuto = res.auto._source;

    let rawData = await fetch(`http://localhost:3000/api/prueba-manejo/get-user-agency-info?agency_id=${retrievedAuto.agencia_id}&_id=${session.id}`,
      { method: 'GET' });
    const resData = await rawData.json();
    const retrievedAgency = resData.agency;
    const retrievedUser = resData.user;
    const retrievedAddress = resData.user.direccion;

    // Replace single quotes with double quotes
    const validJSONString = retrievedAuto.colores.replace(/'/g, '"');

    // Parse the modified string as JSON
    const carColors = JSON.parse(validJSONString);

    for (var i = 0; i < carColors.length; i++) {
      if (carColors[i].nombre === colorName) {
        setFirstImage(carColors[i].imagenes[0]);
        setImageIndex(i);
      }
    }

    const newDocuments = resData.user.documentos.map((doc, i) => {
      return { ...doc, _id: i };
    });

    // console.log("Car data: " + JSON.stringify(retrievedAuto));
    // console.log("Agency data: " + JSON.stringify(retrievedAgency));
    // console.log("Agency ID: " + retrievedAuto.agencia_id);
    // console.log("User data: " + JSON.stringify(retrievedUser));
    // console.log("First image: " + JSON.stringify(firstImage));

    setCarData(retrievedAuto);
    setAgencyData(retrievedAgency);
    setAgencyCoords({
      lat: parseFloat(retrievedAuto.coordenadas_agencia.split(",")[0]), 
      lng: parseFloat(retrievedAuto.coordenadas_agencia.split(",")[1])
    });
    setUserData(retrievedUser);
    setDocuments(newDocuments);
    setUserAddress(retrievedAddress);
    checkValidatedDocs();
  }

  const addToIsOpen = async (newKey) => {
    let currentOpen = [...isOpen];
    currentOpen.push(newKey);
    setIsOpen(currentOpen);
  };

  const handleDocumentEdit = async (indx) => {

    // console.log("uploadedDocument: " + uploadedDocument);
    const isOpenWithoutIndx = isOpen.filter(function (i) {
      return i !== indx;
    });

    setIsOpen(isOpenWithoutIndx);
    await handleSubmit();
  };

  const handleSubmit = async () => {
    const currentDocs = documents;

    if (!uploadedDocument) {
      return;
    }

    const documentUrl = await FileUpload(uploadedDocument);

    currentDocs[changedDocumentIndex].url = documentUrl;
    currentDocs[changedDocumentIndex].fecha_modificacion = new Date().toISOString();

    try {
      await fetch(
        `http://localhost:3000/api/buyerProfile/updateUserDocs?id=${session.id}&doc_index=${changedDocumentIndex}&file_url=${documentUrl}&update_date=${currentDocs[changedDocumentIndex].fecha_modificacion}&update_status=Subido`,
        {
          method: "PUT",
        }
      );

      setDocuments(currentDocs);

      fetchDetails();
    } catch (error) {
      console.error("Error occurred during the API request:", error);
    }
  };

  const columns = useMemo(
    () => [
      {
        field: "nombre_documento",
        headerName: "Nombre",
        headerAlign: "center",
        align: "center",
        minWidth: 150,
        flex: 1,
      },
      {
        field: "ver_archivo",
        headerName: "Archivo",
        headerAlign: "center",
        align: "center",
        minWidth: 150,
        flex: 1,
        renderCell: (params) => (
          <>
            {params.row.url && params.row.url !== "" ? (
              <a href={params.row.url}>
                <u>Ver archivo</u>
              </a>
            ) : (
              <div>
                No hay archivo
              </div>
            )}
          </>
        ),
      },
      {
        field: "estatus",
        headerName: "Estatus",
        headerAlign: "center",
        align: "center",
        minWidth: 150,
        flex: 1,
      },
      {
        field: "fecha_modificacion",
        headerName: "Última modificación",
        headerAlign: "center",
        align: "center",
        minWidth: 150,
        flex: 1,
        valueGetter: (params) => {
          const cell = params.row.fecha_modificacion !== "" && params.row.fecha_modificacion ? formatDate(params.row.fecha_modificacion).formattedShortDate : 0;
          return cell;
        },
      },
      {
        field: "botones",
        headerName: "",
        headerAlign: "center",
        align: "center",
        minWidth: 150,
        flex: 1,
        type: "actions",
        renderCell: (params) => (
          <>
            {isOpen.includes(params.row._id) ? (
              <div>
                <label htmlFor="file-input">
                  <IconButton aria-label="delete" size="small" component="span">
                    <UploadIcon />
                  </IconButton>
                </label>
                <input
                  type="file"
                  id="file-input"
                  name="documents"
                  style={{ visibility: "hidden", width: 0, height: 0 }}
                  onChange={(e) => {
                    e.preventDefault();
                    const file = e.target.files[0];
                    console.log("file", file);
                    setUploadedDocument(file)
                    setChangedDocumentIndex(params.row._id)
                  }}
                />

                <IconButton
                  aria-label="delete"
                  size="small"
                  component="span"
                  type="submit"
                  onClick={() =>
                    handleDocumentEdit(params.row._id)
                  }
                >
                  <CheckIcon />
                </IconButton>
              </div>
            ) : (
              <div>
                {
                  params.row.url && params.row.url !== "" ? (
                    <IconButton
                      aria-label="delete"
                      size="small"
                      onClick={(e) => {
                        e.preventDefault();
                        addToIsOpen(params.row._id);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  ) : (
                    <IconButton
                      aria-label="delete"
                      size="small"
                      onClick={(e) => {
                        e.preventDefault();
                        addToIsOpen(params.row._id);
                      }}
                    >
                      <UploadIcon />
                    </IconButton>
                  )
                }
              </div>
            )}
          </>
        ),
      },
    ],
    [documents, isOpen]
  );

  const createDrivingTest = async () => {
    // Save the changed documents to firebase
    await handleSubmit();

    // Create driving test request
    const res = await axios.post('/api/prueba-manejo/crear-prueba-completa',
      { auto_id: auto_id, user_id: session.id, documents: documents, selected_date: selectedDate, selected_time: selectedTime, image_index: imageIndex });

    // Go to list of user's driving tests
    router.push({
      pathname: '/account/tests',
    })
  };

  const goBackToCatalog = () => {
    // Go back to the catalog
    router.back();
  };

  const checkValidatedDocs = () => {
    documents.forEach((doc) => {
      if (doc.estatus !== "Aceptado") {
        setValidatedDocs(false);
      }
    });
  };

  useEffect(() => {
    if (session) {
      fetchDetails();
    }
  }, [session, documents]);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const phases = ['Datos', 'Elección de horario', 'Confirmación'];

  if (userData != null && documents != null && userAddress != null && carData != null && firstImage != null && agencyData != null && session) {
    return (
      <>
        <BuyerNavbar />
        <h1 className={styles.request}>Solicitud de prueba de manejo</h1>
        <PhaseIndicator
          phases={phases}
          currentPhaseIndex={activeSectionIndex}
          className
        />
        {activeSectionIndex === 0 && (
          <>
            <div className={styles.schedule}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  width: "100%",
                }}
                className='d-flex flex-column justify-content-center'
              >
                <div className='row p-3'>
                  <Typography
                    variant="h4"
                    fontWeight="bold"
                    className="pb-2"
                    sx={{
                      fontFamily: "Raleway", color: "#333333",
                      paddingTop: "0rem",
                      paddingLeft: "2rem",
                    }}
                  >
                    Datos Personales
                  </Typography>
                  <div className='col-12 col-md-5'>
                  </div>
                  <div className='col-12 col-md-1'>
                  </div>
                </div>
                <div className='row p-3'>
                  <div className='col-12 col-md-1'>
                  </div>
                  <div className='col-12 col-md-5'>
                    <span style={{ color: "#8A8A8A" }}>Nombre(s): <span style={{ color: "#333333" }}>{userData.nombres}</span></span>
                  </div>
                  <div className='col-12 col-md-5'>
                    <span style={{ color: "#8A8A8A" }}>Apellidos: <span style={{ color: "#333333" }}>{userData.apellidos}</span></span>
                  </div>
                  <div className='col-12 col-md-1'>
                  </div>
                </div>
                <div className='row p-3'>
                  <div className='col-12 col-md-1'>
                  </div>
                  <div className='col-12 col-md-5'>
                    <span style={{ color: "#8A8A8A" }}>Correo: <span style={{ color: "#333333" }}>{userData.email}</span></span>
                  </div>
                  <div className='col-12 col-md-5'>
                    <span style={{ color: "#8A8A8A" }}>Celular: <span style={{ color: "#333333" }}>{userData.numero_telefonico}</span></span>
                  </div>
                  <div className='col-12 col-md-1'>
                  </div>
                </div>
                <div className='row p-3'>
                  <div className='col-12 col-md-1'>
                  </div>
                  <div className='col-12 col-md-5'>
                    <span style={{ color: "#8A8A8A" }}>Estado de residencia: <span style={{ color: "#333333" }}>{userAddress.estado}</span></span>
                  </div>
                  <div className='col-12 col-md-5'>
                    <span style={{ color: "#8A8A8A" }}>Código postal: <span style={{ color: "#333333" }}>{userAddress.codigo_postal}</span></span>
                  </div>
                  <div className='col-12 col-md-1'>
                  </div>
                </div>
              </div>
              <div>
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  className="pb-2"
                  sx={{
                    fontFamily: "Raleway", color: "#333333",
                    paddingTop: "1rem",
                    paddingLeft: "2rem",
                  }}
                >
                  Mis documentos
                </Typography>
                <div
                  style={{
                    padding: "3%",
                    overflowY: "scroll",
                    maxHeight: "100vh",
                  }}
                >
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
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1rem",
                }}
              >
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "1rem",
                  marginBottom: "1rem",
                }}
              >
                <Button
                  sx={{
                    fontFamily: "Lato",
                    color: '#626262',
                    backgroundColor: "#D9D9D9",
                    "&:hover": {
                      backgroundColor: "#b3b3b3",
                      color: "#fff",
                    },
                  }}
                  variant='contained' onClick={() => goBackToCatalog()}>Cancelar</Button>
                <Button
                  style={{
                    marginLeft: "2.5rem",
                  }}
                  variant='contained' 
                  onClick={() => setActiveSectionIndex(1)}
                  // disabled={!validatedDocs}
                  >Continuar</Button>
              </div>
            </div>
          </>
        )}
        {activeSectionIndex === 1 && (
          <>
            <div className={styles.schedule}>
              <div className={styles.carView}>
                <img src={firstImage} className={styles.imageDiv} />
                <div className={styles.carInfo}>
                  <h1 className={styles.carName}>{carData.marca} {carData.modelo}</h1>
                  <span className={styles.year}> {carData.año} </span>
                  <h4 className={styles.priceTag}> Dirección de la Agencia: </h4>
                  <p className={styles.address}>{carData.direccion_agencia}</p>
                  <h1 className={styles.priceTag}>$ {Intl.NumberFormat().format(carData.precio)} MXN</h1>
                </div>
              </div>
              <div className={styles.testInfo}>
                <div className={styles.schedule}>
                  <h2 className="mb-3">Elegir un horario:</h2>
                  <h3> Elegir Fecha* </h3>
                  <DatePicker
                    selected={selectedDate}
                    onChange={date => setSelectedDate(date)}
                    dateFormat='dd/MM/yyyy'
                    minDate={addDays(new Date(), agencyData.dias_anticipo)}
                    maxDate={addDays(new Date(), agencyData.dias_max)}
                    startDate={addDays(new Date(), agencyData.dias_anticipo)}
                    className="p-2"
                  />
                  <h3 className="mt-3"> Elegir Hora* </h3>
                  <DatePicker
                    selected={selectedTime}
                    onChange={time => setSelectedTime(time)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeFormat='hh aa'
                    timeIntervals={60}
                    minTime={setHours(new Date(), agencyData.horas_min)}
                    maxTime={setHours(new Date(), agencyData.horas_max)}
                    dateFormat='hh:mm aa'
                    className="p-2"
                  />
                </div>
                <LocationsMap
                  locationsData={[{ brand: carData.marca, position: agencyCoords }]}
                />
              </div>
              <div className={styles.containerNavButtons}>
                {selectedDate && (
                  <p>
                    Fecha actualmente agendada:{" "}
                    {/* La fecha se guarda en UTC, pero se muestra en tiempo local */}
                    {format(selectedDate, "dd/MM/yyyy")} (Tiempo local)
                  </p>
                )}
                {selectedTime && (
                  <p>
                    Hora actualmente agendada:{" "}
                    {/* La hora se guarda en UTC, pero se muestra en tiempo local */}
                    {format(selectedTime, "hh:mm aa")} (Tiempo local)
                  </p>
                )}

                <div className={styles.navButtons}>
                  <Button variant='contained' onClick={() => setActiveSectionIndex(0)}
                    sx={{
                      marginRight: "3vw",
                    }}
                  >Volver</Button>
                  {(selectedDate && selectedTime) ? (
                    <div>
                      <Button variant='contained' onClick={() => setActiveSectionIndex(2)}>Continuar</Button>
                    </div>
                  ) : (
                    <div>
                      <div>*Selecciona una fecha y horario para confirmar tu cita.</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
        {activeSectionIndex === 2 && (
          <>
            <div>
              <div>
                <span style={{ color: "#F55C7A" }}> Fecha:{" "} <span style={{ color: "#333333" }}> {format(selectedDate, "dd/MM/yyyy")} </span></span><br />
                <span style={{ color: "#F55C7A" }}> Horario:{" "} <span style={{ color: "#333333" }}> {format(selectedTime, "hh:mm aa")} </span></span><br />
                <span style={{ color: "#F55C7A" }}> Dirección:{" "} <span style={{ color: "#333333" }}> {carData.direccion_agencia} </span></span><br />
                <span style={{ color: "#F55C7A" }}> Teléfono:{" "} <span style={{ color: "#333333" }}> {agencyData.numero_telefonico} </span></span><br />
              </div>
              <img src={firstImage} className={styles.imageDiv} />
            </div>
            <div>
              <Button variant='contained' onClick={() => setActiveSectionIndex(1)}>Volver</Button>
              <Button variant='contained' onClick={() => createDrivingTest()}>Confirmar</Button>
            </div>
          </>
        )}
      </>
    );
  } else {
    return (
      <div>
        <p>Cargando...</p>
      </div>
    );
  }
};