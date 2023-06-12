/*
Ana Paula Katsuda Zalce
23-04-2023

Grid que muestra el catálgo de autos. Se muestran las cartas de autos 
acomodadas y ordenadas en un grid. 
*/
import React from "react";
import { Grid } from "@mui/material";

import CarCard from "@/components/buyer/car_card";
import {formatDate} from "@/components/general/date_utils";

const json5 = require('json5');
/* Función que devuelve las cartas con infrmación de los autos acomodadas y con 
un carousel de imágenes de cada auto */
export default function CatalogGrid({ carListing, cardType, carIds, setCarIds }) {
  let carList;
  let cardProps;
  console.log("listing", carListing);
  if (carListing !== undefined) {
    carList = carListing.map((car) => {
      if (cardType === "catalog") {
        cardProps = {
          catalog: {
            carUrl: `/catalog/${car._id}`,
            carImage: json5.parse(car._source.fotos_3d)[0],
            carBrand: car._source.marca,
            carModel: car._source.modelo,
            carYear: car._source.año,
            carAgency: car._source.municipio_agencia,
            carLocation: car._source.estado_agencia,
            carColor: json5.parse(car._source.colores).length,
            carPrice: car._source.precio,
          },
        };
      } else {
        cardProps = {
          general: {
            carUrl: cardType == 'drivingTest' ? `/pruebademanejo/${car._id}` : `/purchase/${car._id}`,
            carImage: car.auto.array_fotografias_url[0],
            carBrand: car.auto.marca,
            carModel: car.auto.modelo,
            carYear: car.auto.ano,
            carAgency: car.nombre_agencia,
            carPrice: car.auto.precio,
          },
          drivingTest: {
            date: "Fecha de la cita: " + (car.fecha_agendada ? formatDate(car.fecha_agendada).formattedDate : "No hay fecha agendada"),
            testHour: "Horario de la cita: " + (car.hora_agendada ? formatDate(car.hora_agendada).formattedTime : "No hay hora agendada"),
            status: car.estatus_validacion
          },
          purchases: {
            date: "Fecha de inicio: " + (car.fecha_creacion ? formatDate(car.fecha_creacion).formattedDate : "No hay fecha de inicio"),
            status: car.estatus
          }
          // favorites: {
          //   // Alternate set of props
          // },
        };
      }
        return (
          <Grid item xs={12} sm={12} md={6} lg={4} key={car._id}>
            {
              cardType === "catalog" ?
                <CarCard
                  {...cardProps[cardType]}
                  cardType={cardType}
                  carIds={carIds}
                  setCarIds={setCarIds}
                />
                :
                <CarCard
                  {...cardProps["general"]} {...cardProps[cardType]}
                  cardType={cardType}
                />
            }

          </Grid>
        );
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