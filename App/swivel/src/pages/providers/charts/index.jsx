import React from "react";
import MasVendido from "./MasVendido";
import MasPruebas from "./MasPruebas";

export default function Estadisticas() {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    document.title = "Proveedores - Gráficos";
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/charts/solicitudCompraAgencia?name=Nissan%20Santa%20Fe", // Change to name of logged agency
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setData(data.documents);
          console.log("Data:", data);
        } else {
          throw new Error("Request failed with status: " + response.status);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h1>Estadisticas</h1>
      <h2>Autos mas vendidos</h2>
      {data && data.length > 0 && <MasVendido data={data} />}
      <h2>Autos mas probados</h2>
      {data && data.length > 0 && <MasPruebas data={data} />}
    </div>
  );
}
