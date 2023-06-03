/*

This page shows a request dashboard that shows both A/GA requests - both on separate
tabs, and within each tab, filtered by completed or pending.

 - Francisco Salcedo

*/

import axios from "axios";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import DataTable from "@/components/general/Table";
import SimpleAccordion from "@/components/general/Accordion";


import { Select, MenuItem, Typography } from "@mui/material";
import SANavbar from '@/components/SA/navbar';
import CollapsibleContainer from '@/components/general/collapsing_div';


const SARequestDashboard = () => {


  const [requestsGA, setRequestsGA] = useState([]);
  const [requestsGAFilter, setRequestsGAFilter] = useState("all");



  const [requestsA, setRequestsA] = useState([]);
  const [requestsAFilter, setRequestsAFilter] = useState("all");

  const { data: session } = useSession();


  useEffect(() => {

    const getRequestsData = async () => {

      try {

        const resp = await axios.get(
          "/api/superadmin/allSARequests",
          {}
        )

        const allRequests = resp.data.allRequests

        const reqGA = allRequests.filter(r => r.tipo_proceso === 'registroGA');
        const reqA = allRequests.filter(r => r.tipo_proceso === 'registroA');

        setRequestsGA(reqGA)
        setRequestsA(reqA)

      } catch (err) {
        console.log(err)
      }

    };

    if (session) {
      getRequestsData();
    }

  }, [session]);




  const updateAnyRequest = async (_id, status) => {

    await axios.put("/api/superadmin/updateAnySARequestStatus", {
      _id,
      status
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

  console.log("requestsGA", requestsGA.length);
  if (requestsGA && requestsA) {
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
        field: "nombres",
        headerName: "Grupo Automotriz",
        headerAlign: "center",
        align: "center",
        minWidth: 150,
        flex: 1,
      },
      {
        field: "fecha_solicitud",
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
            value={params.row.status}
            onChange={(e) => updateAnyRequest(params.row._id, e.target.value)}
            label="Estatus"
          >
            <MenuItem value="En_Revision">En Proceso</MenuItem>
            <MenuItem value="Aceptada">Aprobado</MenuItem>
            <MenuItem value="Rechazada">Rechazado</MenuItem>
          </Select>
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
        field: "solicitud_agencia_id",
        headerName: "Número de Solicitud",
        headerAlign: "center",
        align: "center",
        minWidth: 150,
        flex: 1,
      },
      {
        field: "nombre",
        headerName: "Agencia",
        headerAlign: "center",
        align: "center",
        minWidth: 150,
        flex: 1,
      },
      {
        field: "fecha_solicitud",
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
            value={params.row.status}
            onChange={(e) => updateAnyRequest(params.row._id, e.target.value)}
            label="Estatus"
          >
            <MenuItem value="En_Revision">En Proceso</MenuItem>
            <MenuItem value="Aceptada">Aprobado</MenuItem>
            <MenuItem value="Rechazada">Rechazado</MenuItem>
          </Select>
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

    console.log(rowsGA)



    // if (!requestsGA || !requestsA) {
    //   return null;
    // }

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
                  {/* <div>
                  <CollapsibleContainer header="Solicitudes de Agencia">

                    <DataTable
                      rows={rowsGA}
                      columns={columnsGA}
                    ></DataTable>

                  </CollapsibleContainer>
                </div> */}
                </>
              )
              : requestsA.length > 0 ?
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
                          columns={columnsGA}
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
        </div>
        {/* <CollapsibleContainer header="Solicitudes de Grupo Automotriz"> */}
        {/* </CollapsibleContainer> */}



      </>
    );
  } else {
    <div>Cargando...</div>

  }

}

export default SARequestDashboard
