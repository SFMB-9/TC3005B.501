import React from "react";
import MasVendido from "../charts/MasVendido";
import MasPruebas from "../charts/MasPruebas";
import { useSession } from "next-auth/react";

export default function Estadisticas() {
  const { session } = useSession();
  const agency = session?.user?.nombre_agencia;

  React.useEffect(() => {
    console.log(session);
  }, [session]);

  return (
    <div style={{ padding: "30px" }}>
      <h1>Estadisticas</h1>
      <h2>Autos mas vendidos</h2>
      <MasVendido agency={agency} />
      <h2>Autos mas probados</h2>
      <MasPruebas agency={agency} />
    </div>
  );
}
