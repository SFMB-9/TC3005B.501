import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from "next/link";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Grid, Typography, IconButton } from '@mui/material';
import ScrollerBar from '@/components/general/custom_scroller_bar';
import BuyerLayout from '@/components/buyer/layout';
import Carousel from '@/components/general/carousel';

const json5 = require('json5');

export default function Comparison() {
  const [vehicles, setVehicles] = useState([]);
  const [images, setImages] = useState([]);
  const [characteristics, setCharacteristics] = useState([]);
  const router = useRouter();

  const fetchData = async () => {
    const ids = router.query.ids;
    const response = await axios.get('/api/comparar-prod/comparar-productos', { params: { lst: ids } });
    setVehicles(response.data);

    // Create array of images
    const images = [];
    const characteristics = [];
    response.data.forEach((vehicle) => {
      console.log('VEHICLE: ', vehicle);
      const imagesArray = json5.parse(vehicle.colores)[0].imagenes;
      const characteristicsArray = json5.parse(vehicle.caracteristicas);
      images.push(imagesArray);
      characteristics.push(characteristicsArray);
    });
    setImages(images);
    setCharacteristics(characteristics);
    console.log('CH: ', characteristics);
  };

  useEffect(() => {
    if (!router.query.ids) return;
    fetchData();
  }, [router.query.ids]);

  const components = [
    {
      name: 'Resumen', component: () =>
        <>
          <Grid container spacing={2} className='p-5'>
            {vehicles.length > 1 ? (
              vehicles.map((vehicle, index) => (
                <Grid item key={index} md={6} xs={12}>
                  <h2>{vehicle.marca}</h2>
                  <div className='d-flex flex-column  gap-3'>
                    <div className='d-flex flex-row gap-3'>
                      <img src='/buyer/tipoCombustible.png' />
                      <Typography fontFamily='Lato' color='#1F1F1F' fontWeight={'bold'} fontSize={{ xs: 15, md: 16, lg: 18 }} className='ms-3'>
                        Tipo de combustible
                      </Typography>
                      <Typography fontFamily='Lato' color='#333333' fontSize={{ xs: 15, md: 16, lg: 18 }}>
                        {vehicle.combustible}
                      </Typography>
                    </div>
                    <div className='d-flex flex-row gap-3'>
                      <img src='/buyer/tipoVehiculo.png' />
                      <Typography fontFamily='Lato' color='#1F1F1F' fontWeight={'bold'} fontSize={{ xs: 15, md: 16, lg: 18 }} className='ms-3'>
                        Tipo de vehiculo
                      </Typography>
                      <Typography fontFamily='Lato' color='#333333' fontSize={{ xs: 15, md: 16, lg: 18 }}>
                        {vehicle.tipo_vehiculo}
                      </Typography>
                    </div>
                    <div className='d-flex flex-row gap-3'>
                      <img src='/buyer/colorInteriores.png' />
                      <Typography fontFamily='Lato' color='#1F1F1F' fontWeight={'bold'} fontSize={{ xs: 15, md: 16, lg: 18 }} className='ms-3'>
                        Color interiores
                      </Typography>
                      <Typography fontFamily='Lato' color='#333333' fontSize={{ xs: 15, md: 16, lg: 18 }}>
                        {vehicle.color_interiores}
                      </Typography>
                    </div>
                    <div className='d-flex flex-row gap-3'>
                      <img src='/buyer/pasajeros.png' />
                      <Typography fontFamily='Lato' color='#1F1F1F' fontWeight={'bold'} fontSize={{ xs: 15, md: 16, lg: 18 }} className='ms-3'>
                        Pasajeros
                      </Typography>
                      <Typography fontFamily='Lato' color='#333333' fontSize={{ xs: 15, md: 16, lg: 18 }}>
                        {vehicle.pasajeros}
                      </Typography>
                    </div>
                    <div className='d-flex flex-row gap-3'>
                      <img src='/buyer/combustible.png' alt='motor' />
                      <Typography fontFamily='Lato' color='#1F1F1F' fontWeight={'bold'} fontSize={{ xs: 15, md: 16, lg: 18 }} className='ms-3'>
                        Capacidad de combustible
                      </Typography>
                      <Typography fontFamily='Lato' color='#333333' fontSize={{ xs: 15, md: 16, lg: 18 }}>
                        {vehicle.litros}
                      </Typography>
                    </div>
                    <div className='d-flex flex-row gap-3'>
                      <img src='/buyer/transmision.png' alt='transmision' />
                      <Typography fontFamily='Lato' color='#1F1F1F' fontWeight={'bold'} fontSize={{ xs: 15, md: 16, lg: 18 }} className='ms-3'>
                        Transmisión
                      </Typography>
                      <Typography fontFamily='Lato' color='#333333' fontSize={{ xs: 15, md: 16, lg: 18 }}>
                        {vehicle.transmision}
                      </Typography>
                    </div>
                    <div className='d-flex flex-row gap-3'>
                      <img src='/buyer/traccion.png' />
                      <Typography fontFamily='Lato' color='#1F1F1F' fontWeight={'bold'} fontSize={{ xs: 15, md: 16, lg: 18 }} className='ms-3'>
                        Tracción
                      </Typography>
                      <Typography fontFamily='Lato' color='#333333' fontSize={{ xs: 15, md: 16, lg: 18 }}>
                        {vehicle.traccion}
                      </Typography>
                    </div>
                    <div className='d-flex flex-row gap-3'>
                      <img src='/buyer/fichaTecnica.png' />
                      <Typography fontFamily='Lato' color='#1F1F1F' fontWeight={'bold'} fontSize={{ xs: 15, md: 16, lg: 18 }} className='ms-3'>
                        Ficha técnica
                      </Typography>
                      <Typography fontFamily='Lato' color='#333333' fontSize={{ xs: 15, md: 16, lg: 18 }}>
                        {vehicle.ficha_tecnica}
                      </Typography>
                    </div>
                  </div>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Typography variant='h6'>No hay suficientes autos para la comparación</Typography>
              </Grid>
            )}
          </Grid>
        </>
    },
    {
      name: 'Características', component: () =>
        <div style={{ backgroundColor: "#F7F7F7" }}>
          <Grid container spacing={2} className='p-5'>
            {characteristics.length > 1 ? (
              characteristics.map((characteristic, index) => (
                <Grid item key={index} md={6} xs={12}>
                  {/* Map through each characteristic and put them in an unordered list*/}
                  <h3>Características Auto {index + 1}</h3>
                  {characteristic.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </Grid>
              ))
            ) : (
              <a>None</a>
            )}
          </Grid>
        </div>
    },
  ];

  return (
    <>
      <BuyerLayout>
        <div className='section p-5 pb-1'>     
          <Link href="/catalog">
            
            <ArrowBackIosNewIcon
              sx={{ width: "15px", color: "#F55C7A", fontWeight: "bold" }}
            />{" "}
            <span style={{ color: "#F55C7A", fontWeight: "bold" }}>
              Regresar al catálogo
            </span>
          </Link>
        </div>
        <Grid container spacing={2} className='p-5 pt-1'>
          {images.length > 1 ? (
            images.map((image, index) => (
              <Grid item key={index} md={6} xs={12}>
                <Carousel images={image} />
                <div className="pt-2 text-end">
                  <IconButton aria-label="360">
                    <img
                      src="/buyer/360_symbol.png"
                      height="15px"
                      alt="360"
                    />
                  </IconButton>
                </div>
              </Grid>
            ))
          ) : (
            <a>None</a>
          )}
        </Grid>
        <ScrollerBar
          components={components}
          stretched
          transparent
        />
      </BuyerLayout>
    </>
  );
}