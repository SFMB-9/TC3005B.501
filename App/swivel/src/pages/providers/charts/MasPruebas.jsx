import React from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";

const countModels = (dataList) => {
  const models = {};
  dataList.forEach((item) => {
    if (item.tipo_proceso == "pruebaManejo") {
      const modelo = item.auto.modelo;
      models[modelo] = models[modelo] ? models[modelo] + 1 : 1;
    }
  });

  const sortedModels = Object.entries(models)
    .sort(([, countA], [, countB]) => countB - countA)
    .map(([modelo]) => modelo);

  return { models, sortedModels };
};

const MasPruebas = ({ data }) => {
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

export default MasPruebas;
