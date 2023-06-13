import { useRouter } from "next/router";
import React, { useState, useEffect, useMemo } from "react";
import FileUpload from "@/pages/api/uploadBucketDoc/uploadBucketDoc";
import CheckoutPage from "@/components/general/checkout";
import { Container, Typography, Button, IconButton, Fade } from "@mui/material";
import DataTable from "@/components/general/Table";
import UploadIcon from "@mui/icons-material/Upload";
import CheckIcon from "@mui/icons-material/Check";
import { formatDate } from "@/components/general/date_utils";
import EditIcon from "@mui/icons-material/Edit";
import { useSession } from "next-auth/react";

import Head from "next/head";
import dynamic from "next/dynamic";
import axios from "axios";
import { RouterRounded } from "@mui/icons-material";
import PopUpComponent from "@/components/general/Popup";

const AblyChatComponent = dynamic(
  () => import("../../components/chat/AblyChatComponent"),
  { ssr: false }
);

export default function Process() {
  const { data: session } = useSession();
  const router = useRouter();
  const { process_id } = router.query;

  const [process, setProcess] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [changedDocumentIndex, setChangedDocumentIndex] = useState([]);
  const [uploadedDocument, setUploadedDocument] = useState(null);
  const [isOpen, setIsOpen] = useState(null);
  const [isChatOpen, setChatOpen] = useState(false);

  const toggleChat = () => {
    setChatOpen(!isChatOpen);
  };

  const fetchProcess = async () => {
    const response = await fetch(
      `/api/purchase-docs/with-mongo?process_id=${process_id}`,
      { method: "GET" }
    );

    const userData = await fetch(
      `http://localhost:3000/api/managerProfile/managerP?id=${session.id}`
    );

    const resUser = await userData.json();

    const data = await response.json();

    if (data.result) {
      setProcess(data.result);
      const newDocuments = data.result.documentos.map((doc, i) => {
        // if (doc.nombre_documento == "INE") {
        //   return { ...resUser.userData.documentos[0], _id: i};
        // }
        // //  else if (doc.nombre_documento == "Licencia") {
        // //   return { ...resUser.userData.documentos[1], _id: i};
        // // }
        return { ...doc, _id: i };
      });
      setDocuments(newDocuments);
    }
  };

  // const addToIsOpen = async (newKey) => {
  //   let currentOpen = [...isOpen];
  //   currentOpen.push(newKey);
  //   setIsOpen(currentOpen);
  // };

  // Save the indices that were changed
  const handleDocumentEdit = async (indx) => {

    setIsOpen(null);
    await handleSubmit();
  };

  const handleSubmit = async () => {
    let documentUrl = "";
    const currentDocs = documents;

    const i = changedDocumentIndex;
    const doc = uploadedDocument;

    if (!doc) {
      return;
    }

    documentUrl = await FileUpload(doc);
    currentDocs[i].url = documentUrl;
    currentDocs[i].fecha_modificacion = new Date().toISOString();
    currentDocs[i].estatus = "Pendiente";

    console.log("process_id: " + process_id);
    console.log("doc_index: " + i);
    console.log("file_url: " + documentUrl);
    console.log("update_date: " + currentDocs[i].fecha_modificacion);

    try {
      const result = await fetch(
        `/api/purchase-docs/update-docs-mongo?process_id=${process_id}&doc_index=${i}&file_url=${documentUrl}&update_date=${currentDocs[i].fecha_modificacion}&update_status=${currentDocs[i].estatus}`,
        {
          method: "PUT",
        }
      );

      fetchProcess();
    } catch (error) {
      console.error("Error occurred during the document upload:", error);
    }
  };
  console.log(process_id)
  // Agregar confirmación de cancelación
  const handleCancel = async () => {
    try{
      console.log("estamos en", process_id)
      const result = await axios({
        method: 'delete',
        url: '/api/saleCreation/deleteProcess?process_id=' + process_id,
      });
      
      router.back();
    } catch(error){
      console.log(error)
    }
  };

  const checkValidatedDocs = () => {
    let validatedDocs = true;
    documents.forEach((doc) => {
      if (doc.estatus !== "Aceptado" || doc.estatus !== "ID Validada") {
        validatedDocs = false;
        return validatedDocs;
      }
    });
    validatedDocs = true;
    return validatedDocs;
  };

  useEffect(() => {
    if (!session) {
      return;
    }
    fetchProcess();
    checkValidatedDocs();
    console.log(documents)
  }, [process_id, uploadedDocument, session]);

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
              <a href={params.row.url} target="_blank"> 
                <u>Ver archivo</u>
              </a>
            ) : (
              <div>No hay archivo</div>
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
          const cell =
            params.row.fecha_modificacion !== "" &&
            params.row.fecha_modificacion
              ? formatDate(params.row.fecha_modificacion).formattedShortDate
              : 0;
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
            {isOpen === params.row._id ? (
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
                    setUploadedDocument(file);
                    setChangedDocumentIndex(params.row._id);
                  }}
                />

                <IconButton
                  aria-label="delete"
                  size="small"
                  component="span"
                  type="submit"
                  onClick={() => handleDocumentEdit(params.row._id)}
                >
                  <CheckIcon />
                </IconButton>
              </div>
            ) : (
              <div>
                {params.row.url && params.row.url !== "" ? (
                  <IconButton
                    aria-label="delete"
                    size="small"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsOpen(params.row._id);
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
                      setIsOpen(params.row._id);
                    }}
                  >
                    <UploadIcon />
                  </IconButton>
                )}
              </div>
            )}
          </>
        ),
      },
    ],
    [documents, isOpen]
  );

  console.log(process)
  if (process != null) {
    return (
      <div>
        <Container>
          <Fade in={true} timeout={1000}>
            <div className="section p-5">
              <Typography
                fontFamily="Lato"
                color="#1F1F1F"
                fontSize={{ xs: 25, md: 28, lg: 33 }}
                className="pt-2 text-center"
              >
                Suba los documentos requeridos para finalizar su compra.
              </Typography>
            </div>
          </Fade>

          <Fade in={true} timeout={1500}>
            <div className="section px-5 text-sm-start text-center mb-3">
              <div className="row align-items-center shadow-sm rounded border p-2 mb-3">
                <div className="col-12 col-sm-6">
                  <Typography
                    fontFamily="Lato"
                    color="#1F1F1F"
                    className="pb-3"
                    fontSize={{ xs: 13, md: 14, lg: 16 }}
                  >
                    <strong>Marca:</strong>{" "}
                    <span style={{ color: "#333333" }}>
                      {process.auto.marca}
                    </span>
                  </Typography>
                  <Typography
                    fontFamily="Lato"
                    color="#1F1F1F"
                    className="pb-3"
                    fontSize={{ xs: 13, md: 14, lg: 16 }}
                  >
                    <strong>Modelo:</strong>{" "}
                    <span style={{ color: "#333333" }}>
                      {process.auto.modelo}
                    </span>
                  </Typography>
                  <Typography
                    fontFamily="Lato"
                    color="#1F1F1F"
                    className="pb-3"
                    fontSize={{ xs: 13, md: 14, lg: 16 }}
                  >
                    <strong>Año:</strong>{" "}
                    <span style={{ color: "#333333" }}>{process.auto.ano}</span>
                  </Typography>
                  <Typography
                    fontFamily="Lato"
                    color="#1F1F1F"
                    fontSize={{ xs: 13, md: 14, lg: 16 }}
                  >
                    <strong>Cantidad a pagar:</strong>{" "}
                    <span style={{ color: "#333333" }}>
                      $ {Intl.NumberFormat().format(process.cantidad_a_pagar)}{" "}
                      MXN
                    </span>
                  </Typography>
                </div>
                <div className="col-12 col-sm-6">
                  <img
                    src={process.auto.array_fotografias_url[0]}
                    alt="auto"
                    className="img-fluid rounded"
                  />
                </div>
              </div>

              <div className="row align-items-center shadow-sm rounded border p-2">
                <div className="col-12 col-sm-6">
                  <Typography
                    fontFamily="Lato"
                    color="#1F1F1F"
                    className="py-1"
                    fontSize={{ xs: 13, md: 14, lg: 16 }}
                  >
                    <strong>Vendedor Asignado</strong>
                  </Typography>
                  <Typography
                    fontFamily="Lato"
                    color="#8a8a8a"
                    className="py-1"
                    fontSize={{ xs: 13, md: 14, lg: 16 }}
                  >
                    Hola! Soy tu vendedor,<br />
                    estaré revisando tus documentos y contestando las dudas que tengas. <br />
                  </Typography>
                </div>
                <div className="col-12 col-sm-6 ">
                  <Typography
                    fontFamily="Lato"
                    color="#1F1F1F"
                    className="py-1"
                    fontSize={{ xs: 13, md: 14, lg: 16 }}
                  >
                    <strong>Agencia</strong>
                  </Typography>
                  <Typography
                    fontFamily="Lato"
                    color="#8a8a8a"
                    className="py-1"
                    fontSize={{ xs: 13, md: 14, lg: 16 }}
                  >
                    Nombre: {process.agencia.nombres} <br />
                    Dirección: {process.agencia.direccion.calle}{" "}
                    {process.agencia.direccion.numero_exterior}{" "}
                    {process.agencia.direccion.ciudad}{" "}
                    {process.agencia.direccion.estado}{" "}
                    {process.agencia.direccion.pais}{" "}
                    {process.agencia.direccion.codigo_postal}
                    <br />
                    Teléfono: {process.agencia.numero_telefonico} <br />
                    Email: {process.agencia.email}
                  </Typography>
                </div>
              </div>
            </div>
          </Fade>

          <Fade in={true} timeout={1500}>
            <div className="section">
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
          </Fade>

          <Fade in={true} timeout={1500}>
            <div className="container text-center mt-4">
              <div className="row">
                  <div className="col-12 col-sm-6">
                  <PopUpComponent 
                title="Cancelar solicitud de compra"
                popUpContent={
                  <div className="text-center mt-3"> <p> ¿Estás segurx que quieres cancelar tu proceso de compra? </p>
                  <p> Al hacer click en &quot;Cancelar proceso&quot; estás confirmando de forma definitiva que quieres cancelar tu solicitud de compra. </p>
                  <Button
                      variant="contained"
                      onClick={handleCancel}
                      type="submit"
                      className="w-80"
                      sx={{
                          fontFamily: "Lato",
                          ":hover": {
                              backgroundColor: "red",
                          },
                      }}
                  >
                      Cancelar proceso
                  </Button>
                  </div>
                }
                btnOpen={
                  <Button
                sx={{
                  fontFamily: "Lato",
                color: "#FFFFFF",
                  width: 150,
                  backgroundColor: "gray",
                  // ":hover": {
                  //   backgroundColor: "#F68E70",
                  // },
                }}
                disableElevation
                type="button"
                className="me-4"
              >
                Cancelar
              </Button>
                }
              />
                  </div>
                  <div className="col-12 col-sm-6">
                  <CheckoutPage
                id={process_id}
                validatedDocs={checkValidatedDocs()}
                items={[
                  {
                    price_data: {
                      currency: 'mxn',
                      product_data: {
                        name: `${process.auto.marca} ${process.auto.modelo} ${process.auto.ano}`,
                        description: "Compra de auto",
                        images: [process.auto.array_fotografias_url[0]],
                      },
                      unit_amount: Math.floor(parseFloat(process.cantidad_a_pagar) * 100),
                    },
                    quantity: 1,
                  },
                ]}
              />
                  </div>
              </div>
              
              {/* <Button
                variant="outlined"
                sx={{
                  fontFamily: "Lato",
                  color: "000000",
                  width: 150,
                  // ":hover": {
                  //   backgroundColor: "#F68E70",
                  // },
                }}
                onClick={handleCancel} 
                disableElevation
                type="button"
                href="/catalog"
                className="me-4"
              >
                Cancelar
              </Button> */}

              
            </div>
          </Fade>
        </Container>
        <div className="container">
          <Head>
            <link
              rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
              integrity="sha384-iBBgrCyberBlbChJLlKDcUWP7t8GwgaKI21Jc6CZP97ZvsjFjE9+3YF5nkvP1kj"
              crossorigin="anonymous"
            />
          </Head>

          <button className="chat-toggle-btn" onClick={toggleChat}>
            Chat
          </button>

          {isChatOpen && (
            <main className="chat-popup">
              <h4 className="title">Vendedor</h4>
              <AblyChatComponent id_purchase={process_id} />
            </main>
          )}

          <style jsx>{`
        .container {
          position: relative;
          display: grid;
          grid-template-rows: 1fr 100px;
          // min-height: 100vh;
          // background-color: aqua;
        }

        main {
          display: grid;
          grid-template-rows: auto 1fr;
          width: 70%
          max-width: 900px;
          margin: 20px auto;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.12),
            0px 1px 2px rgba(0, 0, 0, 0.24);
          background-color: white;
          position: fixed; 
          bottom: 2px; 
          right: 110px; 
          z-index: 1000; 
        }

        chat-popup {
          position: fixed;
          bottom: 0;
          transform: translateY(100%);
          transition: transform 1s ease-in-out;  // Increased from 0.3s to 0.5s
        }

        .chat-popup.open {
          transform: translateY(0);
        }

        .title {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 75px;
          margin: 0;
          color: white;
          background: #383838; 
        }
        
        .chat-toggle-btn {
          position: fixed; 
          bottom: 20px; 
          right: 20px; 
          z-index: 1000; 
          font-size: 1em;
          padding: 10px 20px;
          border: none;
          border-radius: 50px;
          color: #fff;
          background-color: #f55c7a;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .chat-toggle-btn:hover {
          background-color: #f77a92; 
        }

        .chat-toggle-btn:focus {
          outline: none; 
        }


      `}</style>

          <style jsx global>{`
            html,
            body {
              padding: 0;
              margin: 0;
              font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
                Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
                sans-serif;
              color: #333; // Dark grey color for text
            }

            * {
              box-sizing: border-box;
            }

            [data-author="me"] {
              display: flex;
              background-color: #f55c7a;
              color: white;
              align-self: flex-end;
              flex-grow: 0;
              border-radius: 20px 5px 20px 20px;
            }

            [data-author="other"] {
              color: #383838;
              align-self: flex-start;
              border-radius: 5px 20px 20px 20px;
            }
          `}</style>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <p>Cargando ...</p>
      </div>
    );
  }
}
