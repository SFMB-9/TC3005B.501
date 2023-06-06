import React from 'react';
import { Bar } from 'react-chartjs-2';

const data = {
    labels: ['Category 1', 'Category 2', 'Category 3'],
    datasets: [
      {
        label: 'Data Set 1',
        data: [10, 20, 30], // Replace with your data values
        backgroundColor: 'rgba(75, 192, 192, 0.6)', // Specify color for bars
      },
    ],
  };
  
  const options = {
    scales: {
      y: {
        beginAtZero: true, // Start y-axis from zero
      },
    },
  };

  const BarChart = () => {
    return (
      <div>
        <Bar data={data} options={options} />
      </div>
    );
  };
  