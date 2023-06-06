import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from 'axios';

import {
    Container,
    Typography,
    TextField,
    Button,
} from "@mui/material";

export default function EditSellerData(props) {
    const [userId, setUserId] = useState(props.data._id);
    const [editingEntry, setEditingEntry] = useState(null);
    const [editedName, setEditedName] = useState(props.data.nombres);
    const [editedLastName, setEditedLastName] = useState(props.data.apellidos);
    const [editedEmail, setEditedEmail] = useState(props.data.email);
    const [editedCellphone, setEditedCellphone] = useState(props.data.numero_telefonico);
    let apiPath = "";

    if (props.userType === "seller") {
        apiPath = "/api/gerente/actualizar-vendedor";
    } else if (props.userType === "gaManager") {
        apiPath = "/api/GA/actualizar-admin-ga";
    }

    console.log("the path", apiPath)

    const editEntry = (entry) => {
        setEditingEntry(entry);
        setUserId(entry._id);
        setEditedName(entry.nombres);
        setEditedLastName(entry.apellidos);
        setEditedEmail(entry.email);
        setEditedCellphone(entry.numero_telefonico);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("editedName: ", userId);
        try {
            await axios.put(apiPath, {
                _id: userId,
                name: editedName,
                last_name: editedLastName,
                newEmail: editedEmail,
                cellphone: editedCellphone,
            });
            // // Refresh the results after updating
            window.location.reload();
        }
        catch (error) {
            console.error('Error updating entry:', error);
        }
    };

    return (
        <Container maxWidth="xl">
            <div className="section pt-3 p-5">
                <Typography
                    fontFamily="Lato"
                    color="#1F1F1F"
                    fontSize={{ xs: 25, md: 28, lg: 33 }}
                    className="pt-2 pb-4"
                >
                    Edita vendedor
                </Typography>

                <Typography
                    fontFamily="Lato"
                    color="#1F1F1F"
                    className="pb-3"
                    fontWeight="bold"
                    fontSize={{ xs: 16, md: 17, lg: 19 }}
                >
                    Datos Personales
                </Typography>
                <div className="d-sm-flex justify-content-between mb-4">
                    <div className="row">

                        <div className="col-xl-6 col-md-8">
                            <Typography
                                fontFamily="Lato"
                                color="#8A8A8A"
                                className="pb-3"
                                fontSize={{ xs: 15, md: 16, lg: 18 }}
                            >
                                Nombre(s)
                            </Typography>
                            <TextField
                                required
                                size="small"
                                type="text"
                                name="name"
                                id="name_field"
                                value={editedName}
                                pattern="[a-zA-Z]+"
                                onChange={(e) => setEditedName(e.target.value)}
                                label="Nombre(s)"
                                inputProps={{ min: "0", style: { fontFamily: "Lato" } }}
                                InputLabelProps={{ style: { fontFamily: "Lato" } }}
                                className="mb-3 w-100"
                            />
                        </div>

                        <div className="col-xl-6 col-md-8">
                            <Typography
                                fontFamily="Lato"
                                color="#8A8A8A"
                                className="pb-3"
                                fontSize={{ xs: 15, md: 16, lg: 18 }}
                            >
                                Apellidos
                            </Typography>
                            <TextField
                                required
                                size="small"
                                type="text"
                                name="surname"
                                id="name_field"
                                value={editedLastName}
                                pattern="[a-zA-Z]+"
                                onChange={(e) => setEditedLastName(e.target.value)}
                                label="Apellidos"
                                inputProps={{ min: "0", style: { fontFamily: "Lato" } }}
                                InputLabelProps={{ style: { fontFamily: "Lato" } }}
                                className="mb-3 w-100"
                            />
                        </div>

                        <div className="col-xl-6 col-md-8">
                            <Typography
                                fontFamily="Lato"
                                color="#8A8A8A"
                                className="pb-3"
                                fontSize={{ xs: 15, md: 16, lg: 18 }}
                            >
                                Correo electrónico
                            </Typography>
                            <TextField
                                required
                                size="small"
                                type="email"
                                name="email"
                                id="email_field"
                                value={editedEmail}
                                pattern="[a-zA-Z]+"
                                onChange={(e) => setEditedEmail(e.target.value)}
                                label="Correo electrónico"
                                inputProps={{ min: "0", style: { fontFamily: "Lato" } }}
                                InputLabelProps={{ style: { fontFamily: "Lato" } }}
                                className="mb-3 w-100"
                            />
                        </div>
                        <div className="col-xl-6 col-md-8">
                            <Typography
                                fontFamily="Lato"
                                color="#8A8A8A"
                                className="pb-3"
                                fontSize={{ xs: 15, md: 16, lg: 18 }}
                            >
                                Celular
                            </Typography>

                            <TextField
                                required
                                size="small"
                                type="text"
                                name="phone_field"
                                id="phone"
                                value={editedCellphone}
                                pattern="[a-zA-Z]+"
                                onChange={(e) => setEditedCellphone(e.target.value)}
                                label="Celular"
                                inputProps={{ min: "0", style: { fontFamily: "Lato" } }}
                                InputLabelProps={{ style: { fontFamily: "Lato" } }}
                                className="mb-3 w-100"
                            />
                        </div>
                    </div>
                </div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                    }}
                >
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        type="submit"
                        className="w-80"
                        sx={{
                            fontFamily: "Lato",
                            ":hover": {
                                backgroundColor: "#333333",
                            },
                        }}
                    >
                        Guardar datos
                    </Button>
                </div>

            </div>
        </Container>
    )
}
