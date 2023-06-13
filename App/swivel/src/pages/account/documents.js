import { Container, Typography, Button, IconButton, Fade } from "@mui/material";
import React, { useState, useEffect, useMemo  } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import UploadIcon from "@mui/icons-material/Upload";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from '@mui/icons-material/Edit';

import AccountLayout from '@/components/buyer/account_layout';
import DataTable from "@/components/general/Table";
import FileUpload from "@/pages/api/uploadBucketDoc/uploadBucketDoc";
import { formatDate } from "@/components/general/date_utils";

export default function Documents() {
  const router = useRouter();
  //const { id } = router.query;
  //console.log("id", id);
  
  const [documents, setDocuments] = useState([]);
  const [apiData, setApiData] = useState(null);
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(null);
  const [uploadedDocument, setUploadedDocument] = useState(null);
  const [changedDocumentIndex, setChangedDocumentIndex] = useState([]);
  
  // console.log("session", session.id);
  const fetchData = async () => {
    const resData = await fetch(
      `http://localhost:3000/api/managerProfile/managerP?id=${session.id}`
    );

    const res = await resData.json();
    setApiData(res.userData);
    if (res.userData) {
      // setApiData(res.userData);
      const newDocuments = res.userData.documentos.map((doc, i) => {
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

  const handleDocumentEdit = async (indx) => {

    setIsOpen(null);
    await handleSubmit();
  };

  const handleSubmit = async () => {
    let documentUrl = "";
    const currentDocs = documents;

    // console.log("changedDocument: " + uploadedDocument);
    const i = changedDocumentIndex;
    const doc = uploadedDocument;

    if (!doc) {
      return;
    }

    documentUrl = await FileUpload(doc);
    // console.log(documentUrl);

    currentDocs[i].url = documentUrl;
    currentDocs[i].fecha_modificacion = new Date().toISOString();
    

    // console.log("process_id: " + session.id);
    // console.log("doc_index: " + i);
    // console.log("file_url: " + documentUrl);
    // console.log("update_date: " + currentDocs[i].fecha_modificacion);
    try {
      const result = await fetch(
        `http://localhost:3000/api/buyerProfile/updateUserDocs?id=${session.id}&doc_index=${i}&file_url=${documentUrl}&update_date=${currentDocs[i].fecha_modificacion}&update_status=Subido`,
        {
          method: "PUT",
        }
      );
      
      fetchData();
    } catch (error) {
      console.error("Error occurred during the API request:", error);
    }
  };

  useEffect(() => {
    if (!session) {
      return;
    }
    fetchData();
  }, [session, uploadedDocument]);

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
          const cell = params.row.fecha_modificacion !== "" && params.row.fecha_modificacion ? formatDate(params.row.fecha_modificacion).formattedShortDate : "";
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

  if (apiData && session) {
    return (
      <AccountLayout>
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
      </AccountLayout>
    )
  } else {
    return (
      <div
      >
        Cargando...
      </div>
    )
  }
}