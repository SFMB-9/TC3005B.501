import React, { useState, useEffect } from "react";
import { Container, Typography, TextField, Switch, Select, MenuItem, IconButton, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/router";

import FileUpload from "@/pages/api/uploadBucketDoc/uploadBucketDoc";
import CustomizedSnackbars from "@/components/general/Alert";
import ImageFileDrop from "@/components/general/FileDrop";
import ManagerLayout from "@/components/providers/Manager/layout";

const CarRegistrationForm = () => {

  const router = useRouter();
  const { auto_id } = router.query;
  const fetchDetails = async () => {
    let rawCar = await fetch(`http://localhost:3000/api/prueba-manejo/get-car-info-elastic?auto_id=${auto_id}`,
      { method: 'GET' });
    const res = await rawCar.json();
    console.log(JSON.stringify(res));
    const retrievedAuto = res.auto._source;

    setCar(retrievedAuto);
    setArrays(retrievedAuto);
  }

  useEffect(() => {
    if (auto_id) {
      fetchDetails();
    }
  }, [auto_id]);


  const [car, setCar] = useState({
    cantidad: 0,
    marca: "",
    modelo: "",
    colores: [],
    color_interior: "",
    combustible: "",
    motor: "",
    ano: 0,
    transmision: "",
    rendimiento: "",
    pasajeros: 0,
    nombre_agencia: "",
    estado_agencia: "",
    municipio_agencia: "",
    direccion_agencia: "",
    tipo_vehiculo: "",
    precio: 0,
    caracteristicas: [],
    extras: [],
    enganche: [],
    plazo: {},
    entrega: [],
    disponible_prueba: "",
    visible_catalogo: "",
    descripcion: "",
    ficha_tecnica: "",
    fotos_3d: [],
  });

  //handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      car.colores.length === 0 ||
      car.enganche.length === 0 ||
      car.entrega.length === 0 ||
      car.plazo.length === 0
    ) {
      setOpen(true);
      return;
    }
    const updatedCar = {
      ...car,
      colores: color,
      caracteristicas: caracteristicas,
      extras: extras,
      enganche: enganche,
      plazo: plazo,
      entrega: entrega,
    };
    // Upload images to bucket
    for (let i = 0; i < fotos.length; i++) {
      for (let j = 0; j < fotos[i].length; j++) {
        const foto = await FileUpload(fotos[i][j]);
        updatedCar.colores[i].imagenes.push(foto);
        console.log(updatedCar.colores[i].imagenes)
      }
    }

    /*
    For future reference, this is how you upload a car to elastic
    await elasticCarRegister(updatedCar);
    */

    console.log(updatedCar);
    // Preset the form with the current car data
    setCar({
      cantidad: 0,
      marca: "",
      modelo: "",
      colores: [],
      color_interior: "",
      combustible: "",
      motor: "",
      ano: 0,
      transmision: "",
      rendimiento: "",
      pasajeros: 0,
      nombre_agencia: "",
      estado_agencia: "",
      municipio_agencia: "",
      direccion_agencia: "",
      tipo_vehiculo: "",
      precio: 0,
      caracteristicas: [],
      extras: [],
      enganche: [],
      plazo: {},
      entrega: [],
      disponible_prueba: "",
      visible_catalogo: "",
      descripcion: "",
      ficha_tecnica: "",
      fotos_3d: [],
    });
  };

  const [arrays, setArrays] = useState({});

  const [caracteristicas, setCaracteristicas] = useState([]);
  const [extras, setExtras] = useState([]);
  const [enganche, setEnganche] = useState([]);
  const [color, setColor] = useState([]);
  const [plazo, setPlazo] = useState({});
  const [entrega, setEntrega] = useState([]);
  const [fotos, setFotos] = useState([]);
  const [open, setOpen] = useState(false);
  

  //create empty objects
  const createEmptyColor = () => ({ nombre: "", hex: "", imagenes: [] });
  const createEmptyCaracteristica = () => "";
  const createEmptyExtra = () => ({ nombre: "", precio: 0, descripcion: "" });
  const createEmptyEnganche = () => 0;
  const createEmptyEntrega = () => ({ nombre: "", precio: 0, descripcion: "" });
  const createEmptyFoto = () =>
    new File([], "empty.jpg", { type: "image/jpeg" });
  const createEmptyCarFoto = () => [];

  //handle change in normal inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCar((prevCar) => ({ ...prevCar, [name]: value }));
  };

  const handleSwitchChange = (e) => {
    const { name, checked } = e.target;
    setCar((prevCar) => ({ ...prevCar, [name]: checked }));
  };

  //adds row to almost any array
  const handleAddRow = (setStateFunc, createEmptyFunc) => {
    setStateFunc((prevState) => [...prevState, createEmptyFunc()]);
  };

  //functions to handle array or object changes
  const handleColorChange = (index, event) => {
    const { name, value } = event.target;
    setColor((prevColor) => {
      const updatedColor = [...prevColor];
      updatedColor[index] = { ...updatedColor[index], [name]: value };
      return updatedColor;
    });
  };

  const handleFotosChange = (index, event) => {
    const updatedFotos = [...fotos];
    console.log(updatedFotos);
    updatedFotos[index].push(...event);
    setFotos(updatedFotos);
  };

  const handleEntregaChange = (index, event) => {
    const { name, value } = event.target;
    setEntrega((prevEntregas) => {
      const updatedEntregas = [...prevEntregas];
      updatedEntregas[index] = { ...updatedEntregas[index], [name]: value };
      return updatedEntregas;
    });
  };

  const handleCaracteristicaChange = (index, value) => {
    const updatedCaracteristicas = [...caracteristicas];
    updatedCaracteristicas[index] = value;
    setCaracteristicas(updatedCaracteristicas);
  };

  const handleExtraChange = (index, event) => {
    const { name, value } = event.target;
    setExtras((prevExtras) => {
      const updatedExtras = [...prevExtras];
      updatedExtras[index] = { ...updatedExtras[index], [name]: value };
      return updatedExtras;
    });
  };

  const handleEngancheChange = (index, value) => {
    const updatedEnganche = [...enganche];
    updatedEnganche[index] = value;
    setEnganche(updatedEnganche);
  };

  //functions that remove row from almost any array

  const handleRemoveColor = (index) => {
    setColor((prevColor) => {
      const updatedColor = [...prevColor];
      updatedColor.splice(index, 1);
      return updatedColor;
    });
  };

  const handleRemoveCarFotos = (index) => {
    setFotos((prevFotos) => {
      const updatedFotos = [...prevFotos];
      updatedFotos.splice(index, 1);
      return updatedFotos;
    });
  };

  const handleRemoveFotos = (index, i) => {
    setFotos((prevFotos) => {
      const updatedFotos = [...prevFotos];
      updatedFotos[index].splice(i, 1);
      return updatedFotos;
    });
  };

  const handleRemoveCaracteristica = (index) => {
    setCaracteristicas((prevCaracteristicas) => {
      const updatedCaracteristicas = [...prevCaracteristicas];
      updatedCaracteristicas.splice(index, 1);
      return updatedCaracteristicas;
    });
  };

  const handleRemoveExtra = (index) => {
    setExtras((prevExtras) => {
      const updatedExtras = [...prevExtras];
      updatedExtras.splice(index, 1);
      return updatedExtras;
    });
  };

  const handleRemoveEnganche = (index) => {
    setEnganche((prevEnganche) => {
      const updatedEnganche = [...prevEnganche];
      updatedEnganche.splice(index, 1);
      return updatedEnganche;
    });
  };

  //specific for plazo changes since it uses keys and values
  const handleKeyChange = (index, key) => {
    const updatedPlazo = { ...plazo };
    updatedPlazo[index] = { ...updatedPlazo[index], key };
    setPlazo(updatedPlazo);
  };

  const handleValueChange = (index, value) => {
    const updatedPlazo = { ...plazo };
    updatedPlazo[index] = { ...updatedPlazo[index], value };
    setPlazo(updatedPlazo);
  };

  const handleRemovePlazo = (index) => {
    const updatedPlazo = { ...plazo };
    delete updatedPlazo[index];
    setPlazo(updatedPlazo);
  };

  const handleRemoveEntrega = (index) => {
    setEntrega((prevEntrega) => {
      const updatedEntrega = [...prevEntrega];
      updatedEntrega.splice(index, 1);
      return updatedEntrega;
    });
  };

  //adds row to almost any array
  const handlePlazoAddRow = () => {
    const newIndex = Object.keys(plazo).length;
    setPlazo({ ...plazo, [newIndex]: { key: "", value: "" } });
  };

  const handleFotoAddRow = (index) => {
    setFotos((prevFotos) => {
      const updatedFotos = [...prevFotos];
      updatedFotos[index] = [...updatedFotos[index], createEmptyFoto()];
      return updatedFotos;
    });
  };

  return (
    <ManagerLayout>
      <Container maxWidth="xl">
        <div className="section p-5">
          <Typography
            fontFamily="Lato"
            color="#1F1F1F"
            fontSize={{ xs: 25, md: 28, lg: 33 }}
            className="pt-2 pb-4"
          > Modificar datos del auto </Typography>
          <Typography
            fontFamily="Lato"
            color="#1F1F1F"
            className="pb-3"
            fontWeight="bold"
            fontSize={{ xs: 16, md: 17, lg: 19 }}
          > Inventario </Typography>
          <form onSubmit={handleSubmit}>
            <Typography
              fontFamily="Lato"
              color="#8A8A8A"
              className="pb-3"
              fontSize={{ xs: 15, md: 16, lg: 18 }}
            > Número de unidades </Typography>
            <div>
              <div className="d-sm-flex justify-content-between mb-4">
                <TextField
                  required
                  size="small"
                  type="number"
                  name="cantidad"
                  id="cantidad"
                  value={car.cantidad}
                  onChange={handleChange}
                  label="Cantidad"
                  inputProps={{ min: "0", style: { fontFamily: "Lato" } }}
                  InputLabelProps={{ style: { fontFamily: "Lato" } }}
                  className="mb-3"
                />
                <div className="d-flex align-items-center mb-3">
                  <Switch
                    name="disponible_prueba"
                    id="disponible_prueba"
                    onChange={handleSwitchChange}
                  />
                  <div>
                    <Typography
                      fontFamily="Lato"
                      color="#8A8A8A"
                      fontSize={{ xs: 15, md: 16, lg: 18 }}
                    > Disponible para prueba </Typography>
                  </div>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <Switch
                    name="visible_catalogo"
                    id="visible_catalogo"
                    onChange={handleSwitchChange}
                  />
                  <div>
                    <Typography
                      fontFamily="Lato"
                      color="#8A8A8A"
                      fontSize={{ xs: 15, md: 16, lg: 18 }}
                    > Visible en catálogo </Typography>
                  </div>
                </div>
              </div>
              <Typography
                fontFamily="Lato"
                color="#1F1F1F"
                className="pb-3"
                fontWeight="bold"
                fontSize={{ xs: 16, md: 17, lg: 19 }}
              > Información general </Typography>
              <div className="row">
                <div className="col-xl-4 col-md-6">
                  <Typography
                    fontFamily="Lato"
                    color="#8A8A8A"
                    className="pb-3"
                    fontSize={{ xs: 15, md: 16, lg: 18 }}
                  > Marca </Typography>
                  <TextField
                    required
                    size="small"
                    type="text"
                    name="marca"
                    id="marca"
                    value={car.marca}
                    onChange={handleChange}
                    label="Marca"
                    inputProps={{ min: "0", style: { fontFamily: "Lato" } }}
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
                  > Modelo </Typography>
                  <TextField
                    required
                    size="small"
                    type="text"
                    name="modelo"
                    id="modelo"
                    value={car.modelo}
                    onChange={handleChange}
                    label="Modelo"
                    inputProps={{ min: "0", style: { fontFamily: "Lato" } }}
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
                  > Color interiores </Typography>
                  <TextField
                    required
                    size="small"
                    type="text"
                    name="color_interior"
                    id="color_interior"
                    value={car.color_interior}
                    onChange={handleChange}
                    label="Color interiores"
                    inputProps={{ min: "0", style: { fontFamily: "Lato" } }}
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
                  > Combustible </Typography>
                  <TextField
                    required
                    size="small"
                    type="text"
                    name="combustible"
                    id="combustible"
                    value={car.combustible}
                    onChange={handleChange}
                    label="Combustible"
                    inputProps={{ min: "0", style: { fontFamily: "Lato" } }}
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
                  > Motor </Typography>
                  <TextField
                    required
                    size="small"
                    type="text"
                    name="motor"
                    id="motor"
                    value={car.motor}
                    onChange={handleChange}
                    label="Motor"
                    inputProps={{ min: "0", style: { fontFamily: "Lato" } }}
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
                  > Año </Typography>
                  <TextField
                    required
                    size="small"
                    type="number"
                    name="ano"
                    id="ano"
                    value={car.ano}
                    onChange={handleChange}
                    label="Año"
                    inputProps={{
                      min: "1900",
                      max: "9999",
                      style: { fontFamily: "Lato" },
                    }}
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
                  > Transmisión </Typography>
                  <TextField
                    required
                    size="small"
                    type="text"
                    name="transmision"
                    id="transmision"
                    value={car.transmision}
                    onChange={handleChange}
                    label="Transmisión"
                    inputProps={{ min: "0", style: { fontFamily: "Lato" } }}
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
                  > Rendimiento </Typography>
                  <TextField
                    required
                    size="small"
                    type="text"
                    name="rendimiento"
                    id="rendimiento"
                    value={car.rendimiento}
                    onChange={handleChange}
                    label="Rendimiento"
                    inputProps={{ min: "0", style: { fontFamily: "Lato" } }}
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
                  > Pasajeros </Typography>
                  <TextField
                    required
                    size="small"
                    type="number"
                    name="pasajeros"
                    id="pasajeros"
                    value={car.pasajeros}
                    onChange={handleChange}
                    label="Pasajeros"
                    inputProps={{ min: "0", style: { fontFamily: "Lato" } }}
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
                  > Precio </Typography>
                  <TextField
                    required
                    size="small"
                    type="number"
                    name="precio"
                    id="precio"
                    value={car.precio}
                    onChange={handleChange}
                    label="Precio"
                    inputProps={{ min: "0", style: { fontFamily: "Lato" } }}
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
                  > Tipo de vehículo </Typography>
                  <Select
                    name="tipo_vehiculo"
                    id="tipo_vehiculo"
                    value={car.tipo_vehiculo}
                    onChange={handleChange}
                    MenuProps={{ fontFamily: "Lato" }}
                    className="w-100 mb-3"
                    size="small"
                    required
                  >
                    <MenuItem value="sedan">Sedán</MenuItem>
                    <MenuItem value="coupe">Coupé</MenuItem>
                    <MenuItem value="convertible">Convertible</MenuItem>
                    <MenuItem value="deportivo">Deportivo</MenuItem>
                    <MenuItem value="familiar">Familiar</MenuItem>
                    <MenuItem value="hatchback">Hatchback</MenuItem>
                    <MenuItem value="pickup">Pickup</MenuItem>
                  </Select>
                </div>
                <Typography
                  fontFamily="Lato"
                  color="#8A8A8A"
                  className="pb-3"
                  fontSize={{ xs: 15, md: 16, lg: 18 }}
                > Descripción </Typography>
                <TextField
                  name="descripcion"
                  id="descripcion"
                  value={car.descripcion}
                  onChange={handleChange}
                  multiline
                />
              </div>
              <Typography
                fontFamily="Lato"
                color="#1F1F1F"
                className="py-3 mt-3"
                fontWeight={"bold"}
                fontSize={{ xs: 16, md: 17, lg: 19 }}
              > Información de la agencia </Typography>
              <div className="row">
                <div className="col-xl-4 col-md-6">
                  <Typography
                    fontFamily="Lato"
                    color="#8A8A8A"
                    className="pb-3"
                    fontSize={{ xs: 15, md: 16, lg: 18 }}
                  > Nombre Agencia </Typography>
                  <TextField
                    required
                    size="small"
                    type="text"
                    name="nombre_agencia"
                    id="nombre_agencia"
                    value={car.nombre_agencia}
                    onChange={handleChange}
                    label="Nombre Agencia"
                    inputProps={{ style: { fontFamily: "Lato" } }}
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
                    required
                    size="small"
                    type="text"
                    name="estado_agencia"
                    id="estado_agencia"
                    value={car.estado_agencia}
                    onChange={handleChange}
                    label="Estado"
                    inputProps={{ min: "0", style: { fontFamily: "Lato" } }}
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
                  > Municipio </Typography>
                  <TextField
                    required
                    size="small"
                    type="text"
                    name="municipio_agencia"
                    id="municipio_agencia"
                    value={car.municipio_agencia}
                    onChange={handleChange}
                    label="Municipio"
                    inputProps={{ min: "0", style: { fontFamily: "Lato" } }}
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
                  > Dirección </Typography>
                  <TextField
                    required
                    size="small"
                    type="text"
                    name="direccion_agencia"
                    id="direccion_agencia"
                    value={car.direccion_agencia}
                    onChange={handleChange}
                    label="Dirección"
                    inputProps={{ min: "0", style: { fontFamily: "Lato" } }}
                    InputLabelProps={{ style: { fontFamily: "Lato" } }}
                    className="w-100"
                  />
                </div>
              </div>
            </div>
            <div>
              <Typography
                fontFamily="Lato"
                color="#1F1F1F"
                className="py-3 mt-3"
                fontWeight={"bold"}
                fontSize={{ xs: 16, md: 17, lg: 19 }}
              > Colores * </Typography>
              {color.map((object, index) => (
                <div key={index} className="mb-4">
                  <div
                    className="p-3 py-2 shadow-sm"
                    style={{
                      backgroundColor: "#f5f5f5",
                      borderRadius: 10,
                      borderBottomLeftRadius: 0,
                      borderBottomRightRadius: 0,
                    }}
                  >
                    <div className="d-flex justify-content-between align-items-center w-100">
                      <Typography
                        fontFamily="Lato"
                        color="#1f1f1f"
                        className="pb-2"
                        fontSize={{ xs: 15, md: 16, lg: 18 }}
                      > Información del color </Typography>
                      <IconButton
                        aria-label="delete"
                        size="small"
                        onClick={() => {
                          handleRemoveColor(index);
                          handleRemoveCarFotos(index);
                        }}
                      >
                        <CloseIcon fontSize="inherit" />
                      </IconButton>
                    </div>
                    <div className="row">
                      <div className="col-md">
                        <TextField
                          required
                          size="small"
                          type="text"
                          name="nombre"
                          value={object.nombre}
                          onChange={(event) => handleColorChange(index, event)}
                          label="Nombre del color"
                          inputProps={{ min: "0", style: { fontFamily: "Lato" } }}
                          InputLabelProps={{ style: { fontFamily: "Lato" } }}
                          className="mb-2 w-100 col-md"
                        />
                      </div>
                      <div className="col-md">
                        <TextField
                          required
                          size="small"
                          type="text"
                          name="hex"
                          value={object.hex}
                          onChange={(event) => handleColorChange(index, event)}
                          label="Codigo Hexadecimal"
                          inputProps={{ min: "0", style: { fontFamily: "Lato" } }}
                          InputLabelProps={{ style: { fontFamily: "Lato" } }}
                          className="mb-2 w-100 col-md"
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className="p-3 py-3 shadow-sm"
                    style={{
                      borderRadius: 10,
                      borderTopLeftRadius: 0,
                      borderTopRightRadius: 0,
                    }}
                  >
                    <Typography
                      fontFamily="Lato"
                      color="#1f1f1f"
                      className="pb-2"
                      fontSize={{ xs: 15, md: 16, lg: 18 }}
                    > Imágenes del coche </Typography>
                    <div className="row">
                      <div className="col-md-5">
                        <div className="border rounded h-100">
                          <ImageFileDrop
                            onDrop={handleFotosChange}
                            index={index}
                          />
                        </div>
                      </div>
                      <div className="col-md-7 mt-md-0 mt-3">
                        <div
                          className="border rounded"
                          style={{ height: "250px", overflowY: "scroll" }}
                        >
                          {fotos[index].map((foto, i) => (
                            <div
                              key={i}
                              className="d-flex p-1 px-3 justify-content-between border-bottom"
                            >
                              <Typography
                                fontFamily="Lato"
                                color="#8a8a8a"
                                fontSize={{ xs: 15, md: 16, lg: 18 }}
                              >
                                {foto.name}
                              </Typography>
                              <IconButton
                                aria-label="delete"
                                size="small"
                                onClick={() => handleRemoveFotos(index, i)}
                              >
                                <CloseIcon fontSize="inherit" />
                              </IconButton>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="text-end mt-3">
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    fontFamily: "Lato",
                    ":hover": {
                      backgroundColor: "red",
                    },
                  }}
                  disableElevation
                  type="button"
                  onClick={() => {
                    handleAddRow(setFotos, createEmptyCarFoto);
                    handleAddRow(setColor, createEmptyColor);
                  }}
                > Agregar Color </Button>
              </div>
            </div>
            <div>
              <Typography
                fontFamily="Lato"
                color="#1F1F1F"
                className="py-3 mt-3"
                fontWeight={"bold"}
                fontSize={{ xs: 16, md: 17, lg: 19 }}
              > Características * </Typography>
              <div className="row">
                {caracteristicas.map((value, index) => (
                  <div key={index} className="col-xl-4 col-md-6">
                    <div className="d-flex justify-content-between">
                      <TextField
                        required
                        size="small"
                        type="text"
                        name="nombre"
                        value={value}
                        onChange={(event) =>
                          handleCaracteristicaChange(index, event.target.value)
                        }
                        label="Característica"
                        inputProps={{ min: "0", style: { fontFamily: "Lato" } }}
                        InputLabelProps={{ style: { fontFamily: "Lato" } }}
                        className="mb-3 w-100"
                      />
                      <IconButton
                        aria-label="delete"
                        size="small"
                        className="mb-3"
                        onClick={() => handleRemoveCaracteristica(index)}
                      >
                        <CloseIcon fontSize="inherit" />
                      </IconButton>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-end mt-3">
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    fontFamily: "Lato",
                    ":hover": {
                      backgroundColor: "red",
                    },
                  }}
                  disableElevation
                  type="button"
                  onClick={() =>
                    handleAddRow(setCaracteristicas, createEmptyCaracteristica)
                  }
                > Agregar Característica </Button>
              </div>
            </div>
            <div>
              <Typography
                fontFamily="Lato"
                color="#1F1F1F"
                className="py-3 mt-3"
                fontWeight={"bold"}
                fontSize={{ xs: 16, md: 17, lg: 19 }}
              > Extras </Typography>
              {extras.map((object, index) => (
                <div
                  className="p-3 py-2 shadow-sm mb-3"
                  style={{
                    borderRadius: 10,
                  }}
                  key={index}
                >
                  <div className="text-end">
                    <IconButton
                      aria-label="delete"
                      size="small"
                      onClick={() => handleRemoveExtra(index)}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <TextField
                        required
                        size="small"
                        type="text"
                        name="nombre"
                        value={object.nombre}
                        onChange={(event) => handleExtraChange(index, event)}
                        label="Nombre"
                        inputProps={{ min: "0", style: { fontFamily: "Lato" } }}
                        InputLabelProps={{ style: { fontFamily: "Lato" } }}
                        className="mb-3 w-100"
                      />
                    </div>
                    <div className="col-md-6">
                      <TextField
                        required
                        size="small"
                        type="number"
                        name="precio"
                        value={object.precio}
                        onChange={(event) => handleExtraChange(index, event)}
                        label="Precio"
                        inputProps={{ min: "0", style: { fontFamily: "Lato" } }}
                        InputLabelProps={{ style: { fontFamily: "Lato" } }}
                        className="mb-3 w-100"
                      />
                    </div>
                    <div className="col">
                      <TextField
                        required
                        size="small"
                        type="text"
                        name="descripcion"
                        value={object.descripcion}
                        onChange={(event) => handleExtraChange(index, event)}
                        label="Descripción"
                        inputProps={{ min: "0", style: { fontFamily: "Lato" } }}
                        InputLabelProps={{ style: { fontFamily: "Lato" } }}
                        className="mb-3 w-100"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <div className="text-end mt-3">
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    fontFamily: "Lato",
                    ":hover": {
                      backgroundColor: "red",
                    },
                  }}
                  disableElevation
                  type="button"
                  onClick={() => handleAddRow(setExtras, createEmptyExtra)}
                > Agregar Extra </Button>
              </div>
            </div>
            <div>
              <Typography
                fontFamily="Lato"
                color="#1F1F1F"
                className="py-3 mt-3"
                fontWeight={"bold"}
                fontSize={{ xs: 16, md: 17, lg: 19 }}
              > Financiamiento * </Typography>
              <div className="row">
                <div className="col-md-4">
                  <div className="mb-4">
                    <div
                      className="p-3 py-2 shadow-sm"
                      style={{
                        backgroundColor: "#f5f5f5",
                        borderRadius: 10,
                        borderBottomLeftRadius: 0,
                        borderBottomRightRadius: 0,
                      }}
                    >
                      <div className="w-100">
                        <Typography
                          fontFamily="Lato"
                          color="#1f1f1f"
                          fontSize={{ xs: 15, md: 16, lg: 18 }}
                        > Enganche (%) </Typography>
                      </div>
                    </div>
                    <div
                      className="p-3 py-3 shadow-sm"
                      style={{
                        borderRadius: 10,
                        borderTopLeftRadius: 0,
                        borderTopRightRadius: 0,
                      }}
                    >
                      {enganche.map((value, index) => (
                        <div key={index}>
                          <div className="d-flex justify-content-between">
                            <TextField
                              required
                              size="small"
                              type="number"
                              name="porcentaje"
                              value={value}
                              onChange={(event) =>
                                handleEngancheChange(index, event.target.value)
                              }
                              label="%"
                              inputProps={{
                                min: "0",
                                style: { fontFamily: "Lato" },
                              }}
                              InputLabelProps={{ style: { fontFamily: "Lato" } }}
                              className="mb-2 w-100"
                            />
                            <IconButton
                              aria-label="delete"
                              size="small"
                              className="mb-2"
                              onClick={() => handleRemoveEnganche(index)}
                            >
                              <CloseIcon fontSize="inherit" />
                            </IconButton>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="text-end my-3">
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        fontFamily: "Lato",
                        ":hover": {
                          backgroundColor: "red",
                        },
                      }}
                      disableElevation
                      type="button"
                      onClick={() =>
                        handleAddRow(setEnganche, createEmptyEnganche)
                      }
                    > Agregar Enganche </Button>
                  </div>
                </div>
                <div className="col-md">
                  <div>
                    <div className="mb-4">
                      <div
                        className="p-3 py-2 shadow-sm"
                        style={{
                          backgroundColor: "#f5f5f5",
                          borderRadius: 10,
                          borderBottomLeftRadius: 0,
                          borderBottomRightRadius: 0,
                        }}
                      >
                        <div className="w-100 row">
                          <div className="col">
                            <Typography
                              fontFamily="Lato"
                              color="#1f1f1f"
                              fontSize={{ xs: 15, md: 16, lg: 18 }}
                            > Plazo (meses) </Typography>
                          </div>
                          <div className="col">
                            <Typography
                              fontFamily="Lato"
                              color="#1f1f1f"
                              fontSize={{ xs: 15, md: 16, lg: 18 }}
                            > Tasa (%) </Typography>
                          </div>
                        </div>
                      </div>
                      <div
                        className="p-3 py-3 shadow-sm"
                        style={{
                          borderRadius: 10,
                          borderTopLeftRadius: 0,
                          borderTopRightRadius: 0,
                        }}
                      >
                        {Object.entries(plazo).map(([index, item]) => (
                          <div className="row" key={index}>
                            <div className="col">
                              <TextField
                                required
                                size="small"
                                type="text"
                                name="key"
                                value={item.key}
                                onChange={(event) =>
                                  handleKeyChange(index, event.target.value)
                                }
                                label="Meses"
                                inputProps={{
                                  min: "0",
                                  style: { fontFamily: "Lato" },
                                }}
                                InputLabelProps={{
                                  style: { fontFamily: "Lato" },
                                }}
                                className="mb-2 w-100"
                              />
                            </div>
                            <div className="col d-flex">
                              <TextField
                                required
                                size="small"
                                type="text"
                                name="value"
                                value={item.value}
                                onChange={(event) =>
                                  handleValueChange(index, event.target.value)
                                }
                                label="%"
                                inputProps={{
                                  min: "0",
                                  style: { fontFamily: "Lato" },
                                }}
                                InputLabelProps={{
                                  style: { fontFamily: "Lato" },
                                }}
                                className="mb-2 w-100"
                              />
                              <IconButton
                                aria-label="delete"
                                size="small"
                                className="mb-2"
                                onClick={() => handleRemovePlazo(index)}
                              >
                                <CloseIcon fontSize="inherit" />
                              </IconButton>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="text-end mt-3">
                      <Button
                        variant="contained"
                        size="small"
                        sx={{
                          fontFamily: "Lato",
                          ":hover": {
                            backgroundColor: "red",
                          },
                        }}
                        disableElevation
                        type="button"
                        onClick={handlePlazoAddRow}
                      > Agregar Plazo </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div>
                <Typography
                  fontFamily="Lato"
                  color="#1F1F1F"
                  className="py-3 mt-3"
                  fontWeight={"bold"}
                  fontSize={{ xs: 16, md: 17, lg: 19 }}
                > Entrega* </Typography>
                {entrega.map((object, index) => (
                  <div
                    className="p-3 py-2 shadow-sm mb-3"
                    style={{
                      borderRadius: 10,
                    }}
                    key={index}
                  >
                    <div className="text-end">
                      <IconButton
                        aria-label="delete"
                        size="small"
                        onClick={() => handleRemoveEntrega(index)}
                      >
                        <CloseIcon fontSize="inherit" />
                      </IconButton>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <TextField
                          required
                          size="small"
                          type="text"
                          name="nombre"
                          value={object.nombre}
                          onChange={(event) => handleEntregaChange(index, event)}
                          label="Nombre"
                          inputProps={{ min: "0", style: { fontFamily: "Lato" } }}
                          InputLabelProps={{ style: { fontFamily: "Lato" } }}
                          className="mb-3 w-100"
                        />
                      </div>
                      <div className="col-md-6">
                        <TextField
                          required
                          size="small"
                          type="number"
                          name="precio"
                          value={object.precio}
                          onChange={(event) => handleEntregaChange(index, event)}
                          label="Precio"
                          inputProps={{ min: "0", style: { fontFamily: "Lato" } }}
                          InputLabelProps={{ style: { fontFamily: "Lato" } }}
                          className="mb-3 w-100"
                        />
                      </div>
                      <div className="col">
                        <TextField
                          required
                          size="small"
                          type="text"
                          name="descripcion"
                          value={object.descripcion}
                          onChange={(event) => handleEntregaChange(index, event)}
                          label="Descripción"
                          inputProps={{ min: "0", style: { fontFamily: "Lato" } }}
                          InputLabelProps={{ style: { fontFamily: "Lato" } }}
                          className="mb-3 w-100"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <div className="text-end mt-3">
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      fontFamily: "Lato",
                      ":hover": {
                        backgroundColor: "red",
                      },
                    }}
                    disableElevation
                    type="button"
                    onClick={() => handleAddRow(setEntrega, createEmptyEntrega)}
                  > Modificar Entrega </Button>
                </div>
              </div>
            </div>
            <div className="text-center mt-3">
              <Button
                variant="contained"
                type="submit"
                className="w-50"
                sx={{
                  fontFamily: "Lato",
                  ":hover": {
                    backgroundColor: "red",
                  },
                }}
              > Guardar cambios </Button>
            </div>
            <CustomizedSnackbars setOpen={setOpen} message="Llena todos los campos necesarios" open={open} severity="error" />
          </form>
        </div>
      </Container>
    </ManagerLayout>
  );
};

export default CarRegistrationForm;
