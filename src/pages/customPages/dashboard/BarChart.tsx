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



const BarChart = ({ chartData, title }: any) => {
  // Get stations data from chart data
  let stationData: any = [];
  stationData = chartData.map(function (stations: any) {
    return stations.name;
  });

  // Get programs data from chart data
  let programsData: any = [];
  programsData = chartData.map(function (programs: any) {
    return programs.programs.length;
  });
  const labels = stationData;

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
        data: programsData,
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
