import { Line } from "react-chartjs-2";
import React, { Component } from "react";
import Chart from 'chart.js/auto';


const chartData = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      label: "Sales",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 1,
    },
  ],
};

const chartOptions = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

const SimpleChart = () => {
  return <Line data={chartData} options={chartOptions} />;
};

export default SimpleChart;
