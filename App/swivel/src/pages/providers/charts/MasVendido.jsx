import React from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";

const countModels = (dataList) => {
  const models = {};
  dataList.forEach((item) => {
    if (item.tipo_proceso == "solicitudCompra") {
      const modelo = item.auto.modelo;
      models[modelo] = models[modelo] ? models[modelo] + 1 : 1;
    }
  });

  const sortedModels = Object.entries(models)
    .sort(([, countA], [, countB]) => countB - countA)
    .map(([modelo]) => modelo);

  return { models, sortedModels };
};

const MasVendido = () => {
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

  const { models, sortedModels } = countModels(data);

  const chartData = {
    labels: sortedModels,
    datasets: [
      {
        label: "Count",
        data: sortedModels.map((modelo) => models[modelo]),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  return <Bar data={chartData} />;
};

export default MasVendido;
