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
import LoadingScreen from "@/components/general/LoadingScreen";

import { Select, MenuItem, Typography, Button} from "@mui/material";
import SANavbar from '@/components/SA/navbar';


const SARequestDashboard = () => {


  const [requestsGA, setRequestsGA] = useState([]);
  const [requestsGAFilter, setRequestsGAFilter] = useState("all");



  const [requestsA, setRequestsA] = useState([]);
  const [requestsAFilter, setRequestsAFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  const { data: session } = useSession();
  const router = useRouter();

    const getRequestsData = async () => {

      try {

        const resp = await axios.get(
          "/api/superadmin/allSARequests",
          {}
        )

        const allRequests = resp.data.allRequests

        const reqGA = allRequests.filter(r => ((r.tipo_proceso === 'registroGA') && (r.hasOwnProperty("info_GA"))));
        const reqA = allRequests.filter(r => r.tipo_proceso === 'registroAgencia');
        setIsLoading(false)


        reqGA.forEach((element) => {

          element["grupo_automotriz"] = element["info_GA"]["nombres"]
          element["fecha_inicio"] = element["fecha_creacion"]
        }

          )


        reqA.forEach((element) => {

          element["agencia"] = element["info_agencia"]["nombres"]
          element["fecha_inicio"] = element["fecha_creacion"]
        }

          )



        setRequestsGA(reqGA)
        setRequestsA(reqA)

      } catch (err) {
        console.log(err)
      }

    };

  useEffect(() => {



    if (session) {
      getRequestsData();
    } else {


    }

  }, [session]);


    const handleDetail = (params,type) => {
      router.push(`/sa/find/req/`+type+"/"+params)
    }

  const updateAnyRequest = async (_id, status) => {
    setIsLoading(true)

    const upd = await axios.post("/api/superadmin/updateAnySARequestStatus", {
      id:_id,
      status:status
    });


    getRequestsData();

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
            <MenuItem value="aceptado">Aprobado</MenuItem>
            <MenuItem value="rechazado">Rechazado</MenuItem>
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
        field: "_id",
        headerName: "Número de Solicitud",
        headerAlign: "center",
        align: "center",
        minWidth: 150,
        flex: 1,
      },
      {
        field: "agencia",
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
            <MenuItem value="aceptado">Aprobado</MenuItem>
            <MenuItem value="rechazado">Rechazado</MenuItem>
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
        {isLoading && <LoadingScreen />}
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
        </div>
      </>
    );
  } else {
    <div><LoadingScreen/></div>
  }
}

export default SARequestDashboard
