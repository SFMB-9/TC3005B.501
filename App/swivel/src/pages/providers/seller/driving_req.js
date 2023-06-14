/*
This page is the seller dashboard for the driving requests. 
It displays all the driving requests that the seller has received.
Author: Mateo Herrera
*/

import { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import DataTable from "@/components/general/Table";
import { Select, MenuItem, Typography } from "@mui/material";
import SimpleToggleButton from "@/components/general/SimpleToggleMenu";
import SellerNavbar from "@/components/providers/seller/navbar";

const SellerDashboard = () => {
  // user object is a map of user id to user data
  const [user, setUser] = useState(null);

  const [statusFilter, setStatusFilter] = useState("all");

  // requests is an array of request objects
  const [requests, setRequests] = useState([]);

  const { data: session } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      console.log(session.id)
      try {
        // Get all requests
        const requestRes = await axios.get(
          "/api/DrivingRequestsSeller/drivingRequest",
          {
            params: {
              vendedor_id: session.id,
              tipo_proceso: "pruebaManejo",
            },
          }
        );

        const requests = requestRes.data.procesos;
        // Get all unique user ids
        const userIds = [
          ...new Set(requests.map((request) => request.usuario_final_id)),
        ];
        // Get all users
        const userPromises = userIds.map((id) =>
          axios.get(`/api/managerProfile/managerP?id=${id}`)
        );
        const userRes = await Promise.all(userPromises);

        // Create a map of user id to user data
        const users = userRes.reduce((acc, res) => {
          const userData = res.data.userData;
          return {
            ...acc,
            [userData._id]: userData,
          };
        }, {});

        // Set the requests and users state
        setRequests(requests);
        setUser(users);
      } catch (error) {
        console.log(error);
      }
    };

    if (session) {
      fetchData();
    }
  }, [session]);

  // Update the status of a request
  const updateRequestStatus = async (_id, status, phone) => {
    await axios.put("/api/DrivingRequestsSeller/updateRequestStatus", {
      _id,
      status,
    });    

    await axios.post('/api/twilio/message', { 
      to: `+521${phone}` , 
      message: `*SWIVEL*\nActualización de tu proceso de prueba de manejo\nEstado: ${status}` 
    });

    const updatedRequests = requests.map((request) => {
      if (request._id === _id) {
        return { ...request, status };
      } else {
        return request;
      }
    });
    setRequests(updatedRequests);
  };

  const columns = [
    {
      field: "auto ",
      headerName: "Vehículo",
      headerAlign: "center",
      align: "center",
      minWidth: 150,
      flex: 1,
      valueGetter: (params) => {
        let cell = params.row.auto
          ? `${params.row.auto.marca} ${params.row.auto.modelo}`
          : "Este proceso no contiene auto";
        return cell;
      },
    },
    {
      field: "cliente",
      headerName: "Cliente",
      headerAlign: "center",
      align: "center",
      minWidth: 130,
      flex: 1,
      valueGetter: (params) => {
        let cell = user[params.row.usuario_final_id]
          ? `${user[params.row.usuario_final_id].nombres} ${user[params.row.usuario_final_id].apellidos
          }`
          : "Usuario no encontrado";
        return cell;
      },
    },
    {
      field: "archivo_id",
      headerName: "Identificación",
      headerAlign: "center",
      align: "center",
      minWidth: 150,
      flex: 1,
      renderCell: (params) => (
        <div>
          <a href={params.row.documentos[0].url} target="_blank">
            <u>Ver ID</u>
          </a>
          <br />
          <a href={params.row.documentos[1].url} target="_blank">
            <u>Ver Licencia</u>
          </a>
        </div>
      )
    },
    {
      field: "fecha_agendada",
      type: "date",
      headerName: "Fecha",
      headerAlign: "center",
      align: "center",
      minWidth: 110,
      flex: 1,
      valueFormatter: (params) =>
        new Date(params.value).toLocaleDateString("es-ES", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
        }),
    },
    {
      field: "hora_agendada",
      headerName: "Horario",
      headerAlign: "center",
      align: "center",
      minWidth: 75,
      flex: 1,
      valueGetter: (params) =>
        new Date(params.row.hora_agendada).toLocaleTimeString("es-ES", {
          hour: "2-digit",
          minute: "2-digit",
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
          value={params.row.estatus_validacion}
          onChange={(e) => updateRequestStatus(params.row._id, e.target.value, user[params.row.usuario_final_id].apellidos)}
          label="Status"
          variant="standard"
          size="small"
          color="primary"
          sx={{ fontFamily: "Lato", fontSize: "12px" }}
        >
          <MenuItem
            sx={{ fontFamily: "Lato", fontSize: "12px" }}
            value="En proceso"
          >
            En Proceso
          </MenuItem>
          <MenuItem
            sx={{ fontFamily: "Lato", fontSize: "12px" }}
            value="Finalizada"
          >
            Finalizada
          </MenuItem>
          <MenuItem
            sx={{ fontFamily: "Lato", fontSize: "12px" }}
            value="Cancelada"
          >
            Cancelada
          </MenuItem>
        </Select>
      ),
    },
  ];

  const rows = requests.filter((request) => {
    if (statusFilter === "all") {
      return true;
    } else {
      return request.estatus_validacion === statusFilter;
    }
  });

  return (
    <>
      <SellerNavbar />
      <div>
        <Typography
          variant="h3"
          align="center"
          fontWeight="bold"
          className="pt-5"
          sx={{ fontFamily: "Lato", color: "#333333" }}
        >
          Solicitudes de prueba de manejo
        </Typography>
        <div className="section">
          <div className="text-center pt-3">
            <SimpleToggleButton
              filters={[
                { value: "En proceso", name: "En Proceso" },
                { value: "Finalizada", name: "Finalizada" },
                { value: "Cancelada", name: "Cancelada" },
              ]}
              onChange={setStatusFilter}
              sx={{
                "& .MuiToggleButtonGroup-grouped": {
                  minWidth: "100px",
                  fontFamily: "Lato",
                  color: "#333333",
                },
              }}
            />
          </div>
        </div>
        <div className="section px-5">
          <div className="p-5 pt-4">
            <DataTable
              columns={columns}
              rows={rows}
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
      </div>
    </>
  );
};

export default SellerDashboard;
