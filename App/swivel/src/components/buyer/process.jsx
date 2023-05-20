/*
  Autor: Mateo Herrera
  Fecha: 2023-04-15

  Este script representa el componente Process, el cual es utilizado para mostrar
  el proceso de compra de la pagina.
*/

import React from "react";
import Step from "@/components/buyer/step";
import Image from "next/image";
import { Typography, Button } from "@mui/material";
import Link from "next/link";

// Funcion que retorna el componente Process
const Process = () => {
  return (
    <section style={{backgroundColor: '#000'}}>
      <div
        style={{
          position: "relative",
          width: "100%",
        }}
      >
        <div className="container p-5" >
          <div>
            <Typography
              sx={{
                color: "white",
              }}
              fontSize={40}
              fontFamily="Raleway"
              align="left"
            >
              Proceso de compra
            </Typography>
          </div>

          <div className="row">
            <div className="col-lg col-md-6 mt-3">
              <Step
                number="1"
                img="/process_step_1.svg"
                text="Busca tu 
                auto ideal"
              />
            </div>

            <div className="col-lg col-md-6 mt-3">
              <Step
                number="2"
                img="/process_step_2.svg"
                text="Solicita una 
                prueba de manejo"
              />
            </div>

            <div className="col-lg col-md-6 mt-3">
              <Step
                number="3"
                img="/process_step_3.svg"
                text="Encuentra el mejor 
                plan de pagos para tí"
              />
            </div>

            <div className="col-lg col-md-6 mt-3">
              <Step
                number="4"
                img="/process_step_4.svg"
                text="Recibe el auto 
                de tus sueños"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
