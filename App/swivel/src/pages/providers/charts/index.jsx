import React from "react";
import MasVendido from "./MasVendido";
import { fetchData } from "next-auth/client/_utils";

export default function Estadisticas() {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    document.title = "Proveedores - Gráficos";
    fetchData(
      "http://localhost:3000/api/charts/solicitudCompraAgencia?name=Nissan%20Cuauhtemoc",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      setData(res.documents);
    });
    console.log("data", data);
  }, []);

  return (
    <div>
      <h1>Estadisticas</h1>
      {data && data.length > 0 && <MasVendido data={data} />}
    </div>
  );
}
