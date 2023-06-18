import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { Container, Typography, Button } from "@mui/material";
import CheckoutPage from "@/components/general/checkout";
import LoadingScreen from "@/components/general/LoadingScreen";

export default function Process() {
    const router = useRouter();
    const { process_id } = router.query;

    console.log("process_id: " + process_id);
    const [process, setProcess] = useState(null);

    const fetchProcess = async () => {
        const response = await fetch(
            `/api/purchase-docs/with-mongo?process_id=${process_id}`,
            { method: "GET" }
        );

        const data = await response.json();

        if (data.result) {
            setProcess(data.result);
        }
    };

    useEffect(() => {
        if (!process_id) {
            return;
        }
        fetchProcess();
    }, [process_id]);

    if (process != null) {
        return (
          <Container maxWidth="md">
          <div className="section p-5">
            <Typography
              fontFamily="Lato"
              color="#1F1F1F"
              fontSize={{ xs: 25, md: 28, lg: 33 }}
              className="pt-2 pb-2 text-center"
            >
              ¡Su pago ha sido procesado exitosamente!
            </Typography>
          </div>
        

        <div className="section px-5 text-sm-start text-center mb-3">
          <Typography
          fontFamily="Lato"
          color="#1F1F1F"
          className="pb-3"
          fontWeight="bold"
          fontSize={{ xs: 16, md: 17, lg: 19 }}
        >
          Resumen de compra
        </Typography>
          <div className="row align-items-center border rounded p-2">
            <div className="col-12 col-sm-6">
            <Typography
          fontFamily="Lato"
          color="#1F1F1F"
          className="pb-3"
          fontSize={{ xs: 13, md: 14, lg: 16 }}
        >
          <strong>Marca:</strong> <span style={{color: '#333333'}}>{process.auto.marca}</span>
        </Typography>
        <Typography
          fontFamily="Lato"
          color="#1F1F1F"
          className="pb-3"
          fontSize={{ xs: 13, md: 14, lg: 16 }}
        >
          <strong>Modelo:</strong> <span style={{color: '#333333'}}>{process.auto.modelo}</span>
        </Typography>
        <Typography
          fontFamily="Lato"
          color="#1F1F1F"
          className="pb-3"
          fontSize={{ xs: 13, md: 14, lg: 16 }}
        >
          <strong>Año:</strong> <span style={{color: '#333333'}}>{process.auto.ano}</span>
        </Typography>
        <Typography
          fontFamily="Lato"
          color="#1F1F1F"
          fontSize={{ xs: 13, md: 14, lg: 16 }}
        >
          <strong>Cantidad Pagado:</strong> <span style={{color: '#333333'}}>${Intl.NumberFormat().format(process.cantidad_a_pagar)}</span>
        </Typography>

            </div>
            <div className="col-12 col-sm-6">
              <img src={process.auto.array_fotografias_url[0]} alt="auto" className="img-fluid rounded" />
            </div>
        </div>
        </div>

        <div className="section px-5 text-sm-start text-center">
          <div className="row">
            <div className="col-12 col-sm-6 mb-3">
          <Typography
          fontFamily="Lato"
          color="#1F1F1F"
          className="pb-3"
          fontWeight="bold"
          fontSize={{ xs: 16, md: 17, lg: 19 }}
        >
          Detalles Agencia
        </Typography>

        <div className="border p-2 rounded">

            <Typography
          fontFamily="Lato"
          color="#1F1F1F"
          className="pb-3"
          fontSize={{ xs: 13, md: 14, lg: 16 }}
        >
          <strong>Agencia:</strong> <span style={{color: '#333333'}}>{process.agencia.nombres}</span>
        </Typography>
        <Typography
          fontFamily="Lato"
          color="#1F1F1F"
          className="pb-3"
          fontSize={{ xs: 13, md: 14, lg: 16 }}
        >
          <strong>Email:</strong> <span style={{color: '#333333'}}>{process.agencia.email}</span>
        </Typography>
        <Typography
          fontFamily="Lato"
          color="#1F1F1F"
          className="pb-3"
          fontSize={{ xs: 13, md: 14, lg: 16 }}
        >
          <strong>Teléfono:</strong> <span style={{color: '#333333'}}>{process.agencia.numero_telefonico}</span>
        </Typography>
        </div>

            </div>
            <div className="col-12 col-sm-6 mb-3">
          <Typography
          fontFamily="Lato"
          color="#1F1F1F"
          className="pb-3"
          fontWeight="bold"
          fontSize={{ xs: 16, md: 17, lg: 19 }}
        >
          Detalles Agente
        </Typography>

        <div className="border p-2 rounded">

        <Typography
          fontFamily="Lato"
          color="#1F1F1F"
          className="pb-3"
          fontSize={{ xs: 13, md: 14, lg: 16 }}
        >
          <strong>Nombre:</strong> <span style={{color: '#333333'}}>{process.vendedor.nombres} {process.vendedor.apellidos}</span>
        </Typography>
        <Typography
          fontFamily="Lato"
          color="#1F1F1F"
          className="pb-3"
          fontSize={{ xs: 13, md: 14, lg: 16 }}
        >
          <strong>Email:</strong> <span style={{color: '#333333'}}>{process.vendedor.email}</span>
        </Typography>
        </div>

            </div>
        </div>
        </div>

        <div className="text-center">
        <Button
    variant="contained"
    sx={{
      fontFamily: "Lato",
      ":hover": {
        backgroundColor: "#F68E70",
      },
    }}
    disableElevation
    type="button"
    href="/account/purchases"
  >
    Finalizar
  </Button>
        </div>
          </Container>
        );
    } else {
        return (
            <div>
                <LoadingScreen/>
            </div>
        );
    }

}