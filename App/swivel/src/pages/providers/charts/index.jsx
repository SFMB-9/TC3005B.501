import React from "react";
import MasVendido from "./MasVendido";
import MasPruebas from "./MasPruebas";

export default function Estadisticas() {
  return (
    <div style={{ padding: "30px" }}>
      <h1>Estadisticas</h1>
      <h2>Autos mas vendidos</h2>
      <MasVendido />
      <h2>Autos mas probados</h2>
      <MasPruebas />
    </div>
  );
}