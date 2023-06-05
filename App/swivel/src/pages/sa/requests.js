/*

This page shows a request dashboard that shows both A/GA requests - both on separate
tabs, and within each tab, filtered by completed or pending.

 - Francisco Salcedo

*/

import axios from "axios";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/router';

import DataTable from "@/components/general/Table";
import SimpleAccordion from "@/components/general/Accordion";


import { Select, MenuItem, Typography, Button} from "@mui/material";
import SANavbar from '@/components/SA/navbar';


const SARequestDashboard = () => {


  const [requestsGA, setRequestsGA] = useState([]);
  const [requestsGAFilter, setRequestsGAFilter] = useState("all");



  const [requestsA, setRequestsA] = useState([]);
  const [requestsAFilter, setRequestsAFilter] = useState("all");

  const { data: session } = useSession();
  const router = useRouter();


  useEffect(() => {

    const getRequestsData = async () => {

      try {

        const resp = await axios.get(
          "/api/superadmin/allSARequests",
          {}
        )

        const allRequests = resp.data.allRequests

        const reqGA = allRequests.filter(r => r.tipo_proceso === 'peticionGA');
        const reqA = allRequests.filter(r => r.tipo_proceso === 'peticionA');


        setRequestsGA(reqGA)
        setRequestsA(reqA)

      } catch (err) {
        console.log(err)
      }

    };

    if (session) {
      getRequestsData();
    } else {
      router.push("/auth/login");
    }

  }, [session]);


    const handleDetail = (params,type) => {
      router.push(`/sa/find/req/`+type+"/"+params)
    }

  const updateAnyRequest = async (_id, status) => {

    const upd = await axios.post("/api/superadmin/updateAnySARequestStatus", {
      id:_id,
      status:status
    });





    const tempRequestsGA = requestsGA.map((request) => {
      if (request._id === _id) {
        return { ...request, status }
      }
      else {
        return request
      }

    });

    const tempRequestsA = requestsA.map((request) => {
      if (request._id === _id) {
        return { ...request, status }
      }
      else {
        return request
      }

    });

    setRequestsGA(tempRequestsGA);
    setRequestsA(tempRequestsA);
  };



  if (requestsGA && requestsA) {

    console.log("prep")
    console.log(requestsGA)
    console.log(requestsA)
    const columnsGA = [
      {
        field: "_id",
        headerName: "Número de Solicitud",
        headerAlign: "center",
        align: "center",
        minWidth: 150,
        flex: 1,
      },
      {
        field: "grupo_automotriz",
        headerName: "Grupo Automotriz",
        headerAlign: "center",
        align: "center",
        minWidth: 150,
        flex: 1,
      },
      {
        field: "fecha_inicio",
        type: "date",
        headerName: "Fecha de Solicitud",
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
        field: "estatus_validacion",
        headerName: "Estatus",
        headerAlign: "center",
        align: "center",
        minWidth: 150,
        flex: 1,
        type: "actions",
        renderCell: (params) => (
          <Select
            value={params.row.estatus}
            onChange={(e) => updateAnyRequest(params.row._id, e.target.value)}
            label="Estatus"
          >
            <MenuItem value="pendiente">En Proceso</MenuItem>
            <MenuItem value="Aceptada">Aprobado</MenuItem>
            <MenuItem value="Rechazada">Rechazado</MenuItem>
          </Select>
        ),
      },
      {
        field: "detalles",
        headerName: "Detalles",
        headerAlign: "center",
        align: "center",
        minWidth: 150,
        flex: 1,
        type: "actions",
        renderCell: (params) => (
          <Button
            variant="contained"
            disableElevation
            onClick={(e) =>
            handleDetail(params.row._id,"ga")
            
            }
            className="py-0"
            sx={{
              fontFamily: "Lato",
              fontSize: "12px",
              backgroundColor: "#111439",
            }}
          >
            Ver detalles
          </Button>
        ),
      },
    ];

    const rowsGA = requestsGA.filter((request) => {
      if (requestsGAFilter === "all") {
        return true;
      } else {
        return request.status === requestsGAFilter;
      }
    });

    const columnsA = [
      {
        field: "agencia_id",
        headerName: "Número de Solicitud",
        headerAlign: "center",
        align: "center",
        minWidth: 150,
        flex: 1,
      },
      {
        field: "tipo_proceso",
        headerName: "Agencia",
        headerAlign: "center",
        align: "center",
        minWidth: 150,
        flex: 1,
      },
      {
        field: "fecha_inicio",
        type: "date",
        headerName: "Fecha de Solicitud",
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
            value={params.row.status}
            onChange={(e) => updateAnyRequest(params.row._id, e.target.value)}
            label="Estatus"
          >
            <MenuItem value="pendiente">En Proceso</MenuItem>
            <MenuItem value="Aceptada">Aprobado</MenuItem>
            <MenuItem value="Rechazada">Rechazado</MenuItem>
          </Select>
        ),
      },
      {
        field: "detalles",
        headerName: "Detalles",
        headerAlign: "center",
        align: "center",
        minWidth: 150,
        flex: 1,
        type: "actions",
        renderCell: (params) => (
          <Button
            variant="contained"
            disableElevation
onClick={(e) =>
            handleDetail(params.row._id,"ag")
            
            }
            className="py-0"
            sx={{
              fontFamily: "Lato",
              fontSize: "12px",
              backgroundColor: "#111439",
            }}
          >
            Ver detalles
          </Button>
        ),
      },
    ];

    const rowsA = requestsA.filter((request) => {
      if (requestsAFilter === "all") {
        return true;
      } else {
        return request.status === requestsAFilter;
      }
    });


    return (
      <>
        <SANavbar />
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '2rem',
            flexDirection: 'column'
          }}
        >
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
            Gestión de solicitudes
          </Typography>

          {
            requestsGA.length > 0 ?
              (
                <>
                  <div
                    style={{
                      marginTop: '2rem',
                      width: '85%',
                    }}
                  >
                    <SimpleAccordion
                      content={
                        <DataTable
                          rows={rowsGA}
                          columns={columnsGA}
                          getRowId={(row) => row.id} 
                        ></DataTable>
                      }
                      backgroundColorTitle="#F7F7F7"
                      fontFamily="Lato"
                      fontSize={{ xs: 13, md: 15, lg: 16 }}
                      color="#333333"
                    >
                      <p style={{justifyContent: 'center', margin:'0'}}>
                      Solicitudes de Grupo Automotriz
                      </p>
                    </SimpleAccordion>
                  </div>
                </>
              ) : <div></div>}{
               requestsA.length > 0 ?
                (
                  <>
                    <div
                    style={{
                      marginTop: '2rem',
                      width: '85%',
                    }}
                  >
                    <SimpleAccordion
                      content={
                        <DataTable
                          rows={rowsA}
                          columns={columnsA}
                          getRowId={(row) => row.id} 
                        ></DataTable>
                      }
                      backgroundColorTitle="#F7F7F7"
                      fontFamily="Lato"
                      fontSize={{ xs: 13, md: 15, lg: 16 }}
                      color="#333333"
                    >
                      Solicitudes de Agencias
                    </SimpleAccordion>
                  </div>
                  </>
                )
              :
              <div></div>
            }
          }
        </div>
      </>
    );
  } else {
    <div>Cargando...</div>
  }
}

export default SARequestDashboard
