/*
This page displays the details of a request
Author: Mateo Herrera
*/

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import DataTable from "@/components/general/Table";
import { Select, MenuItem, Button, Typography } from "@mui/material";
import SellerNavbar from "@/components/providers/seller/navbar";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import { formatDate } from "@/components/general/date_utils";
import { Link } from "react-router-dom";
import TextField from '@mui/material/TextField';
import LoadingScreen from "@/components/general/LoadingScreen";

import Head from "next/head";
import dynamic from "next/dynamic";
import { set } from "mongoose";

const AblyChatComponent = dynamic(
  () => import("@/components/chat/AblyChatComponent"),
  { ssr: false }
);

const RequestDetails = () => {
  const router = useRouter();
  const [request, setRequests] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [user, setUser] = useState({});
  const { id, user_id } = router.query;
  const [isChatOpen, setChatOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const toggleChat = () => {
    setChatOpen(!isChatOpen);
  };

  // This function fetches the request details using the _id in the URL
  const fetchRequests = async () => {
    console.log("id", id);
    const res = await axios.get(
      "/api/DrivingRequestsSeller/getDrivingRequest",
      { params: { _id: id } }
    );
    const r = res.data.proceso[0];
    console.log(r);
    const d = r.documentos.map((doc, index) => ({
      ...doc,
      comment: "",
      _id: index,
    }));
    //const d = r.documentos
    setRequests(r);
    setDocuments(d);
  };

  const fetchUser = async () => {
    console.log("user_id", user_id);
    // This function fetches the user details using the _id in the URL
    const res = await axios.get("/api/managerProfile/managerP", {
      params: { id: user_id },
    });

    const u = res.data.userData;
    setUser(u);
  };

  useEffect(() => {
    if (id) {
      fetchRequests();
    }
  }, [id]);

  useEffect(() => {
    if (user_id) {
      fetchUser();
    }
  }, [user_id]);

  if (router.isFallback) {
    return <div> <LoadingScreen/> </div>;
  }

  const updateAnyDocument = async (status, i, phone) => {
      setIsLoading(true)
    const upd = await axios.post("/api/superadmin/updateAnyDocStatus", {
      id: id,
      status: status,
      index: i
    });

    await axios.post('/api/twilio/message', { 
      to: `+521${phone}` , 
      message: `*SWIVEL*\nActualización de tu proceso de compra\nEstado: ${status}` 
    });

    fetchRequests();
  }

  const commentAnyDocument = async (comm, i) => {
    setIsLoading(true)
    const upd = await axios.post("/api/superadmin/updateAnyDocComment", {
      id: id,
      comment: comm,
      index: i
    });

    fetchRequests();
  }

  const rowsDoc = documents;
  const columnsDoc = [
      {
      field: "nombre_documento",
      headerName: "Documento",
      headerAlign: "center",
      align: "center",
      minWidth: 150,
      flex: 1,
      },
      {
      field: "fecha_modificacion",
      type: "date",
      headerName: "Fecha de Modificación",
      headerAlign: "center",
      align: "center",
      minWidth: 150,
      flex: 1,
      valueFormatter: (params) =>
          new Date(params.value).toLocaleDateString("es-ES", {
              year: "numeric",
              month: "numeric",
              day: "numeric",
          }),
      },
      {
          field: "estatus",
          headerName: "Estatus",
          headerAlign: "center",
          align: "center",
          minWidth: 150,
          flex: 1,
          type: "actions",
          renderCell: (params) => (
          <Select
            value={params.row.estatus}
            onChange={(e) =>
              updateAnyDocument(e.target.value,params.row._id,user.numero_telefonico)
            }
            label="Status"
            variant="standard"
            size="small"
            color="primary"
            sx={{ fontFamily: "Lato", fontSize: "12px" }}
          >
              <MenuItem value="Pendiente">En Proceso</MenuItem>
              <MenuItem value="Aceptado">Aprobado</MenuItem>
              <MenuItem value="Rechazado">Rechazado</MenuItem>
          </Select>
          ),
      },
      {
        field: 'comentarios',
        headerName: 'Comentarios',
        width: 200,
        renderCell: (params) => {
          const [isEditing, setIsEditing] = useState(false);
          const [value, setValue] = useState(params.value?.toString() || '');
          const [savedValue, setSavedValue] = useState(params.value?.toString() || '');
    
          const handleEditClick = () => {
            setIsEditing(true);
          };
    
          const handleSaveClick = (value,i) => {
            console.log("hello")
            // Perform saving logic here, e.g., update the value in the data source
            commentAnyDocument(value,i)
            setSavedValue(value);
            setIsEditing(false);
          };
    
          const handleInputChange = (event) => {
            setValue(event.target.value);
          };
    
          return isEditing ? (
            <TextField
              fullWidth
              value={value}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === ' ') {
                  e.stopPropagation();
                  e.preventDefault();
                  setValue(value + ' ');
                }
                if (e.key === 'Enter') {
                  handleSaveClick(value, params.row._id);
                }
              }}
            />
          ) : (
            <div>
              {savedValue}
              <Button onClick={handleEditClick}>Edit</Button>
            </div>
          );
        }
      },
      {
          field:"descarga",
          minWidth:150,
          headerName:"Archivo",
          headerAlign:"center",
          type:"actions",
          renderCell: (params) => (
          <>
          {params.row.url && params.row.url !== " " ? (
              <a href={params.row.url} target="_blank">
              <u>Ver archivo</u>
              </a>) : (<div> No hay archivo </div>) }
          </>
          )
      }
  ]

  const rows = documents;
  console.log(documents);

  return (
    // This is the page that displays the details of a request
    <>
      <SellerNavbar />
      {/* {isLoading && <LoadingScreen />} */}
      <div className="px-lg-5 mx-xl-5">
        <div className="section px-2">
          <div className="px-3">
            <Typography
              variant="h4"
              fontWeight="bold"
              className="pt-5 pb-4"
              sx={{ fontFamily: "Lato", color: "#333333" }}
            >
              Solicitud de Compra
            </Typography>
            <div className="row">
              <div className="col-4">
                {/*Car details*/}

                <ul className="list-group">
                  <li
                    className="list-group-item"
                    style={{ backgroundColor: "#333333" }}
                  >
                    {" "}
                    <Typography
                      variant="h7"
                      fontWeight="bold"
                      sx={{ fontFamily: "Lato", color: "#FFFFFF" }}
                    >
                      Auto
                    </Typography>
                  </li>

                  {request.auto ? (
                    <>
                      <li
                        className="list-group-item"
                        style={{ fontFamily: "Lato", fontSize: 11 }}
                      >
                        {request.auto.marca}
                      </li>
                      <li
                        className="list-group-item"
                        style={{ fontFamily: "Lato", fontSize: 11 }}
                      >
                        {request.auto.modelo}
                      </li>
                      <li
                        className="list-group-item"
                        style={{ fontFamily: "Lato", fontSize: 11 }}
                      >
                        ${Intl.NumberFormat().format(request.auto.precio)}
                      </li>
                    </>
                  ) : (
                    <li className="list-group-item">No hay auto</li>
                  )}
                </ul>
              </div>
              <div className="col">
                <ul className="list-group">
                  <li
                    className="list-group-item"
                    style={{ backgroundColor: "#333333" }}
                  >
                    {" "}
                    <Typography
                      variant="h7"
                      fontWeight="bold"
                      sx={{ fontFamily: "Lato", color: "#FFFFFF" }}
                    >
                      Cliente
                    </Typography>
                  </li>

                  {user ? (
                    <>
                      <li
                        className="list-group-item"
                        style={{ fontFamily: "Lato", fontSize: 11 }}
                      >
                        {user.nombres} {user.apellidos}
                      </li>
                      <li
                        className="list-group-item"
                        style={{ fontFamily: "Lato", fontSize: 11 }}
                      >
                        {user.email}
                      </li>
                      <li
                        className="list-group-item"
                        style={{ fontFamily: "Lato", fontSize: 11 }}
                      >
                        {user.numero_telefonico}
                      </li>
                    </>
                  ) : (
                    <li className="list-group-item">No hay cliente</li>
                  )}
                </ul>
              </div>
              {/*User details*/}
            </div>
          </div>
        </div>
        {/* This is the table that displays the documents of a request*/}

        <div className="section px-2">
          <div className="p-3 pt-2">
          <h4>Documentos</h4>
            <DataTable
                rows={rowsDoc}
                columns={columnsDoc}
                getRowId={(row) => row._id} 
            >
            </DataTable>
          </div>
        </div>
      </div>
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
            <h4 className="title">{user.nombres + " " + user.apellidos}</h4>
            <AblyChatComponent id_purchase={id}/>
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
    </>
  );
};

export default RequestDetails;
