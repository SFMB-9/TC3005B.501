/*
This page is the seller dashboard for the purchase requests. 
It displays all the purchase requests that the seller has received.
Author: Mateo Herrera
*/

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import DataTable from "@/components/general/Table";
import { Select, MenuItem, Button, Typography } from "@mui/material";
import SimpleToggleButton from "@/components/general/SimpleToggleMenu";
import SellerNavbar from "@/components/providers/seller/navbar";

const SellerDashboard = () => {
  const router = useRouter();

  // user object is a map of user id to user data
  const [user, setUser] = useState(null);

  // Filter the requests by status
  const [statusFilter, setStatusFilter] = useState("all");

  const { data: session } = useSession();

  // requests is an array of request objects
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get all requests
        const requestRes = await axios.get(
          "/api/DrivingRequestsSeller/drivingRequest",
          {
            params: {
              vendedor_id: session.id,
              tipo_proceso: "solicitudCompra",
            },
          }
        );

        const requests = requestRes.data.procesos;

        // Get all unique user ids
        const userIds = [
          ...new Set(requests.map((request) => request.usuario_final_id)),
        ];
        console.log(userIds);
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
        console.log(users);

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
  const updateRequestStatus = async (_id, status) => {
    await axios.put("/api/DrivingRequestsSeller/updateRequestStatus", {
      _id,
      status,
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

  // Navigate to a new page to view the details of the request
  const viewRequest = (id, user_id) => {
    router.push({
      pathname: "./view_req",
      query: { id, user_id },
    });
  };

  const columns = [
    {
      field: "auto",
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
      minWidth: 150,
      flex: 1,
      valueGetter: (params) => {
        let cell = user[params.row.usuario_final_id]
          ? `${user[params.row.usuario_final_id].nombres} ${
              user[params.row.usuario_final_id].apellidos
            }`
          : "Usuario no encontrado";
        return cell;
      },
    },
    {
      field: "status",
      headerName: "Estatus",
      headerAlign: "center",
      align: "center",
      minWidth: 150,
      flex: 1,
      type: "actions",
      renderCell: (params) => (
        <Select
          value={params.row.status}
          onChange={(e) => updateRequestStatus(params.row._id, e.target.value)}
          label="Status"
          variant="standard"
          size="small"
          color="primary"
          sx={{ fontFamily: "Lato", fontSize: "12px" }}
        >
          <MenuItem
            sx={{ fontFamily: "Lato", fontSize: "12px" }}
            value="En_Revision"
          >
            En Proceso
          </MenuItem>
          <MenuItem
            sx={{ fontFamily: "Lato", fontSize: "12px" }}
            value="Aceptada"
          >
            Aprobado
          </MenuItem>
          <MenuItem
            sx={{ fontFamily: "Lato", fontSize: "12px" }}
            value="Rechazada"
          >
            Rechazado
          </MenuItem>
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
          onClick={() =>
            viewRequest(params.row._id, params.row.usuario_final_id)
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

  const rows = requests.filter((request) => {
    if (statusFilter === "all") {
      return true;
    } else {
      return request.status === statusFilter;
    }
  });

  return (
    <>
    <SellerNavbar/>
    <div>
      <Typography
        variant="h3"
        align="center"
        fontWeight="bold"
        className="pt-5"
        sx={{ fontFamily: "Lato", color: "#333333" }}
      >
        Solicitudes de compra
      </Typography>
      <div className="section">
        <div className="text-center pt-3">
          <SimpleToggleButton
            filters={[
              { value: "En_Revision", name: "En Proceso" },
              { value: "Aceptada", name: "Aprobado" },
              { value: "Rechazada", name: "Rechazado" },
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
