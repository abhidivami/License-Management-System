import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartProps {
  data: {
    year: number;
    cost: number;
    label: string;
  }[];
}

const BarChartComponent: React.FC<BarChartProps> = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.year.toString()),
    datasets: [
      {
        label: 'Cost (in millions)',
        data: data.map(item => item.cost),
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const label = data[context.dataIndex].label;
            return `Cost: ${label}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Cost (in millions $)'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Year'
        }
      }
    }
  };

  return (
    <div style={{ height: '400px', minWidth: `${Math.max(600, data.length * 100)}px` }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChartComponent;