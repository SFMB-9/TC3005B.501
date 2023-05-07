import React from "react";

export default function ResumenCompra() {
  const [proceso, setProceso] = React.useState(0);

  const user_id = 1; // get from session

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/resumen-compra/get-proceso-venta?userId=" +
            { user_id }
        );
        const jsonData = await response.json();
        setProceso(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div>Resumen de Compra</div>
      <p>Precio de coche</p>
      {JSON.stringify(proceso)}
    </div>
  );
}
