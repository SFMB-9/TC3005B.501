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
                color: "white",
              }}
              fontSize={40}
              fontFamily="Raleway"
              align="left"
              component={'span'}
            >
              Proceso de compra
            </Typography>
          </div>

        <div className="row">
            <div className="col-lg col-md-6 mt-3">
              <Step
                number="1"
                img="/process_step_1.svg"
                text="Busca tu auto ideal"
              />
            </div>
            <div className="col-lg col-md-6 mt-3">
                <div style={{ color: "white", fontFamily: "Raleway", fontSize: 22 }}> 
                    <ul>
                        <li>
                            ¡Realiza nuestro quiz para conocer cuál es el carro para ti y regístrate!
                        </li>
                        <li>
                            Ya sea con o sin cuenta, accede a nuestro extenso catálogo y navega entre diferentes modelos, marcas y agencias para encontrar ¡el auto de tus sueños!
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div className="row">
            <div className="col-lg col-md-6 mt-3">
              <Step
                number="2"
                img="/process_step_2.svg"
                text="Solicita una prueba de manejo"
              />
            </div>
            <div className="col-lg col-md-6 mt-3">
                <div style={{ color: "white", fontFamily: "Raleway", fontSize: 22 }}> 
                    <ul>
                        <li>
                            Una vez que encontraste el auto de tus sueños, regístrate y ¡agenda una prueba de manejo con uno de nuestros vendedores!
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div className="row">
            <div className="col-lg col-md-6 mt-3">
              <Step
                number="3"
                img="/process_step_3.svg"
                text="Encuentra el mejor plan de pagos para ti"
              />
            </div>
            <div className="col-lg col-md-6 mt-3">
                <div style={{ color: "white", fontFamily: "Raleway", fontSize: 22 }}> 
                    <ul>
                        <li>
                            Explora los diferentes planes de financiamiento disponibles en la plataforma.
                        </li>
                        <li>
                            Una vez que hayas elegido el plan que más se ajusta a tus necesidades, seleccionalo y ve como se aplica a través de los meses.
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div className="row">
            <div className="col-lg col-md-6 mt-3">
              <Step
                number="4"
                img="/process_step_4.svg"
                text="Recibe el auto de tus sueños"
              />
            </div>
            <div className="col-lg col-md-6 mt-3">
                <div style={{ color: "white", fontFamily: "Raleway", fontSize: 22 }}> 
                    <ol>
                        <li>
                            Selecciona el auto de tus sueños.
                        </li>
                        <li>
                            Sube tus documentos.
                        </li>
                        <li>
                            ¡Compra y Recibe!
                        </li>
                    </ol>
                </div>
            </div>
        </div> 

        </div>
      </div>
    </section>
  );
};

export default ProcessSpecified;