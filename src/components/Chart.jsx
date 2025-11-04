import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function Chart({ expenses }) {
  const categoryTotals = {};

  expenses.forEach((e) => {
    const category = e.category || 'Uncategorized';
    categoryTotals[category] = (categoryTotals[category] || 0) + e.amount;
  });

  const labels = Object.keys(categoryTotals);
  const data = Object.values(categoryTotals);

  return (
    <Pie
      data={{
        labels,
        datasets: [
          {
            label: 'Expenses by Category',
            data,
            backgroundColor: [
              '#0d6efd',
              '#4f9cff',
              '#6c757d',
              '#ffc107',
              '#198754',
              '#dc3545',
            ],
            borderColor: '#fff',
            borderWidth: 2,
          },
        ],
      }}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: '#fff',
              font: {
                size: 14,
              },
            },
          },
        },
      }}
    />
  );
}

export default Chart;
