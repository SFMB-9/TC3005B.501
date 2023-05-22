/*
Ana Paula Katsuda Zalce
23-04-2023

Grid que muestra el catálgo de autos. Se muestran las cartas de autos 
acomodadas y ordenadas en un grid. 
*/
import React from "react";
import { Grid } from "@mui/material";

import CarCard from "@/components/buyer/car_card";

/* Función que devuelve las cartas con infrmación de los autos acomodadas y con 
un carousel de imágenes de cada auto */
export default function CatalogGrid({ carListing, cardType = "default" }) {
  let carList;
  if (carListing !== undefined) {
    carList = carListing.map((car) => {
      if (cardType === "default") {
        const cardProps = {
          default: {
            carUrl: `/catalogo/${car._id}`,
            carImage: car._source.fotos_3d[0],
            carBrand: car._source.marca,
            carModel: car._source.modelo,
            carYear: car._source.año,
            carLocation: car._source.estado_agencia,
            carAgency: car._source.municipio_agencia,
            carColor: car._source.colores.length,
            carPrice: car._source.precio,
          },
          alternate: {
            // Alternate set of props
          },
          // Add more sets of props as needed
        };
        return (
          <Grid item xs={12} sm={12} md={6} lg={4}>
            <CarCard
              // carUrl={`/catalogo/${car._id}`}  //{car.carUrl}
              // carImage={car._source.fotos_3d[0]} //{car.carImages}
              // carBrand={car._source.marca}
              // carModel={car._source.modelo}
              // carYear={car._source.año}
              // carLocation={car._source.estado_agencia} //{car.carLocation}
              // carAgency={car._source.municipio_agencia}
              // carColor={car._source.colores.length}
              // carPrice={car._source.precio}
              {...cardProps[cardType]}
            />
          </Grid>
      );
    }
  });
  }
  else {
    carList = <h1 className="d-flex flex-column justify-content-center align-items-center"> No se encontraron autos </h1>
  }
  return (
    <>
      <Grid
        container
        spacing={3}
        style={{
          display: "flex",
        }}
      >
        {carList}
      </Grid>
    </>
  );
}
