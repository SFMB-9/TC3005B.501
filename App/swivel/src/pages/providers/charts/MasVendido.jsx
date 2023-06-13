import React from "react";
import { Bar } from "react-chartjs-2";

const countModels = (dataList) => {
  const models = dataList.reduce((acc, curr) => {
    const { modelo } = curr.auto;
    if (acc[modelo]) {
      acc[modelo]++;
    } else {
      acc[modelo] = 1;
    }
    return acc;
  }, {});

  const sortedModels = Object.entries(models)
    .sort(([, countA], [, countB]) => countB - countA)
    .map(([modelo]) => modelo);

  return { models, sortedModels };
};

const MasVendido = ({ data }) => {
  // Call the countModels function with your dataList
  const { models, sortedModels } = countModels(data);

  const chartData = {
    labels: sortedModels,
    datasets: [
      {
        label: "Modelo más vendido",
        data: sortedModels.map((modelo) => models[modelo]),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  return <Bar data={chartData} />;
};

export default MasVendido;
