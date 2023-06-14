// Author: Mateo Herrera Sebastian Gonzalez

import { useRouter } from "next/router";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  IconButton,
  Box,
  Typography,
  Button,
} from "@mui/material";
import LandingPageLayout from "@/components/buyer/layout";
import SimpleAccordion from "@/components/general/Accordion";
import CustomSlider from "@/components/general/Slider";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import StickyDiv from "@/components/general/sticky_div";
import Carousel from "@/components/general/Carousel";
import TemporaryDrawer from "@/components/general/Drawer";
import axios from 'axios';
import { useSession } from "next-auth/react";
import Cookies from "js-cookie";
import LoadingScreen from "@/components/general/LoadingScreen";

// TODOs:
// 1. Encriptar id de coche y desencriptar en el endpoint

// 6. Agregar funcionalidad de checkout

export default function CarDetails() {
  const router = useRouter();
  const { car_id } = router.query;
  const [carDetails, setCarDetails] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [wishList, setWishlist] = useState([]);

  // States for selected down payment
  const [selectedDownPayment, setSelectedDownPayment] = useState(0);
  const [downPayment, setDownPayment] = useState(0);

  const [selectedTerm, setSelectedTerm] = useState(0);
  const [favorite, setFavorite] = useState(false);
  const [interestRate, setInterestRate] = useState(0);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [isAvailable, setIsAvailable] = useState(true);

  const [carPrice, setCarPrice] = useState(0);

  const [totalCarPrice, setTotalCarPrice] = useState(0);

  // State for extras
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [totalPriceExtras, setTotalPriceExtras] = useState(0);

  // State for color
  const [selectedColor, setSelectedColor] = useState(null);

  // State for delivery price
  const [selectedDeliveryPrice, setSelectedDeliveryPrice] = useState(0);

  const { data: session } = useSession();

  const fetchCarDetails = async () => {
    const response = await fetch(
      `/api/catalogoNuevo/detalles-auto?car_id=${car_id}`
    );

    const data = await response.json();

    if (!carDetails) {
      setCarDetails(data.result);
    }
    setCarPrice(data.result.precio);
    if (selectedColor === null) {
      setSelectedColor(data.result.colores[0]);
    }
    setIsAvailable(data.result.disponible_prueba);
  };

  const handleFavorites = (wishList) => {
    if (wishList){
      if (wishList.some(car => car._id === car_id)) {
        setFavorite(true);
      } else {
        setFavorite(false);
      }
    }
  };
  
  const fetchFavorites = async () => {
    if (session){
      try {
        const response = await axios.get('/api/wishlist/pull-wishlist', { params: { id: session.id } }); 
        setWishlist(response.data);
        handleFavorites(response.data);
      } 
      catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  }; 

  // const handleFavorites = async () => {
  //   if (wishList.some(car => car._id === car_id)) {
  //     setFavorite(true);
  //   } else {
  //     setFavorite(false);
  //   }
  // };

  useEffect(() => {
    const fetchData = async () => {
      if (session) {
        await fetchFavorites();
        handleFavorites();
      }
    };
  
    fetchData();
  }, [session]);

  useEffect(() => {
    if (!car_id) {
      return;
    }
    fetchCarDetails();
    calculateTotalPriceExtras();
    calculateDownPaymentAmount();
    calculateMonthlyPayment();
  }, [
    car_id,
    selectedExtras,
    selectedDownPayment,
    selectedTerm,
    interestRate,
    downPayment,
  ]);

  useEffect(() => {
    if (carDetails) {
      setSelectedDownPayment(carDetails.enganche[0]);
      setSelectedTerm(parseInt(Object.keys(carDetails.plazos)[0]));
      setInterestRate(carDetails.plazos[Object.keys(carDetails.plazos)[0]]);
    }
  }, [carDetails]);

  const handleFavoritesToggle = async () => {
    let newFavorite = !favorite;
    let newWishList = [...wishList];
    if (newFavorite) {
      newWishList.push(car_id);
    } else {
      newWishList = newWishList.filter(car => car._id !== car_id);
    }
    setFavorite(newFavorite);
    setWishlist(newWishList);
    try {
      await axios.put('/api/wishlist/add-to-wishlist', { id: session.id, lst: newWishList });
    } catch (error) {
      console.error('Error fetching data:', error);
      // If the update fails, revert the state
      setFavorite(!newFavorite);
      setWishlist(wishList);
    }
  };

  const handleButtonClick = (sectionId) => {
    const navbarHeight = document
      .getElementById("nav")
      .getBoundingClientRect().height;
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - navbarHeight;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
    }
  };

  async function handleConfirmPurchase() {
    const auto = {
      auto_id: car_id,
      marca: carDetails.marca,
      modelo: carDetails.modelo,
      ano: carDetails.año,
      precio: carDetails.precio.toString(),
      array_fotografias_url: selectedColor.imagenes,
      agencia: carDetails.agencia_id,
    };

    const payment =
      parseFloat(downPayment) +
      parseFloat(monthlyPayment) +
      parseFloat(selectedDeliveryPrice);
    const body = {
      usuario_final_id: session.id,
      auto: auto,
      cantidad_a_pagar: payment,
    };

    try {
      const result = await fetch("/api/saleCreation/with-mongo", {
        method: "POST",
        body: JSON.stringify(body),
      });

      await result.json().then((data) => {
        router.push(`/purchase/${data.id}`);
      });

      //router.push(`/purchase/${data.id}`);
    } catch (error) {
      console.log(error);
    }
  }
  // Calculate the total price based on selected extras
  const calculateTotalPriceExtras = () => {
    const extrasPrice = selectedExtras.reduce(
      (total, extra) => total + extra.precio,
      0
    );
    setTotalPriceExtras(extrasPrice);
  };

  const calculateDownPaymentAmount = () => {
    let downPaymentAmmount = carPrice * (selectedDownPayment / 100);
    setDownPayment(downPaymentAmmount);
  };

  const calculateMonthlyPayment = () => {
    const initialLoan = carPrice + totalPriceExtras - downPayment;
    const capitalPayment = initialLoan / selectedTerm;

    const totalInterest = (interestRate / 12 / 100) * selectedTerm;
    const interestPayment = (initialLoan * totalInterest) / selectedTerm;

    const monthlyPaymentTotal = capitalPayment + interestPayment;
    setMonthlyPayment(monthlyPaymentTotal.toFixed(2));
  };

  // Function to handle checkbox change of
  const handleCheckboxChange = (event) => {
    const extraTitulo = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      const selectedExtra = carDetails.extras.find(
        (extra) => extra.titulo === extraTitulo
      );
      setSelectedExtras((prevSelectedExtras) => [
        ...prevSelectedExtras,
        selectedExtra,
      ]);
    } else {
      setSelectedExtras((prevSelectedExtras) =>
        prevSelectedExtras.filter((extra) => extra.titulo !== extraTitulo)
      );
    }
  };

  if (carDetails != null) {
    const firstDetails = [
      {
        name: "Tipo de combustible",
        value: carDetails.combustible,
        icon: "/buyer/combustible.png",
      },
      {
        name: "Tipo de vehículo",
        value: carDetails.tipo_vehiculo,
        icon: "/buyer/tipoVehiculo.png",
      },
      {
        name: "Motor de vehículo",
        value: carDetails.motor,
        icon: "/buyer/tipoCombustible.png",
      },
    ];

    const secondDetails = [
      {
        name: "Transmisión",
        value: carDetails.transmision,
        icon: "/buyer/transmision.png",
      },
      {
        name: "Rendimiento",
        value: carDetails.rendimiento,
        icon: "/buyer/traccion.png",
      },
      {
        name: "Pasajeros",
        value: carDetails.pasajeros,
        icon: "/buyer/pasajeros.png",
      },
    ];

    const enganche = carDetails.enganche?.map((enganche) => ({
      value: enganche,
      label: `${enganche}%`,
    }));
    const plazo = Object.keys(carDetails.plazos)?.map((plazo) => ({
      value: parseInt(plazo),
      label: `${plazo}`,
    }));

    const viewDrivingRequestDetails = (auto_id) => {
      const colorName = selectedColor.nombre;
      // Navigate to a new page to view the details of the request
      router.push({
        pathname: "./test-detail",
        query: { auto_id, colorName },
      });
    };

    const disableContinueButton = () => {
      var button = document.getElementById("confirmButton");
      button.disabled = true;
    }

    return (
      <div>
        <LandingPageLayout>
          <Container maxWidth="xl">
            <div className="section p-5">
              <Link href="/catalog">
                <ArrowBackIosNewIcon
                  sx={{ width: "15px", color: "#F55C7A", fontWeight: "bold" }}
                />{" "}
                <span style={{ color: "#F55C7A", fontWeight: "bold" }}>
                  Regresar al catálogo
                </span>
              </Link>
              <div className="pt-4">
                <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={2}>
                    <Grid item md={7} sm={12}>
                      <Carousel
                        images={selectedColor.imagenes}
                        indicators={true}
                      />
                      {/* <div className="pt-2 text-end">
                        <IconButton aria-label="360">
                          <img
                            src="/buyer/360_symbol.png"
                            height="15px"
                            alt="360"
                          />
                        </IconButton>
                      </div> */}
                    </Grid>
                    <Grid item md={5} xs={12}>
                      <div
                        className="rounded p-3 d-flex flex-column justify-content-between"
                        style={{
                          height: "100%",
                          borderWidth: "2px",
                          borderColor: "#BABABA",
                          borderStyle: "solid",
                        }}
                      >
                        <div className="text-end">
                          <IconButton
                            aria-label="favorito"
                            onClick={() => {
                              handleFavoritesToggle();
                            }}
                            // onClick={() => setFavorite(!favorite)}
                            className="p-0"
                          >
                            <img
                              src={
                                favorite
                                  ? "/buyer/heart_filled.png"
                                  : "/buyer/heart.png"
                              }
                              height="20px"
                              alt="heart"
                            />
                          </IconButton>
                        </div>
                        <Typography
                          fontFamily="Lato"
                          color="#8A8A8A"
                          fontSize={{ xs: 17, md: 20, lg: 24 }}
                        >
                          {carDetails.año}
                        </Typography>
                        <Typography
                          fontFamily="Lato"
                          color="#000"
                          fontSize={{ xs: 25, md: 28, lg: 33 }}
                          className="pt-2"
                        >
                          {carDetails.marca} {carDetails.modelo}
                        </Typography>
                        <div className="d-flex pt-3 align-items-start">
                          <img
                            src="/buyer/ubicacion.png"
                            height="18px"
                            className="mt-1"
                            alt="ubicacion"
                          />
                          <Typography
                            fontFamily="Lato"
                            color="#BABABA"
                            fontSize={{ xs: 15, md: 16, lg: 18 }}
                            className="ms-2"
                          >
                            {carDetails.direccion_agencia}
                          </Typography>
                        </div>
                        <div className="d-flex pt-2 align-items-center">
                          <img
                            src="/buyer/agencia.png"
                            height="17px"
                            alt="agencia"
                          />
                          <Typography
                            fontFamily="Lato"
                            color="#BABABA"
                            fontSize={{ xs: 15, md: 16, lg: 18 }}
                            className="ms-2"
                          >
                            {carDetails.nombre_agencia}
                          </Typography>
                        </div>
                        <Typography
                          fontFamily="Lato"
                          color="#000"
                          fontSize={{ xs: 30, md: 32, lg: 42 }}
                          fontWeight="bold"
                          className="pt-3"
                        >
                          ${Intl.NumberFormat().format(carDetails.precio)} MXN
                        </Typography>
                        <div>
                          <Typography
                            fontFamily="Lato"
                            color="#8A8A8A"
                            fontSize={{ xs: 15, md: 16, lg: 18 }}
                            className="pt-1"
                          >
                            Elegir color
                          </Typography>
                          <div className="d-flex">
                            {carDetails.colores?.map((color, index) => (
                              <div className="pt-1" key={index}>
                                <IconButton
                                  aria-label="color"
                                  onClick={() => setSelectedColor(color)}
                                  style={{
                                    backgroundColor: color.valor_hexadecimal,
                                    borderRadius: "100%",
                                    height: "22px",
                                    width: "22px",
                                    border: "none",
                                  }}
                                  className="me-1 border"
                                />
                              </div>
                            ))}
                          </div>
                          <div className="pt-3 text-center">
                            <Button
                              variant="contained"
                              className="me-3"
                              disableElevation
                              sx={{
                                backgroundColor: "#FFF",
                                color: "#3A3A3A",
                                fontFamily: "lato",
                                fontWeight: "bold",
                                border: "solid 1px #BABABA",
                                ":hover": { backgroundColor: "#BABABA" },
                              }}
                              onClick={() => {
                                if (session) {
                                  viewDrivingRequestDetails(car_id);
                                } else {
                                  window.location.href = "/auth/login";
                                  Cookies.set(
                                    "CAR_REQ",
                                    `${window.location.origin}/catalog/${car_id}`
                                  );
                                }
                              }}
                              // disabled={!isAvailable}
                            >
                              Prueba de manejo
                            </Button>
                            <Button
                              variant="contained"
                              disableElevation
                              sx={{
                                backgroundColor: "#F55C7A",
                                fontFamily: "lato",
                                fontWeight: "bold",
                                ":hover": { backgroundColor: "#BABABA" },
                              }}
                              onClick={() => {
                                if (session) {
                                  setDrawerOpen(true);
                                } else {
                                  window.location.href = "/auth/login";
                                  Cookies.set(
                                    "CAR_REQ",
                                    `${window.location.origin}/catalog/${car_id}`
                                  );
                                }
                              }}
                            >
                              Compra
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                </Box>
              </div>
            </div>
          </Container>
          <StickyDiv>
            <div id="nav">
              <div style={{ backgroundColor: "#1F1F1F" }}>
                <Container maxWidth="xl">
                  <div className="section p-5 py-3 d-flex justify-content-between">
                    <div className="d-flex align-items-center">
                      <img
                        src={
                          selectedColor.imagenes
                            ? selectedColor.imagenes[0]
                            : ""
                        }
                        className="rounded d-none d-sm-block me-3"
                        alt={carDetails.modelo}
                        style={{
                          objectFit: "cover",
                          objectPosition: "center",
                          overflow: "hidden",
                          height: "100px",
                          width: "177px",
                        }}
                      />
                      <div>
                        <Typography
                          fontFamily="Lato"
                          color="#fff"
                          fontWeight={"bold"}
                          fontSize={{ xs: 22, md: 28, lg: 28 }}
                          className="pb-1"
                        >
                          {carDetails.marca} {carDetails.modelo}
                        </Typography>
                        <Typography
                          fontFamily="Lato"
                          color="#fff"
                          fontSize={{ xs: 20, md: 26, lg: 26 }}
                          style={{ fontWeight: "lighter" }}
                        >
                          {carDetails.año}
                        </Typography>
                      </div>
                    </div>
                    <div className="d-flex flex-column align-items-center justify-content-center">
                      <Typography
                        fontFamily="Lato"
                        color="#fff"
                        fontWeight={"bold"}
                        fontSize={{ xs: 20, md: 28, lg: 28 }}
                      >
                        $
                        {Intl.NumberFormat().format(
                          carPrice
                        )}{" "}
                        MXN
                      </Typography>
                      <Typography
                        fontFamily="Lato"
                        color="#BABABA"
                        fontWeight={"bold"}
                        fontSize={{ xs: 10, md: 18, lg: 18 }}
                        className="text-end w-100 pb-1"
                      >
                        +${Intl.NumberFormat().format(selectedDeliveryPrice + totalPriceExtras)}{" "}
                        MXN
                      </Typography>
                      <Button
                        variant="contained"
                        disableElevation
                        sx={{
                          backgroundColor: "#F55C7A",
                          fontFamily: "lato",
                          fontWeight: "bold",
                          ":hover": { backgroundColor: "#BABABA" },
                        }}
                        onClick={() => {
                          if (session) {
                            setDrawerOpen(true);
                          } else {
                            window.location.href = "/auth/login";
                            Cookies.set(
                              "CAR_REQ",
                              `${window.location.origin}/catalog/${car_id}`
                            );
                          }
                        }}
                        size="small"
                        className="w-100"
                      >
                        Compra
                      </Button>
                    </div>
                  </div>
                </Container>
              </div>
              <div
                style={{
                  borderBottom: "solid 1px #5B5B5B",
                  backgroundColor: "#FFF",
                }}
              >
                <Container maxWidth="xl">
                  <div
                    className="section px-5 d-flex align-items-end justify-content-around"
                    style={{ height: "60px" }}
                  >
                    <div className="w-100">
                      <Button
                        onClick={() => handleButtonClick("resumen")}
                        style={{ textTransform: "none" }}
                        sx={{
                          borderRadius: 0,
                          ":hover": {
                            borderBottom: "solid 2px #F55C7A",
                            backgroundColor: "#FFF",
                          },
                        }}
                        className="w-100"
                      >
                        <Typography
                          fontFamily="Lato"
                          color="#000"
                          fontSize={{ xs: 11, sm: 16, md: 18, lg: 18 }}
                        >
                          Resumen
                        </Typography>
                      </Button>
                    </div>
                    <div className="w-100">
                      <Button
                        onClick={() => handleButtonClick("caracteristicas")}
                        style={{ textTransform: "none" }}
                        sx={{
                          borderRadius: 0,
                          ":hover": {
                            borderBottom: "solid 2px #F55C7A",
                            backgroundColor: "#FFF",
                          },
                        }}
                        className="w-100"
                      >
                        <Typography
                          fontFamily="Lato"
                          color="#000"
                          fontSize={{ xs: 11, sm: 16, md: 18, lg: 18 }}
                        >
                          Características
                        </Typography>
                      </Button>
                    </div>
                    <div className="w-100">
                      <Button
                        onClick={() => handleButtonClick("extras")}
                        style={{ textTransform: "none" }}
                        sx={{
                          borderRadius: 0,
                          ":hover": {
                            borderBottom: "solid 2px #F55C7A",
                            backgroundColor: "#FFF",
                          },
                        }}
                        className="w-100"
                      >
                        <Typography
                          fontFamily="Lato"
                          color="#000"
                          fontSize={{ xs: 11, sm: 16, md: 18, lg: 18 }}
                        >
                          Extras
                        </Typography>
                      </Button>
                    </div>
                    <div className="w-100">
                      <Button
                        onClick={() => handleButtonClick("financiamiento")}
                        style={{ textTransform: "none" }}
                        sx={{
                          borderRadius: 0,
                          ":hover": {
                            borderBottom: "solid 2px #F55C7A",
                            backgroundColor: "#FFF",
                          },
                        }}
                        className="w-100"
                      >
                        <Typography
                          fontFamily="Lato"
                          color="#000"
                          fontSize={{ xs: 11, sm: 16, md: 18, lg: 18 }}
                        >
                          Financiamiento
                        </Typography>
                      </Button>
                    </div>
                  </div>
                </Container>
              </div>
            </div>
          </StickyDiv>
          <Container maxWidth="xl" id="resumen">
            <div className="section p-5">
              <Typography
                fontFamily="Lato"
                color="#1F1F1F"
                fontSize={{ xs: 25, md: 28, lg: 33 }}
                className="pt-2"
              >
                Resumen del auto
              </Typography>
              <Grid container className="mt-1" direction="row" spacing={4}>
                <Grid item md={6} xs={12}>
                  <div className="d-flex flex-column">
                    {firstDetails?.map((detail, index) => (
                      <div
                        className="d-flex justify-content-between mb-5"
                        key={index}
                      >
                        <div className="d-flex align-items-center">
                          <img
                            src={detail.icon}
                            height="18px"
                            width={"18px"}
                            alt="detalle"
                          />
                          <Typography
                            fontFamily="Lato"
                            color="#1F1F1F"
                            fontWeight={"bold"}
                            fontSize={{ xs: 15, md: 16, lg: 18 }}
                            className="ms-3"
                          >
                            {detail.name}
                          </Typography>
                        </div>
                        <Typography
                          fontFamily="Lato"
                          color="#333333"
                          fontSize={{ xs: 15, md: 16, lg: 18 }}
                        >
                          {detail.value}
                        </Typography>
                      </div>
                    ))}
                  </div>
                </Grid>
                <Grid item md={6} xs={12}>
                  <div className="d-flex flex-column">
                    {secondDetails?.map((detail, index) => (
                      <div
                        className="d-flex justify-content-between mb-5"
                        key={index}
                      >
                        <div className="d-flex align-items-center">
                          <img
                            src={detail.icon}
                            height="18px"
                            width={"18px"}
                            alt="icono"
                          />
                          <Typography
                            fontFamily="Lato"
                            color="#1F1F1F"
                            fontWeight={"bold"}
                            fontSize={{ xs: 15, md: 16, lg: 18 }}
                            className="ms-3"
                          >
                            {detail.name}
                          </Typography>
                        </div>
                        <Typography
                          fontFamily="Lato"
                          color="#333333"
                          fontSize={{ xs: 15, md: 16, lg: 18 }}
                        >
                          {detail.value}
                        </Typography>
                      </div>
                    ))}
                  </div>
                </Grid>
              </Grid>
            </div>
          </Container>
          <div style={{ backgroundColor: "#F7F7F7" }} id="caracteristicas">
            <Container maxWidth="xl">
              <div className="section p-5">
                <Typography
                  fontFamily="Lato"
                  color="#1F1F1F"
                  fontSize={{ xs: 25, md: 28, lg: 33 }}
                  className="pt-2"
                >
                  Características
                </Typography>

                <div className="row mt-4">
                  {carDetails.caracteristicas?.map((caracteristica, index) => (
                    <div
                      className="col-lg-3 col-md-4 col-sm-6 p-5 py-3"
                      key={index}
                    >
                      <li
                        style={{
                          fontFamily: "Lato",
                          fontSize: "1.1rem",
                        }}
                      >
                        {caracteristica}
                      </li>
                    </div>
                  ))}
                </div>
              </div>
            </Container>
          </div>
          <div id="extras">
            <Container maxWidth="xl">
              <div className="section p-5">
                <Typography
                  fontFamily="Lato"
                  color="#1F1F1F"
                  fontSize={{ xs: 25, md: 28, lg: 33 }}
                  className="pt-2"
                >
                  Extras
                </Typography>
                <div className="row my-4">
                  {carDetails.extras?.map((extra) => (
                    <div className="col-md-6 mb-3" key={extra.titulo}>
                      <SimpleAccordion
                        content={extra.descripcion}
                        backgroundColorTitle="#F7F7F7"
                        fontFamily="Lato"
                        fontSize={{ xs: 13, md: 15, lg: 16 }}
                        color="#333333"
                      >
                        <div className="d-flex justify-content-between w-100">
                          <div className="d-flex">
                            <input
                              type="checkbox"
                              style={{
                                width: "16px",
                                borderWidth: "1px",
                                color: "#333333",
                                accentColor: "#F55C7A",
                              }}
                              value={extra.titulo}
                              checked={selectedExtras.some(
                                (selectedExtra) =>
                                  selectedExtra.titulo === extra.titulo
                              )}
                              onChange={(e) => {
                                handleCheckboxChange(e);
                                calculateTotalPriceExtras();
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                              className="me-3"
                            />
                            <Typography
                              fontFamily="Lato"
                              color="#1F1F1F"
                              fontSize={{ xs: 15, md: 16, lg: 18 }}
                              fontWeight={"bold"}
                            >
                              {extra.titulo}
                            </Typography>
                          </div>
                          <Typography
                            fontFamily="Lato"
                            color="#8A8A8A"
                            fontSize={{ xs: 15, md: 16, lg: 18 }}
                          >
                            (+${Intl.NumberFormat().format(extra.precio)} MXN)
                          </Typography>
                        </div>
                      </SimpleAccordion>
                    </div>
                  ))}
                </div>
              </div>
            </Container>
          </div>
          <Container maxWidth="xl" id="financiamiento">
            <div className="section p-5 pt-0">
              <Typography
                fontFamily="Lato"
                color="#1F1F1F"
                fontSize={{ xs: 25, md: 28, lg: 33 }}
              >
                Financiamiento
              </Typography>
              <div className="row my-5">
                <div className="col-md-6">
                  <div className="text-center mb-4">
                    <Typography
                      fontFamily="Lato"
                      color="#1F1F1F"
                      fontSize={{ xs: 16, md: 17, lg: 19 }}
                      fontWeight={"bold"}
                    >
                      Calcula tus mensualidades
                    </Typography>
                  </div>
                  <div style={{ backgroundColor: "#f7f7f7", borderRadius: 10 }}>
                    <div
                      style={{ backgroundColor: "#f7f7f7", borderRadius: 10 }}
                      className="p-4 px-5"
                    >
                      <Typography
                        fontFamily="Lato"
                        color="#1F1F1F"
                        fontSize={{ xs: 15, md: 16, lg: 18 }}
                        className="mb-3"
                      >
                        Enganche
                      </Typography>
                      <CustomSlider
                        marks={enganche}
                        max={enganche[enganche.length - 1].value}
                        onChange={(e) => {
                          setSelectedDownPayment(parseInt(e.target.value));
                        }}
                        defaultValue={enganche[0]?.value}
                      />
                    </div>
                    <div style={{ backgroundColor: "#d9d9d9" }}>
                      <div className="px-5 py-2 d-flex justify-content-between">
                        <Typography
                          fontFamily="Lato"
                          color="#1F1F1F"
                          fontSize={{ xs: 15, md: 16, lg: 18 }}
                        >
                          Enganche de <strong>{selectedDownPayment}%</strong>
                        </Typography>
                        <Typography
                          fontFamily="Lato"
                          color="#1F1F1F"
                          fontSize={{ xs: 15, md: 16, lg: 18 }}
                        >
                          <strong>
                            ${Intl.NumberFormat().format(downPayment)} MXN
                          </strong>
                        </Typography>
                      </div>
                    </div>
                    <div
                      style={{ backgroundColor: "#f7f7f7", borderRadius: 10 }}
                      className="p-4 px-5"
                    >
                      <Typography
                        fontFamily="Lato"
                        color="#1F1F1F"
                        fontSize={{ xs: 15, md: 16, lg: 18 }}
                        className="mb-3"
                      >
                        Plazo (meses)
                      </Typography>
                      <CustomSlider
                        marks={plazo}
                        max={plazo[plazo.length - 1].value}
                        onChange={(e) => {
                          setSelectedTerm(e.target.value);
                          setInterestRate(carDetails.plazos[e.target.value]);
                        }}
                        defaultValue={plazo[0]?.value}
                      />
                    </div>
                    <div style={{ backgroundColor: "#d9d9d9" }}>
                      <div className="px-5 py-2 d-flex justify-content-between">
                        <Typography
                          fontFamily="Lato"
                          color="#1F1F1F"
                          fontSize={{ xs: 15, md: 16, lg: 18 }}
                        >
                          Plazo de <strong>{selectedTerm} meses</strong>
                        </Typography>
                        <Typography
                          fontFamily="Lato"
                          color="#1F1F1F"
                          fontSize={{ xs: 15, md: 16, lg: 18 }}
                        >
                          Tasa de{" "}
                          <strong>
                            {" "}
                            {Math.round(
                              (carDetails.plazos[selectedTerm] +
                                Number.EPSILON) *
                                100
                            ) / 100
                              ? Math.round(
                                  (carDetails.plazos[selectedTerm] +
                                    Number.EPSILON) *
                                    100
                                ) / 100
                              : 0}
                            %
                          </strong>
                        </Typography>
                      </div>
                    </div>

                    <div
                      style={{ backgroundColor: "#f7f7f7", borderRadius: 10 }}
                      className="py-4 p-5 text-center mb-4"
                    >
                      <Typography
                        fontFamily="Lato"
                        color="#1F1F1F"
                        fontSize={{ xs: 17, md: 18, lg: 20 }}
                      >
                        <strong>
                          $
                          {Intl.NumberFormat().format(
                            monthlyPayment !== "NaN" ? monthlyPayment : 0
                          )}
                        </strong>
                        {" MXN "}
                        al mes
                      </Typography>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 mb-3">
                  <div className="text-center mb-4">
                    <Typography
                      fontFamily="Lato"
                      color="#1F1F1F"
                      fontSize={{ xs: 16, md: 17, lg: 19 }}
                      fontWeight={"bold"}
                    >
                      Metodo de entrega
                    </Typography>
                  </div>
                  {carDetails.entrega?.map((entrega, index) => (
                    <div key={index} className="mb-3">
                      <SimpleAccordion
                        content={entrega.descripcion}
                        backgroundColorTitle="#F7F7F7"
                        fontFamily="Lato"
                        fontSize={{ xs: 13, md: 15, lg: 16 }}
                        color="#333333"
                      >
                        <div className="d-flex justify-content-between w-100">
                          <div className="d-flex">
                            <input
                              type="checkbox"
                              style={{
                                width: "16px",
                                borderWidth: "1px",
                                color: "#333333",
                                accentColor: "#F55C7A",
                              }}
                              // value={extra.titulo}
                              checked={selectedDeliveryPrice === entrega.precio}
                              onChange={(e) => {
                                setSelectedDeliveryPrice(entrega.precio);
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                              className="me-3"
                            />
                            <Typography
                              fontFamily="Lato"
                              color="#1F1F1F"
                              fontSize={{ xs: 15, md: 16, lg: 18 }}
                              fontWeight={"bold"}
                            >
                              {entrega.nombre}
                            </Typography>
                          </div>

                          <Typography
                            fontFamily="Lato"
                            color="#8A8A8A"
                            fontSize={{ xs: 15, md: 16, lg: 18 }}
                          >
                            (+${Intl.NumberFormat().format(entrega.precio)} MXN)
                          </Typography>
                        </div>
                      </SimpleAccordion>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </LandingPageLayout>
        <TemporaryDrawer
          open={drawerOpen}
          setState={setDrawerOpen}
          anchor={"bottom"}
        >
          <div className="w-100 d-flex justify-content-center">
            <div className="p-5 d" style={{ maxWidth: "75vw" }}>
              <Typography
                fontFamily="Lato"
                color="#000"
                fontSize={{ xs: 17, md: 20, lg: 24 }}
                sx={{ fontWeight: "bold" }}
                className="text-center mb-2"
              >
                Confirma tu selección
              </Typography>
              <Typography
                fontFamily="Lato"
                color="#8A8A8A"
                fontSize={{ xs: 17, md: 20, lg: 24 }}
                sx={{ fontWeight: "bold" }}
              >
                Tu automóvil
              </Typography>
              <Grid container spacing={2}>
                <Grid item sm={7} xs={12}>
                  <img
                    src={selectedColor.imagenes[0]}
                    className="d-block w-100 h-100 rounded"
                    alt={"imagen carousel"}
                    style={{
                      objectFit: "cover",
                      objectPosition: "center",
                      overflow: "hidden",
                    }}
                  />
                </Grid>
                <Grid item sm={5} xs={12}>
                  <div
                    className="rounded p-3 d-flex flex-column justify-content-around text-center border"
                    style={{ height: "100%" }}
                  >
                    <Typography
                      fontFamily="Lato"
                      color="#000"
                      fontSize={{ xs: 25, md: 28, lg: 45 }}
                      className="pt-2"
                    >
                      {carDetails.marca} {carDetails.modelo}
                    </Typography>
                    <Typography
                      fontFamily="Lato"
                      color="#8A8A8A"
                      fontSize={{ xs: 17, md: 20, lg: 30 }}
                    >
                      {carDetails.año}
                    </Typography>
                    <div>
                      <div>
                        <IconButton
                          aria-label="color"
                          style={{
                            backgroundColor: selectedColor.valor_hexadecimal,
                            borderRadius: "100%",
                            height: "40px",
                            width: "40px",
                            border: "none",
                          }}
                          className="me-1"
                        />
                      </div>
                      <Typography
                        fontFamily="Lato"
                        color="#8A8A8A"
                        fontSize={{ xs: 17, md: 20, lg: 24 }}
                      >
                        {selectedColor.nombre}
                      </Typography>
                    </div>
                  </div>
                </Grid>
                <Grid item sm={6} xs={12}>
                  <Typography
                    fontFamily="Lato"
                    color="#8A8A8A"
                    fontSize={{ xs: 17, md: 20, lg: 24 }}
                    sx={{ fontWeight: "bold" }}
                  >
                    Tu finaciamiento
                  </Typography>
                  <div
                    className="rounded d-flex flex-column justify-content-between text-center border"
                    style={{
                      height: "100%",
                    }}
                  >
                    <div style={{ backgroundColor: "#f7f7f7" }} className="p-1">
                      <Typography
                        fontFamily="Lato"
                        color="#000"
                        fontSize={{ xs: 15, md: 20, lg: 24 }}
                        sx={{ fontWeight: "bold" }}
                      >
                        Enganche
                      </Typography>
                    </div>
                    <div className="p-2">
                      <Typography
                        fontFamily="Lato"
                        color="#000"
                        fontSize={{ xs: 15, md: 20, lg: 24 }}
                      >
                        ${Intl.NumberFormat().format(downPayment)} MXN
                      </Typography>
                    </div>
                    <div style={{ backgroundColor: "#f7f7f7" }} className="p-1">
                      <Typography
                        fontFamily="Lato"
                        color="#000"
                        fontSize={{ xs: 13, md: 20, lg: 24 }}
                        sx={{ fontWeight: "bold" }}
                      >
                        Mensualidades
                      </Typography>
                    </div>
                    <div className="p-2">
                      <Typography
                        fontFamily="Lato"
                        color="#000"
                        fontSize={{ xs: 13, md: 20, lg: 24 }}
                      >
                        {selectedTerm} meses
                      </Typography>
                    </div>
                    <div style={{ backgroundColor: "#f7f7f7" }} className="p-1">
                      <Typography
                        fontFamily="Lato"
                        color="#000"
                        fontSize={{ xs: 13, md: 20, lg: 24 }}
                        fontweight="bold"
                        sx={{ fontWeight: "bold" }}
                      >
                        Tasa
                      </Typography>
                    </div>
                    <div className="p-2">
                      <Typography
                        fontFamily="Lato"
                        color="#000"
                        fontSize={{ xs: 13, md: 20, lg: 24 }}
                      >
                        {Math.round((interestRate + Number.EPSILON) * 100) /
                          100}
                        %
                      </Typography>
                    </div>
                  </div>
                </Grid>
                <Grid item sm={6} xs={12}>
                  <Typography
                    fontFamily="Lato"
                    color="#8A8A8A"
                    fontSize={{ xs: 17, md: 20, lg: 24 }}
                    sx={{ fontWeight: "bold" }}
                  >
                    Resumen de pago (MXN):
                  </Typography>
                  <div className="rounded d-flex flex-column justify-content-between border">
                    <div className="p-1 px-3">
                      <Typography
                        fontFamily="Lato"
                        color="#000"
                        fontSize={{ xs: 13, md: 20, lg: 24 }}
                        className="d-flex justify-content-between mb-2"
                      >
                        <div>Enganche:</div>
                        <div>
                          ${Intl.NumberFormat().format(downPayment)}
                        </div>
                      </Typography>
                      <Typography
                        fontFamily="Lato"
                        color="#000"
                        fontSize={{ xs: 13, md: 20, lg: 24 }}
                        className="d-flex justify-content-between mb-2"
                      >
                        <div>Pago Mensualidad:</div>
                        <div>
                          ${Intl.NumberFormat().format(monthlyPayment)} 
                        </div>
                      </Typography>
                      <Typography
                        fontFamily="Lato"
                        color="#000"
                        fontSize={{ xs: 13, md: 20, lg: 24 }}
                        className="d-flex justify-content-between mb-2"
                      >
                        <div>Entrega:</div>
                        <div>
                          ${Intl.NumberFormat().format(selectedDeliveryPrice)}{" "}
                          
                        </div>
                      </Typography>

                      <Typography
                        fontFamily="Lato"
                        color="#000"
                        fontSize={{ xs: 13, md: 20, lg: 24 }}
                        className="d-flex justify-content-between border-top"
                      >
                        <div>Total:</div>
                        <div>
                          $
                          {Intl.NumberFormat().format(
                            parseFloat(downPayment) +
                              parseFloat(monthlyPayment) +
                              parseFloat(selectedDeliveryPrice)
                          )}{" "}
                        </div>
                      </Typography>
                    </div>
                  </div>
                  <div className="mt-3 d-flex flex-column">
                    <Button
                      id="confirmButton"
                      variant="contained"
                      disableElevation
                      size="large"
                      sx={{
                        backgroundColor: "#F55C7A",
                        fontFamily: "lato",
                        fontWeight: "bold",
                        ":hover": { backgroundColor: "#BABABA" },
                      }}
                      onClick={() => { 
                        disableContinueButton()
                        handleConfirmPurchase()
                      }}
                    >
                      Proceder con la compra
                    </Button>

                    <Button
                      variant="contained"
                      className="mt-3"
                      size="large"
                      disableElevation
                      sx={{
                        backgroundColor: "#FFF",
                        color: "#3A3A3A",
                        fontFamily: "lato",
                        fontWeight: "bold",
                        border: "solid 1px #BABABA",
                        ":hover": { backgroundColor: "#BABABA" },
                      }}
                      onClick={() => setDrawerOpen(false)}
                    >
                      Cancelar
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </div>
          </div>
        </TemporaryDrawer>
      </div>
    );
  } else {
    return (
      <div>
        <LoadingScreen/>
      </div>
    );
  }
}
