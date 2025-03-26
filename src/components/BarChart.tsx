import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip } from "chart.js";
import React from "react";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const createGradient = (ctx: CanvasRenderingContext2D, chartArea: any) => {
  const { top, bottom } = chartArea;
  const gradient = ctx.createLinearGradient(0, bottom, 0, top); // Gradient from bottom to top

  gradient.addColorStop(0, "rgba(149,82,211,0.7)"); // Darker purple at bottom
  gradient.addColorStop(1, "rgba(188,115,237,0.7)"); // Lighter purple at top

  return gradient;
};

const options: any = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false, position: "top" as const },
    tooltip: { enabled: true },
  },
  scales: {
    x: { grid: { display: false } },
    y: {
      beginAtZero: true,
      ticks: {
        callback: (value: number) => `${value / 1000000}M`,
      },
    },
  },
};

const BarChart: React.FC = () => {
  return (
    <Bar
      data={{
        labels: ["Cntl 1", "Var B", "Cntl 2", "Var C", "Cntl 3", "Var D"],
        datasets: [
          {
            data: [700000, 1000000, 2000000, 3000000, 4000000, 5000000],
            backgroundColor: (ctx) => {
              if (!ctx.chart.chartArea) {
                return "rgba(149,82,211,0.7)"; // Default color while loading
              }
              return createGradient(ctx.chart.ctx, ctx.chart.chartArea);
            },
            borderRadius: 8,
          },
        ],
      }}
      options={options}
    />
  );
};

export default BarChart;
