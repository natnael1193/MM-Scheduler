import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Typography } from '@mui/material';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);



const BarChart = ({ xData, yData, title }: any) => {
 
  const labels = xData;

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
        text: title,
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: 'Programs',
        data: yData,
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      // {
      //   label: 'Schedules',
      //   data: [500, 600, 700, 1000, 486, 790, 765],
      //   backgroundColor: 'rgba(53, 162, 235, 0.5)',
      // },
    ],
  };

  return (
    <div>
      <Typography variant='h3'>{title}</Typography>
      <Bar options={options} data={data} />
    </div>
  );
};

export default BarChart;