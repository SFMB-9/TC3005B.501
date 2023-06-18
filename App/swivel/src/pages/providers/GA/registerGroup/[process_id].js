import { useRouter } from 'next/router'
import React, { useState, useEffect, useMemo } from "react";
import FileUpload from "@/pages/api/uploadBucketDoc/uploadBucketDoc";
import { Container, Typography, Button, IconButton, Fade, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import DataTable from "@/components/general/Table";
import UploadIcon from "@mui/icons-material/Upload";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from '@mui/icons-material/Edit';
import axios from "axios";
import GANavbar from '@/components/providers/GA/navbar';
import styles from '@/styles/test_details.module.css';
import PhaseIndicator from '@/components/general/phase_indicator';
import { formatDate } from "@/components/general/date_utils";
import LoadingScreen from "@/components/general/LoadingScreen";

export default function RegisterGroupProcess() {
    const router = useRouter();
    const { process_id } = router.query;

    const [process, setProcess] = useState(null);
    const [documents, setDocuments] = useState([]);
    const [changedDocumentIndex, setChangedDocumentIndex] = useState([]);
    const [uploadedDocument, setUploadedDocument] = useState(null);
    const [isOpen, setIsOpen] = useState();
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const fetchProcess = async () => {
        const response = await fetch(
            `/api/purchase-docs/with-mongo?process_id=${process_id}`,
            { method: "GET" }
        );

        const data = await response.json();

        if (data.result) {
            setProcess(data.result);
            const newDocuments = data.result.documentos.map((doc, i) => {
                return { ...doc, _id: i };
            });
            setDocuments(newDocuments);
        }
    };

    // const addToIsOpen = async (newKey) => {
    //     let currentOpen = [...isOpen];
    //     currentOpen.push(newKey);
    //     setIsOpen(currentOpen);
    // };

    // Save the indices that were changed
    const handleDocumentEdit = async (indx) => {

        setIsOpen(null);
        await handleSubmit();
    };

    const handleSubmit = async () => {
        let documentUrl = "";
        const currentDocs = documents;

        console.log("changedDocument: " + uploadedDocument);
        const i = changedDocumentIndex;
        const doc = uploadedDocument;

        if (!doc) {
            return;
        }

        try {
            documentUrl = await FileUpload(doc);
        } catch (error) {
            // Handle the error here. For example, you can show a popup with the error message.
            console.error('File upload failed:', error.message);
            // Show a popup with the error message
            // alert(error.message);
            setError(error.message); // Set the error message
            handleClickOpen(); // Open the modal
            return;
        }
        currentDocs[i].url = documentUrl;
        currentDocs[i].fecha_modificacion = new Date().toISOString();
        currentDocs[i].estatus = "En_Revision";

        console.log("process_id: " + process_id);
        console.log("doc_index: " + i);
        console.log("file_url: " + documentUrl);
        console.log("update_date: " + currentDocs[i].fecha_modificacion);

        const result = await fetch(
            `/api/purchase-docs/update-docs-mongo?process_id=${process_id}&doc_index=${i}&file_url=${documentUrl}&update_date=${currentDocs[i].fecha_modificacion}&update_status=${currentDocs[i].estatus}`,
            {
                method: "PUT",
            }
        );

        const data = await result.json();

        fetchProcess();
    };

    const handleConfirmRegister = async () => {

        const body = {
            "nombres": process.info_GA.nombres,
            "apellidos": "",
            "email": process.info_GA.email,
            "tipo_usuario": "gaEntity",
            "numero_telefonico": process.info_GA.numero_telefonico,
            "rfc": process.info_GA.rfc_grupo_automotriz,
            "url": process.info_GA.url_grupo_automotriz,
            "direccion": {
                "calle": process.info_GA.direccion.calle,
                "numero_exterior": process.info_GA.direccion.numero_exterior,
                "numero_interior": process.info_GA.direccion.numero_interior,
                "ciudad": process.info_GA.direccion.ciudad,
                "estado": process.info_GA.direccion.estado,
                "pais": process.info_GA.direccion.pais,
                "codigo_postal": process.info_GA.direccion.codigo_postal
            },
            "legal": {
                "lNombres": process.info_GA.legal.nombres,
                "lApellidos": process.info_GA.legal.apellidos,
                "lEmail": process.info_GA.legal.email,
                "lPhone": process.info_GA.legal.numero_telefonico
            },
            "usuario_ga_id": process.usuario_ga_id
        }

        try {
            const result = await axios.post("/api/register", body);
            console.log(result);
            if (result.status == 200) {
                alert("Registro exitoso");
                router.push("/providers/GA");
            } else {
                alert("Error al registrar");
            }

        } catch (error) {
            console.log(error);
            alert("Error al registrar");
        }
    }

    useEffect(() => {
        if (!process_id) {
            return;
        }
        fetchProcess();
    }, [process_id, uploadedDocument]);

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
                field: "url",
                headerName: "Archivo",
                headerAlign: "center",
                align: "center",
                minWidth: 150,
                flex: 2,
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
                valueGetter: (params) => {
                    const cell = params.row.estatus;
                    if (cell === "En_Revision") {
                        return "En revisión";
                    }
                    else if (cell === "aceptado") {
                        return "Aceptado";
                    }
                    else if (cell === "rechazado") {
                        return "Rechazado";
                    }
                    return cell;
                },
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

    const phases = ['Datos', 'Legal', 'Documentos'];

    if (process != null) {
        return (
            <div>
                <GANavbar />
                <h1 className={styles.request}>Solicitud de registro de Grupo Automotriz</h1>
                <PhaseIndicator phases={phases} currentPhaseIndex={2} />
                <Container
                // maxWidth="lg"
                >
                    <Fade in={true} timeout={1000}>
                        <div className="section p-5">
                            <Typography
                                fontFamily="Lato"
                                color="#1F1F1F"
                                fontSize={{ xs: 25, md: 28, lg: 33 }}
                                className="pt-2 text-center"
                            >
                                Entrega de documentos
                                {/* Suba los documentos requeridos para realizar su registro de Grupo Automotriz */}
                            </Typography>
                        </div>
                    </Fade>
                    <Fade in={true} timeout={1500}>
                    <div>
                            <Dialog
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle>
                                    El documento que se subió no está permitido.
                                </DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        {error}
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose} color="primary" autoFocus>
                                        Cerrar
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                    </Fade>
                    <Fade in={true} timeout={1500}>
                        <div className="section px-5 text-sm-start text-center mb-3">
                            <div className="container shadow-sm rounded border p-2 mb-3">
                                <div className="row mt-4">
                                    <div className="col-12 col-md-6">
                                        <h5
                                            style={{
                                                paddingLeft: "1.2rem",
                                            }}
                                        >
                                            Nombre del grupo automotriz:
                                            {" "}
                                            <span style={{
                                                color: "#333333",
                                                fontWeight: "lighter",
                                                fontSize: "1.1rem"
                                            }}>
                                                {process.info_GA.nombres}
                                            </span>
                                        </h5>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <h5
                                            style={{
                                                paddingLeft: "1.2rem",
                                            }}
                                        >
                                            Sitio web:
                                            {" "}
                                            <span style={{
                                                color: "#333333",
                                                fontWeight: "lighter",
                                                fontSize: "1.1rem"
                                            }}>
                                                {process.info_GA.url_grupo_automotriz}
                                            </span>
                                        </h5>
                                        {/* <Typography
                                        fontFamily="Lato"
                                        color="#1F1F1F"
                                        className="pb-3"
                                        fontSize={{ xs: 13, md: 14, lg: 16 }}
                                    >
                                        <strong>Website:</strong>{" "}
                                        <span style={{ color: "#333333" }}>
                                            {process.info_GA.url_grupo_automotriz}
                                        </span>
                                    </Typography> */}
                                    </div>
                                </div>
                                <div className="row mt-4 mb-4">
                                    <div className="col-12 col-md-6">
                                        <h5
                                            style={{
                                                paddingLeft: "1.2rem",
                                            }}
                                        >
                                            Número telefónico: {" "}
                                            <span style={{
                                                color: "#333333",
                                                fontWeight: "lighter",
                                                fontSize: "1.1rem"
                                            }}>
                                                {process.info_GA.numero_telefonico}
                                            </span>
                                        </h5>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <h5
                                            style={{
                                                paddingLeft: "1.2rem",
                                            }}
                                        >
                                            Correo electrónico: {" "}
                                            <span style={{
                                                color: "#333333",
                                                fontWeight: "lighter",
                                                fontSize: "1.1rem"
                                            }}>
                                                {process.info_GA.email}
                                            </span>
                                        </h5>
                                    </div>
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
                        <div className="text-center mt-4 mb-5">
                            <Button
                                variant="outlined"
                                sx={{
                                    fontFamily: "Lato",
                                    color: "000000",
                                    width: "auto",
                                    // ":hover": {
                                    //   backgroundColor: "#F68E70",
                                    // },
                                }}
                                disableElevation
                                type="button"
                                onClick={() => router.back()}
                                className="me-4"
                            >
                                Cancelar
                            </Button>

                            <Button
                                variant="contained"
                                sx={{
                                    fontFamily: "Lato",
                                    width: "auto",
                                    ":hover": {
                                        backgroundColor: "#F68E70",
                                    },
                                }}
                                disabled={process.estatus_validacion != "aceptado"}
                                type="button"
                                onClick={handleConfirmRegister}
                            >
                                Confirmar creación de grupo automotriz
                            </Button>
                        </div>
                    </Fade>
                </Container>
            </div>
        );
    } else {
        return (
            <div>
                <LoadingScreen />
            </div>
        );
    }




}