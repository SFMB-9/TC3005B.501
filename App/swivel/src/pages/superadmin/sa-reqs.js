/*

This page shows a request dashboard that shows both A/GA requests - both on separate
tabs, and within each tab, filtered by completed or pending.

 - Francisco Salcedo

*/

import axios from "axios";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import DataTable from "@/components/general/Table";


import { Select, MenuItem} from "@mui/material";
import SANavbar from '@/components/SA/navbar';
import CollapsibleContainer from '@/components/general/collapsing_div';


const SARequestDashboard = () => {


	const [requestsGA, setRequestsGA] = useState([]);
	const [requestsGAFilter, setRequestsGAFilter] = useState("all");



	const [requestsA, setRequestsA] = useState([]);
	const [requestsAFilter, setRequestsAFilter] = useState("all");

	const { data: session } = useSession();


	useEffect( () => {

		const getRequestsData = async () => {

			try{

				const allRequests = await axios.get(
					"/api/superadmin/allSARequests",
					{}
					)



				const requestsGA = allRequests.filter((r) => {
          r.tipo_proceso = "registroGA"
        })
        const requestsA = allRequests.filter((r) => {
          r.tipo_proceso = "registroAgencia"
        })

				setRequestsGA(requestsGA)
				setRequestsA(requestsA)

			} catch(err) {
				console.log(err)
			}

		};

		if(session){
			getRequestsData();
		}

	}, [session]);


	const updateAnyRequest = async (_id, status) => {

		await axios.put("/api/superadmin/updateAnySARequestStatus", {
			_id,
			status
		});

		const tempRequestsGA = requestsGA.map((request) => {
			if(request._id === _id){
				return{...request,status}}
				else{
					return request
				} 
			
		});

		const tempRequestsA = requestsA.map((request) => {
			if(request._id === _id){
				return{...request,status}}
				else{
					return request
				} 
			
		});

		setRequestsGA(tempRequestsGA);
		setRequestsA(tempRequestsA);
	};



const columnsGA = [
  {
    field: "solicitud_grupo_automotriz_id",
    headerName: "Número de Solicitud",
    headerAlign: "center",
    align: "center",
    minWidth: 150,
    flex: 1,
  },
  {
    field: "nombre",
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





return (
  <>
    <SANavbar />

    <CollapsibleContainer title="Solicitudes de Grupo Automotriz">
    	<DataTable
    		columns={columnsGA}
    		rows={rowsGA}
    		rowSelection={false}
    		> </DataTable>
    </CollapsibleContainer>


    <CollapsibleContainer title="Solicitudes de Agencia">
    	<DataTable
    		columns={columnsA}
    		rows={rowsA}
    		rowSelection={false}
    		></DataTable>
    </CollapsibleContainer>

  </>
);

}

export default SARequestDashboard
