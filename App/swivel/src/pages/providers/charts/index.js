import React from "react";
import MasVendido from "./MasVendido";
import MasPruebas from "./MasPruebas";

export default function Estadisticas() {
  return (
    <div style={{ padding: "30px" }}>
      <h1>Estadisticas</h1>
      <h2>Autos más vendidos</h2>
      <MasVendido/>
      <h2>Autos más probados</h2>
      <MasPruebas/>
    </div>
  );
}