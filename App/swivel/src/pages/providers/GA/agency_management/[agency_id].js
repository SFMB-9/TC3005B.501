/*
Luis Javier Karam
30/5/2023

Page to view the details of an agency and edit them as well as add and remove managers and sellers
*/

import React, { useState, useEffect, useMemo } from 'react';
import GANavbar from '@/components/providers/GA/navbar';
import styles from '@/styles/agency_details.module.css';
import { Button, TextField, Container, Typography, IconButton } from '@mui/material';
import DataTable from '@/components/general/Table';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PopUpComponent from '@/components/general/Popup';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function AgencyDetails() {

    const router = useRouter();
    const { agency_id } = router.query;

    const [agency, setAgency] = useState(null);
    const [managers, setManagers] = useState(null);
    const [sellers, setSellers] = useState(null);
    const [url, setUrl] = useState('')
    const [GA, setGA] = useState(null)

    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')

    const [calle, setCalle] = useState('')
    const [num_ext, setNX] = useState('')
    const [num_int, setNI] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    const [PC, setPC] = useState('')

    const fetchResults = async () => {
        try {
            const response = await axios.get('/api/GA/pull-agencia', { params: { id: agency_id } });
            setAgency(response.data.agency);
            setManagers(response.data.managers);
            setSellers(response.data.sellers);
            setUrl(response.data.agency.url_agencia);
            setGA(response.data.GA.nombres);

            setPhone(response.data.agency.numero_telefonico);
            setEmail(response.data.agency.email);

            setCalle(response.data.agency.direccion.calle);
            setNX(response.data.agency.direccion.numero_exterior);
            setNI(response.data.agency.direccion.numero_interior);
            setCity(response.data.agency.direccion.ciudad);
            setState(response.data.agency.direccion.estado);
            setCountry(response.data.agency.direccion.pais);
            setPC(response.data.agency.direccion.codigo_postal);

        }
        catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    useEffect(() => {
        if (agency_id) {
        fetchResults();
        }
    }, [agency_id]);

    const deleteEntry = async (entry) => {
        console.log("This entry", entry);
        try {
            await axios.delete("/api/buyerProfile/deleteUser", { params: { id: entry} });
            getAdmins();
        }
        catch (error) {
            console.log("Error borrando usuario: ", error);
        }
    };

    const editEntry = (entry) => {
        router.push(`providers/new_GA/edit-gerente?id=${entry}`);
    };

    const addManager = () => {
        //router.push(`providers/manager/signup?GA_id=${agency.grupo_automotriz_id}&agency_id=${router.query.id}`);
        router.push(`registerManager/?GA_id=${agency.grupo_automotriz_id}&agency_id=${agency_id}`);
    };

    const addSeller = () => {
        router.push(`providers/seller/signup?id=${router.query.id}`);
    };

    const saveAgency = async () => {
        try {
            await axios.put('/api/GA/actualizar-agencia', { id: id, phone: phone, email: email, calle: calle, num_ext: num_ext, num_int: num_int, city: city, state: state, country: country, PC: PC });

            fetchResults();
        }
        catch (error) {
            console.error('Error deleting entry:', error);
        }
    };


    // const sellerColumns = [
    //     {
    //         field: 'Nombre',
    //         headerName: 'Nombre',
    //         minWidth: 150,
    //         flex: 1,
    //     },
    //     {
    //         field: 'Correo',
    //         headerName: 'Correo',
    //         minWidth: 150,
    //         flex: 1,
    //     },
    //     {
    //         field: 'Telefono',
    //         headerName: 'Teléfono',
    //         minWidth: 150,
    //         flex: 1,
    //     }
    // ];

    const sellerColumns = useMemo(
      () => [
          {
              field: "nombres",
              headerName: "Nombre",
              headerAlign: "center",
              align: "center",
              minWidth: 150,
              flex: 1,
          },
          {
              field: "email",
              headerName: "Correo",
              headerAlign: "center",
              align: "center",
              minWidth: 150,
              flex: 1,
          },
          {
            field: "numero_telefonico",
            headerName: "Teléfono",
            headerAlign: "center",
            align: "center",
            minWidth: 150,
            flex: 1,
        },
      ],
      [sellers]
  );

    // const managerColumns = [
    //     { field: 'Nombre', headerName: 'Nombre', width: 200 },
    //     { field: 'Mail', headerName: 'Correo', width: 200 },
    //     {
    //         field: 'delete',
    //         headerName: 'Borrar (PERMANENTE)',
    //         type: 'delete',
    //         width: 200,
    //         renderCell: (params) => (
    //             <PopUpComponent
    //                 title="Confirmar Eliminación"
    //                 popUpContent={<div className={styles.popupText}>
    //                     <h4>¿Estás seguro de que deseas eliminar este gerente?</h4>
    //                     <p className={styles.warningText}>Esta acción no se puede deshacer.</p>
    //                 </div>}
    //                 btnOpen={
    //                     <Button>
    //                         <DeleteForever />
    //                     </Button>
    //                 }
    //                 btnClose={
    //                     <div>
    //                         <Button
    //                             variant="contained"
    //                             disableElevation
    //                             className={styles.popupButton}
    //                             sx={{
    //                                 backgroundColor: '#F55C7A',
    //                                 fontFamily: 'lato',
    //                                 fontWeight: 'bold',
    //                                 ':hover': { backgroundColor: '#BABABA' },
    //                             }}
    //                             onClick={() => handleDelete(params.row._id)}
    //                         >
    //                             Eliminar
    //                         </Button>
    //                         <Button
    //                             variant="contained"
    //                             disableElevation
    //                             className={styles.popupButton}
    //                             sx={{
    //                                 backgroundColor: '#E0E0E0',
    //                                 fontFamily: 'lato',
    //                                 fontWeight: 'bold',
    //                                 ':hover': { backgroundColor: '#BABABA' },
    //                             }}
    //                             onClick={() => setIsOpen(false)} // Use setIsOpen from useState
    //                         >
    //                             Cancelar
    //                         </Button>
    //                     </div>
    //                 }
    //                 setIsOpen={setIsOpen} // Pass setIsOpen function as a prop
    //             />
    //         ),
    //     },
    //     {
    //         field: 'actions',
    //         headerName: 'Editar',
    //         type: 'actions',
    //         width: 100,
    //         renderCell: () => (
    //             <Button
    //                 variant="contained"
    //                 disableElevation
    //                 sx={{
    //                     backgroundColor: '#F55C7A',
    //                     fontFamily: 'lato',
    //                     fontWeight: 'bold',
    //                     ':hover': { backgroundColor: '#BABABA' },
    //                 }}
    //             >
    //                 Editar
    //             </Button>
    //         ),
    //     },

    // ]

    const managerColumns = useMemo(
      () => [
          {
              field: "nombres",
              headerName: "Nombre",
              headerAlign: "center",
              align: "center",
              minWidth: 150,
              flex: 1,
          },
          {
              field: "email",
              headerName: "Correo",
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
                      <div
                          style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              flexDirection: "row",
                          }}
                      >
                          <PopUpComponent
                              title="Editar datos"
                              popUpContent={
                                  <div>
                                      <p> Editar datos </p>
                                  </div>
                              }
                              btnOpen={
                                  <IconButton
                                      aria-label="delete"
                                      size="small"
                                      component="span"
                                  // onClick={() => editEntry(params.row)}
                                  >
                                      <EditIcon />
                                  </IconButton>
                              }
                          />
                          <PopUpComponent
                              title="Eliminar Gerente"
                              popUpContent={
                                  <div className="text-center mt-3"> <p> ¿Estas segurx que quieres eliminar a este gerente? </p>
                                      <p> Al hacer click en &quot;Confirmar&quot; estas confirmando de forma definitiva que quieres eliminar la cuenta. </p>
                                      <Button
                                          variant="contained"
                                          onClick={() =>  deleteEntry(params.row._id)}
                                          type="submit"
                                          className="w-80"
                                          sx={{
                                              fontFamily: "Lato",
                                              ":hover": {
                                                  backgroundColor: "red",
                                              },
                                          }}
                                      >
                                          Eliminar Gerente
                                      </Button>
                                  </div>
                              }
                              btnOpen={
                                  <IconButton
                                      aria-label="delete"
                                      size="small"
                                      component="span"
                                  >
                                      <DeleteIcon />
                                  </IconButton>
                              }
                          />
                      </div>
                  </>
              ),
          },
      ],
      [managers]
  );


    // Old front implementation

    const handleChange = (event) => {
        const { id, value } = event.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [id]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Form submitted:', formValues);
    };

    const handleDelete = (id) => {
        // Handle delete logic here
        console.log('Deleting item with ID:', id);
    };

    const handleClosePopup = () => {
        setIsOpen(false);
    };

    const [isOpen, setIsOpen] = useState(false); // Define isOpen state

    if (agency != null) {
      
      return (
        <>
        <GANavbar />
          <Container maxWidth="xl">
        <div className="section p-5">
          <Typography
            fontFamily="Lato"
            color="#1F1F1F"
            fontSize={{ xs: 25, md: 28, lg: 33 }}
            className="pt-2 pb-4"
          > Detalle de la Agencia </Typography>
          <form>
            <div>
              <Typography
                fontFamily="Lato"
                color="#1F1F1F"
                className="pb-3"
                fontWeight="bold"
                fontSize={{ xs: 16, md: 17, lg: 19 }}
              > Datos de la agencia </Typography>
              <div className="row">
                <div className="col-xl-4 col-md-6">
                  <Typography
                    fontFamily="Lato"
                    color="#8A8A8A"
                    className="pb-3"
                    fontSize={{ xs: 15, md: 16, lg: 18 }}
                  > Nombre </Typography>
                  <TextField
                    
                    size="small"
                    type="text"
                    name="nombre"
                    id="nombre"
                    value={agency.nombres}
                    inputProps={{ readOnly: true, min: "0", style: { fontFamily: "Lato" } }}
                    InputLabelProps={{ style: { fontFamily: "Lato" } }}
                    className="mb-3 w-100"
                  />
                </div>
                {/* <div className="col-xl-4 col-md-6">
                  <Typography
                    fontFamily="Lato"
                    color="#8A8A8A"
                    className="pb-3"
                    fontSize={{ xs: 15, md: 16, lg: 18 }}
                  > Correo </Typography>
                  <TextField
                    
                    size="small"
                    type="text"
                    name="correo"
                    id="correo"
                    {agency.email}
                    inputProps={{ min: "0", style: { fontFamily: "Lato" } }}
                    InputLabelProps={{ style: { fontFamily: "Lato" } }}
                    className="mb-3 w-100"
                  />
                </div> */}

                <div className="col-xl-4 col-md-6">
                  <Typography
                    fontFamily="Lato"
                    color="#8A8A8A"
                    className="pb-3"
                    fontSize={{ xs: 15, md: 16, lg: 18 }}
                  > Teléfono </Typography>
                  <TextField
                    
                    size="small"
                    type="text"
                    name="correo"
                    id="marca"
                    value={phone}
                    inputProps={{ readOnly: true, min: "0", style: { fontFamily: "Lato" } }}
                    InputLabelProps={{ style: { fontFamily: "Lato" } }}
                    className="mb-3 w-100"
                  />
                </div>

                <div className="col-xl-4 col-md-6">
                  <Typography
                    fontFamily="Lato"
                    color="#8A8A8A"
                    className="pb-3"
                    fontSize={{ xs: 15, md: 16, lg: 18 }}
                  > Grupo Automotriz </Typography>
                  <TextField
                    
                    size="small"
                    type="text"
                    name="correo"
                    id="grupo"
                    value={GA}
                    inputProps={{ readOnly: true, min: "0", style: { fontFamily: "Lato" } }}
                    InputLabelProps={{ style: { fontFamily: "Lato" } }}
                    className="mb-3 w-100"
                  />
                </div>
                <div className="row">
                    <div className="col-xl-4 col-md-6">
                    <Typography
                    fontFamily="Lato"
                    color="#8A8A8A"
                    className="pb-3"
                    fontSize={{ xs: 15, md: 16, lg: 18 }}
                  > Sitio web </Typography>
                  <TextField
                    
                    size="small"
                    type="text"
                    name="correo"
                    id="grupo"
                    value={url}
                    inputProps={{ readOnly: true, min: "0", style: { fontFamily: "Lato" } }}
                    InputLabelProps={{ style: { fontFamily: "Lato" } }}
                    className="mb-3 w-100"
                  />
                    </div>
                    <div className="col-xl-4 col-md-6">
                    <Typography
                    fontFamily="Lato"
                    color="#8A8A8A"
                    className="pb-3"
                    fontSize={{ xs: 15, md: 16, lg: 18 }}
                  > Correo </Typography>
                  <TextField
                    
                    size="small"
                    type="text"
                    name="correo"
                    id="grupo"
                    value={email}
                    inputProps={{ readOnly: true, min: "0", style: { fontFamily: "Lato" } }}
                    InputLabelProps={{ style: { fontFamily: "Lato" } }}
                    className="mb-3 w-100"
                  />
                    </div>
                </div>


                
{/*                 
                <div className="col-xl-4 col-md-6">
                  <Typography
                    fontFamily="Lato"
                    color="#8A8A8A"
                    className="pb-3"
                    fontSize={{ xs: 15, md: 16, lg: 18 }}
                  > Pasajeros </Typography>
                  <TextField
                    
                    size="small"
                    type="number"
                    name="pasajeros"
                    id="pasajeros"
                    value={car.pasajeros}
                    onChange={handleChange}
                    "Pasajeros"
                    inputProps={{ min: "0", style: { fontFamily: "Lato" } }}
                    InputLabelProps={{ style: { fontFamily: "Lato" } }}
                    className="mb-3 w-100"
                  />
                </div> */}
              </div>
            </div>

            <div>
              <Typography
                fontFamily="Lato"
                color="#1F1F1F"
                className="pb-3"
                fontWeight="bold"
                fontSize={{ xs: 16, md: 17, lg: 19 }}
              > Dirección </Typography>
              <div className="row">
                <div className="col-xl-4 col-md-6">
                  <Typography
                    fontFamily="Lato"
                    color="#8A8A8A"
                    className="pb-3"
                    fontSize={{ xs: 15, md: 16, lg: 18 }}
                  > Calle </Typography>
                  <TextField
                    
                    size="small"
                    type="text"
                    name="calle"
                    id="direccion"
                    value={calle}
                    inputProps={{ readOnly: true, min: "0", style: { fontFamily: "Lato" } }}
                    InputLabelProps={{ style: { fontFamily: "Lato" } }}
                    className="mb-3 w-100"
                  />
                </div>

                <div className="col-xl-4 col-md-6">
                  <Typography
                    fontFamily="Lato"
                    color="#8A8A8A"
                    className="pb-3"
                    fontSize={{ xs: 15, md: 16, lg: 18 }}
                  > Número Exterior </Typography>
                  <TextField
                    
                    size="small"
                    type="text"
                    name="num_ext"
                    id="num_ext"
                    value={num_ext}
                    inputProps={{ readOnly: true, min: "0", style: { fontFamily: "Lato" } }}
                    InputLabelProps={{ style: { fontFamily: "Lato" } }}
                    className="mb-3 w-100"
                  />
                </div>

                <div className="col-xl-4 col-md-6">
                  <Typography
                    fontFamily="Lato"
                    color="#8A8A8A"
                    className="pb-3"
                    fontSize={{ xs: 15, md: 16, lg: 18 }}
                  > Número Interior </Typography>
                  <TextField
                    
                    size="small"
                    type="text"
                    name="num_int"
                    id="num_int"
                    value={num_int}
                    inputProps={{ readOnly: true, min: "0", style: { fontFamily: "Lato" } }}
                    InputLabelProps={{ style: { fontFamily: "Lato" } }}
                    className="mb-3 w-100"
                  />
                </div>

                <div className="col-xl-4 col-md-6">
                  <Typography
                    fontFamily="Lato"
                    color="#8A8A8A"
                    className="pb-3"
                    fontSize={{ xs: 15, md: 16, lg: 18 }}
                  > Ciudad </Typography>
                  <TextField
                    
                    size="small"
                    type="text"
                    name="ciudad"
                    id="ciudad"
                    value={city}
                    inputProps={{ readOnly: true, min: "0", style: { fontFamily: "Lato" } }}
                    InputLabelProps={{ style: { fontFamily: "Lato" } }}
                    className="mb-3 w-100"
                  />
                </div>

                <div className="col-xl-4 col-md-6">
                  <Typography
                    fontFamily="Lato"
                    color="#8A8A8A"
                    className="pb-3"
                    fontSize={{ xs: 15, md: 16, lg: 18 }}
                  > Estado </Typography>
                  <TextField
                    
                    size="small"
                    type="text"
                    name="estado"
                    id="estado"
                    value={state}
                    inputProps={{ readOnly: true, min: "0", style: { fontFamily: "Lato" } }}
                    InputLabelProps={{ style: { fontFamily: "Lato" } }}
                    className="mb-3 w-100"
                  />
                </div>

                <div className="col-xl-4 col-md-6">
                  <Typography
                    fontFamily="Lato"
                    color="#8A8A8A"
                    className="pb-3"
                    fontSize={{ xs: 15, md: 16, lg: 18 }}
                  > País </Typography>
                  <TextField
                    
                    size="small"
                    type="text"
                    name="pais"
                    id="pais"
                    value={country}
                    inputProps={{ readOnly: true, min: "0", style: { fontFamily: "Lato" } }}
                    InputLabelProps={{ style: { fontFamily: "Lato" } }}
                    className="mb-3 w-100"
                  />
                </div>

                <div className="col-xl-4 col-md-6">
                  <Typography
                    fontFamily="Lato"
                    color="#8A8A8A"
                    className="pb-3"
                    fontSize={{ xs: 15, md: 16, lg: 18 }}
                  > Código Postal </Typography>
                  <TextField
                    
                    size="small"
                    type="text"
                    name="codigo_postal"
                    id="codigo_postal"
                    value={PC}
                    inputProps={{ readOnly: true, min: "0", style: { fontFamily: "Lato" } }}
                    InputLabelProps={{ style: { fontFamily: "Lato" } }}
                    className="mb-3 w-100"
                  />
                </div>
                


                
{/*                 
                <div className="col-xl-4 col-md-6">
                  <Typography
                    fontFamily="Lato"
                    color="#8A8A8A"
                    className="pb-3"
                    fontSize={{ xs: 15, md: 16, lg: 18 }}
                  > Pasajeros </Typography>
                  <TextField
                    size="small"
                    type="number"
                    name="pasajeros"
                    id="pasajeros"
                    value={car.pasajeros}
                    onChange={handleChange}
                    "Pasajeros"
                    inputProps={{ min: "0", style: { fontFamily: "Lato" } }}
                    InputLabelProps={{ style: { fontFamily: "Lato" } }}
                    className="mb-3 w-100"
                  />
                </div> */}
              </div>
            </div>
          </form>
        </div>

        <div className="section p-5">
          <div className='d-flex justify-content-between align-items-center'>

          <Typography
            fontFamily="Lato"
            color="#1F1F1F"
            fontSize={{ xs: 25, md: 28, lg: 33 }}
            className="pt-2 pb-4"
          > Gerentes </Typography>

<Button
                      variant="contained"
                      className={styles.button}
                      onClick={() => addManager()}
                      disableElevation
                      size='small'
                      sx={{
                          backgroundColor: '#F55C7A',
                          fontFamily: 'lato',
                          fontWeight: 'bold',
                          ':hover': { backgroundColor: '#BABABA' },
                      }}
                  >
                      Agregar gerente +
                  </Button>
          </div>

          <DataTable
                                        columns={managerColumns}
                                        rows={managers}
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

        <div className="section p-5">
          <div className='d-flex justify-content-between align-items-center'>

          <Typography
            fontFamily="Lato"
            color="#1F1F1F"
            fontSize={{ xs: 25, md: 28, lg: 33 }}
            className="pt-2 pb-4"
          > Vendedores </Typography>

          </div>

          <DataTable
                                        columns={sellerColumns}
                                        rows={sellers}
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
      </Container>

        </>
  
      );
    } else {
      return (
          <div>
              <p>Cargando...</p>
          </div>
      );
    }
}