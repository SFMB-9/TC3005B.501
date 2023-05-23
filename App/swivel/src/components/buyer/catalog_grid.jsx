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
export default function CatalogGrid({ carListing, cardType }) {
  let carList;
  let cardProps;
  if (carListing !== undefined) {
    carList = carListing.map((car) => {
      console.log("car", car);
      if (cardType === "catalog") {
        cardProps = {
          catalog: {
            carUrl: `/catalog/${car._id}`,
            carImage: car._source.fotos_3d[0],
            carBrand: car._source.marca,
            carModel: car._source.modelo,
            carYear: car._source.año,
            carAgency: car._source.municipio_agencia,
            carLocation: car._source.estado_agencia,
            carColor: car._source.colores.length,
            carPrice: car._source.precio,
          },
        };
      } else {
        cardProps = {
          general: {
            // carUrl: `/catalogo/${car._id}`,
            carImage: car.auto.array_fotografias_url[0],
            carBrand: car.auto.marca,
            carModel: car.auto.modelo,
            carYear: car.auto.ano,
            carAgency: car.nombre_agencia,
            carPrice: car.auto.precio,
            status: car.estatus_validacion
          },
          drivingTest: {
            date: car.fecha_agendada, 
            testHour: car.hora_agendada,
          },
          purchasesCurrent: {
            date: car.fecha_inicio,
          },
          purchasesCompleted: {
            date: car.fecha_agendada
          },
          // favorites: {
          //   // Alternate set of props
          // },
        };
      }
        return (
          <Grid item xs={12} sm={12} md={6} lg={4}>
            {
              cardType === "catalog" ?
                <CarCard
                  {...cardProps[cardType]}
                  cardType={cardType}
                />
                :
                <CarCard
                  {...cardProps["general"]} {...cardProps[cardType]}
                  cardType={cardType}
                />
            }

          </Grid>
        );
        // if (cardType === "catalog") {
        //   return (
        //     <Grid item xs={12} sm={12} md={6} lg={4}>
        //       <CarCard
        //         {...generalProps} {...cardProps[cardType]} 
        //         cardType={cardType}
        //       />
        //     </Grid>
        //   );
        // }
        // else if (cardType === "drivingTest") {
        //   return (
        //     <Grid item xs={12} sm={12} md={6} lg={4}>
        //       <CarCard
        //         {...generalProps} {...cardProps[cardType]}
        //         cardType={cardType}
        //       />
        //     </Grid>
        //   );
        // }
        // else if (cardType === "purchasesCurrent") {
        //   return (
        //     <Grid item xs={12} sm={12} md={6} lg={4}>
        //       <CarCard
        //         {...generalProps} {...cardProps[cardType]}
        //         cardType={cardType}
        //       />
        //     </Grid>
        //   );
        // }
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
