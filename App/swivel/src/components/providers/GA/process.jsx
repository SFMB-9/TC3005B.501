import React from "react";
import Step from "@/components/providers/GA/step";
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
              Trabaja con Nosotrxs
            </Typography>
          </div>

          <div className="row">
            <div className="col-lg col-md-6 mt-3">
              <Step
                number="1"
                img="/processGA1.svg"
                text="Regístrate como usuario"
              />
            </div>

            <div className="col-lg col-md-6 mt-3">
              <Step
                number="2"
                img="/processGA2.svg"
                text="Registra a tu Grupo Automotriz"
              />
            </div>

            <div className="col-lg col-md-6 mt-3">
              <Step
                number="3"
                img="/processGA3.svg"
                text="Sube tus documentos"
              />
            </div>

            <div className="col-lg col-md-6 mt-3">
              <Step
                number="4"
                img="/processGA4.svg"
                text="Bienvenidx a SWIVEL"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
