import React from "react";
import MasVendido from "../charts/MasVendido";
import MasPruebas from "../charts/MasPruebas";
import { useSession } from "next-auth/react";

export default function Estadisticas() {
  const { data: session } = useSession();
  const [agencia, setAgencia] = React.useState(null);
  const id = session?.id;

  React.useEffect(() => {
    const fetchOne = async () => {
      await fetch(
        "/api/managerProfile/managerP?id=" + session?.id
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data.userData.agencia_id);

          return data.userData.agencia_id;
        })
        .then((data) => {
          fetchTwo(data);
        });
    };

    const fetchTwo = async (agenciaId) => {
      await fetch(
        "/api/managerProfile/managerP?id=" + agenciaId
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setAgencia(data);
        });
    };
    fetchOne();
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h1>Estadisticas</h1>
      <p>Agencia: {agencia && agencia.userData.nombres}</p>
      <h2>Autos mas vendidos</h2>
      {agencia && <MasVendido agency={agencia.userData.nombres} />}
      <h2>Autos mas probados</h2>
      {agencia && <MasPruebas agency={agencia.userData.nombres} />}
    </div>
  );
}