import React from "react";
import MasVendido from "./MasVendido";
import SimpleChart from "./SimpleChart";

export default function Estadisticas() {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    document.title = "Proveedores - Gráficos";
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/charts/solicitudCompraAgencia?name=Nissan%20Cuauhtemoc",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setData(data);
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
    <div>
      <h1>Estadisticas</h1>
      {data && <MasVendido data={data.documents} />}
    </div>
  );
}
