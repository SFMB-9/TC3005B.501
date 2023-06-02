/*
Diego Corrales Pinedo
15/5/2023

Page to visualize the details of a driving
test request before confirming it. The 
request will only be saved to the db once 
the user has selected the "confirm" button.
Here the user is able to choose a date and
time for their driving test.
*/

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import setHours from "date-fns/setHours";
import addDays from 'date-fns/addDays';
import { format } from "date-fns";
import axios from 'axios';
import { useSession } from "next-auth/react";
import FileUpload from '@/pages/api/uploadBucketDoc/uploadBucketDoc';
import { Grid, Button } from '@mui/material';
import json5 from 'json5';

import BuyerNavbar from '@/components/buyer/navbar';
import PhaseIndicator from '@/components/general/phase_indicator';
import LocationsMap from '@/components/general/locations_map';
import PopUpComponent from '@/components/general/Popup';

import { formatDate } from "@/components/general/date_utils";
import styles from '@/styles/test_details.module.css';
import DataTable from '@/components/general/Table';

export default function RequestDetails() {

  const { data: session } = useSession();
  const router = useRouter();
  const [documents, setDocuments] = useState([
    {
      nombre_documento: "licencia",
      url: "www.sample.com",
      fecha_modificacion: new Date().toISOString(),
      estatus: "Aceptado",
      comentarios: ""
    },
    {
      nombre_documento: "identificacion",
      url: "www.sample.com",
      fecha_modificacion: new Date().toISOString(),
      estatus: "Aceptado",
      comentarios: ""
    }]);
  const [changedDocumentIndices, setChangedDocumentIndices] = useState([]);
  const [changedDocuments, setChangedDocuments] = useState([]);
  const [uploadedDocument, setUploadedDocument] = useState([]);
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
  const { auto_id, colorName } = router.query;
  const user_id = session.id;

  const fetchDetails = async () => {
    let rawCar = await fetch(`http://localhost:3000/api/prueba-manejo/get-car-info-elastic?auto_id=${auto_id}`,
      { method: 'GET' });
    const res = await rawCar.json();
    const retrievedAuto = res.auto._source;

    let rawData = await fetch(`http://localhost:3000/api/prueba-manejo/get-user-agency-info?agency_id=${retrievedAuto.agencia_id}&_id=${user_id}`,
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

    let retrievedDocuments = documents;

    if (resData.user.documentos != undefined) {
      retrievedDocuments = resData.user.documentos;
    }

    setCarData(retrievedAuto);
    setAgencyData(retrievedAgency);
    setUserData(retrievedUser);
    // setDocuments(retrievedDocuments);
    setUserAddress(retrievedAddress);
  }

  const createDrivingTest = async () => {
    // Save the changed documents to firebase
    await handleSubmit();

    const filteredDocuments = documents.filter(json => {
      return json.nombre_documento === "licencia" || json.nombre_documento === "identificacion";
    });

    // Create driving test request
    const res = await axios.post('/api/prueba-manejo/crear-prueba-completa',
      { auto_id: auto_id, user_id: user_id, documents: filteredDocuments, selected_date: selectedDate, selected_time: selectedTime, image_index: imageIndex });

    // Go to list of user's driving tests
    router.push({
      pathname: '/account/tests',
    })
  };

  const handleDocumentEdit = (doc, indx) => {
    const documentIndices = [...changedDocumentIndices];
    documentIndices.push(indx);
    setChangedDocumentIndices(documentIndices);

    const currentChangedDocuments = [...changedDocuments];
    currentChangedDocuments.push(doc);
    setChangedDocuments(currentChangedDocuments);

    const isOpenWithoutIndx = isOpen.filter(function (i) {
      return i !== indx;
    });

    setIsOpen(isOpenWithoutIndx);
  };

  const handleSubmit = async () => {
    let documentUrl = "";
    const currentDocs = documents;

    // Store the changed documents inside firebase
    for (const [i, doc] of changedDocuments.entries()) {
      // Upload to firebase
      documentUrl = await FileUpload(doc);
      // Assign new URL
      currentDocs[changedDocumentIndices[i]].url = documentUrl;
      // Change modification date, status and comments
      currentDocs[changedDocumentIndices[i]].fecha_modificacion = new Date().toISOString();
      currentDocs[changedDocumentIndices[i]].estatus = "En revision";
      currentDocs[changedDocumentIndices[i]].comentarios = "";

      setDocuments(currentDocs);
    }
  };

  const addToIsOpen = async (newKey) => {
    let currentOpen = [...isOpen];
    currentOpen.push(newKey);
    setIsOpen(currentOpen);
  }

  // const documentInfo = (document, i) => {
  //   if (document.nombre_documento === "licencia" || document.nombre_documento === "identificacion") {
  //     return (
  //       <tr key={i}>
  //         <td>{document.nombre_documento}</td>
  //         {/* <td>{document.url}</td> */}
  //         <td>{document.fecha_modificacion}</td>
  //         <td><button onClick={() => addToIsOpen(i)}>Editar</button></td>
  //         {isOpen.includes(i) && (
  //           <td>
  //             <div>
  //               <input type="file" name="documents" onChange={(e) => setUploadedDocument(e.target.files[0])} />
  //               <button type="submit" onClick={() => handleDocumentEdit(uploadedDocument, i)}>Confirm</button>
  //             </div>
  //           </td>
  //         )}
  //         <td>{document.estatus}</td>
  //         <td>{document.comentarios}</td>
  //       </tr>
  //     );
  //   }
  //   return;
  // };

  useEffect(() => {
    if (auto_id) {
      fetchDetails();
    }
  }, [auto_id]);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const phases = ['Datos', 'Elección de horario', 'Confirmación'];

  const car_dealerships = [
    { brand: 'Toyota', position: { lat: 19.4226, lng: -99.1676 } },
    { brand: 'Honda', position: { lat: 19.4124, lng: -99.1546 } },
    { brand: 'Ford', position: { lat: 19.4294, lng: -99.1409 } },
    { brand: 'Chevrolet', position: { lat: 19.4257, lng: -99.1710 } },
    { brand: 'Nissan', position: { lat: 19.4191, lng: -99.1539 } },
    { brand: 'Volkswagen', position: { lat: 19.4269, lng: -99.1483 } },
    { brand: 'BMW', position: { lat: 19.4208, lng: -99.1913 } },
    { brand: 'Mercedes-Benz', position: { lat: 19.4106, lng: -99.1782 } },
    { brand: 'Audi', position: { lat: 19.4216, lng: -99.2039 } },
    { brand: 'Mazda', position: { lat: 19.4324, lng: -99.1367 } },
  ];

  const mapDocumentsToRows = (documents) => {
    return documents.map((document, i) => {
      return {
        index: i,
        ...document
      }
    });
  }

  const columns = [
    {
      field: 'Documento',
      headerName: 'Documento',
      headerAlign: 'center',
      minWidth: 150,
      flex: 1,
      valueGetter: (params) => {
        let cell = params.row
          ? `${params.row.nombre_documento}`
          : 'No existe fecha de entrega';
        return cell;
      },
    },
    {
      field: "FechaEntrega",
      headerName: "Fecha de entrega",
      headerAlign: "center",
      align: "center",
      minWidth: 150,
      flex: 1,
      valueGetter: (params) => {
        let cell = params.row
          ? `${formatDate(params.row.fecha_modificacion).formattedShortDate}`
          : "No existe fecha de entrega";
        return cell;
      },
    },
    {
      field: "subir",
      headerName: "Subir",
      headerAlign: "center",
      align: "center",
      minWidth: 150,
      flex: 1,
      renderCell: (params) => (
        <>
          <PopUpComponent
            title="Subir documento"
            popUpContent={
              <>
                {isOpen.includes(params.row.index) && (
                  <div>
                    <input
                      type="file"
                      name="documents"
                      onChange={(e) => setUploadedDocument(e.target.files[0])}
                    />
                    <button
                      type="submit"
                      onClick={() => handleDocumentEdit(uploadedDocument, params.row.index)}
                    >
                      Confirm
                    </button>
                  </div>
                )}
              </>
            }
            btnOpen={
              <Button
                variant="contained"
                disableElevation
                onClick={() => addToIsOpen(params.row.index)}
                className="py-0"
                sx={{
                  fontFamily: "Lato",
                  fontSize: "12px",
                  backgroundColor: "#111439",
                }}
              >
                Editar
              </Button>
            }
          />
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
      valueGetter: (params) => {
        let cell = params.row
          ? `${params.row.estatus}`
          : "Este proceso no contiene auto";
        return cell;
      },
    },
    {
      field: "comentarios",
      headerName: "Comentarios",
      headerAlign: "center",
      align: "center",
      minWidth: 150,
      flex: 1,
      valueGetter: (params) => {
        let cell = params.row
          ? `${params.row.comentarios}`
          : "Este proceso no contiene auto";
        return cell;
      },
    },
  ]

  if (userData != null && documents != null && userAddress != null && carData != null && firstImage != null && agencyData != null) {
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
                  <div className='col-12 col-md-1'>
                  </div>
                  <div className='col-12 col-md-5'>
                    <h4>Datos personales</h4>
                  </div>
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

              {/* <table>
                <thead>
                  <tr>
                    <th>Documento</th>
                    
                    <th>Fecha de entrega</th>
                    <th>Subir</th>
                    <th>Estatus</th>
                    <th>Comentarios</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {documents.map((document, i) => (
                    documentInfo(document, i)
                  ))}
                </tbody>
              </table> */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1rem",
                }}
              >
                { /*
                  documents ? (
                    <div>
                      <h4
                        style={{
                          fontFamily: "Lato",
                          marginTop: "2rem",
                        }}
                      >Documentos</h4>

                      <DataTable
                        columns={columns}
                        rows={mapDocumentsToRows(documents)}
                        // rowSelection={false}
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
                  ) : (
                    <div>
                      <h4>Documentos</h4>
                      <p>No hay documentos</p>
                    </div>
                  )
                  */}
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
                  style={{
                    marginRight: "2.5rem",
                    backgroundColor: "#333333",
                  }}
                  variant='contained' href='/catalog'>Cancelar</Button>
                <Button
                  style={{
                    marginLeft: "2.5rem",
                  }}
                  variant='contained' onClick={() => setActiveSectionIndex(1)}>Continuar</Button>
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
                  <p className={styles.address}>{carData.direccion_agencia}</p>
                  <h1 className={styles.priceTag}>$ {Intl.NumberFormat().format(carData.precio)} MXN</h1>
                </div>
              </div>
              <div className={styles.testInfo}>
                <div className={styles.schedule}>
                  <h2 className={styles.schedule_header}>Elegir horario*</h2>
                  <DatePicker
                    selected={selectedDate}
                    onChange={date => setSelectedDate(date)}
                    dateFormat='dd/MM/yyyy'
                    minDate={addDays(new Date(), agencyData.dias_anticipo)}
                    maxDate={addDays(new Date(), agencyData.dias_max)}
                    startDate={addDays(new Date(), agencyData.dias_anticipo)}
                  />
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
                  />
                </div>
                <LocationsMap
                  locationsData={[{ brand: 'Toyota', position: { lat: 40.7128, lng: -74.0059 } }]}
                />
              </div>
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
              <Button variant='contained' onClick={() => setActiveSectionIndex(0)}>Volver</Button>
              {(selectedDate && selectedTime) ? (
                <div>
                  <Button variant='contained' onClick={() => setActiveSectionIndex(2)}>Continuar</Button>
                </div>
              ) : (
                <div>
                  <p>*Selecciona una fecha y horario para confirmar tu cita.</p>
                </div>
              )}
            </div>
          </>
        )}
        {activeSectionIndex === 2 && (
          <>
            <div className={styles.confirmation}>
              <p>
                Fecha:{" "}
                {format(selectedDate, "dd/MM/yyyy")}
                Horario:{" "}
                {format(selectedTime, "hh:mm aa")}
                Dirección:{" "}
                {carData.direccion_agencia}
                Teléfono:{" "}
                {agencyData.numero_telefonico}
              </p>
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