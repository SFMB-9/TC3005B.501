/*
  Autor: Karla Mondragón
  Fecha: 2023-05-22

  Este script representa el componente Process especificado (explicado), el cual es utilizado para mostrar
  el proceso de compra de la pagina dentro de about.js.
*/

import React from "react";
import Step from "@/components/buyer/step";
import { Typography } from "@mui/material";
import styles from "@/styles/processSpecified.module.css";

const ProcessSpecified = () => {
  return (
    <section style={{ backgroundColor: "#000" }}>
      <div style={{ position: "relative", width: "100%" }}>
        <div className="container p-5">
          <div>
            <Typography
              sx={{
                color: "#F55C7A",
              }}
              fontSize={40}
              fontFamily="Raleway"
              align="center"
              component={'span'}
            >
              ¿Cómo ser parte de SWIVEL?
            </Typography>
          </div>

        <div className="row">
            <div className="col-lg col-md-6 mt-3">
              <Step
                number="1"
                img="/partofSWIVEL1.svg"
                text="Navega por nuestro catálogo y encuentra el auto de tus sueños adaptado a TUS necesidades."
              />
            </div>
        </div>

        <div className="row">
            <div className="col-lg col-md-6 mt-3">
              <Step
                number="2"
                img="/processGA2.svg"
                text="¿Representas a un Grupo Automotriz? Únete a SWIVEL y ayúdanos a revolucionar la manera en la que se compran autos."
              />
            </div>
        </div>

        <div className="row">
            <div className="col-lg col-md-6 mt-3">
              <Step
                number="3"
                img="/partofSWIVEL3.svg"
                text="¿Ya estás registrado como Grupo Automotriz? Registra tus agencias y vendedores y se parte del cambio."
              />
            </div>
        </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSpecified;