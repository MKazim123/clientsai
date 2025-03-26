import { Bubble } from "react-chartjs-2";
import { Chart as ChartJS, LinearScale, PointElement, LineElement, Tooltip, Filler } from "chart.js";
import React from "react";

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Filler);

const data:any = {
  labels: Array.from({ length: 10 }, (_, i) => `Label ${i + 1}`), // X-axis labels
  datasets: [
    // Bubble dataset
   

    {
      type: "bubble",
      data: [
        { x: 1, y: 4, r: 5 },
        { x: 2, y: 6, r: 5 },
        { x: 3, y: 3, r: 5 },
        { x: 4, y: 7, r: 5 },
        { x: 5, y: 5, r: 5 },
        { x: 6, y: 2, r: 5 },
        { x: 7, y: 3, r: 5 },
        { x: 8, y: 4, r: 5 },
        { x: 9, y: 6, r: 5 },
        { x: 10, y: 5, r: 5 },
      ],
      backgroundColor: "rgba(105, 73, 140, 0.7)", // Purple bubbles
    },
    // Line + Area dataset
    {
      type: "line",
      data: [4, 6, 3, 7, 5, 2, 3, 4, 6, 5], // Line values
      borderColor: "rgba(120, 60, 180, 1)", // Purple line
      backgroundColor: " rgba(149,82,211,0.6)", // Light purple fill
      tension: 0.3,
      // fill: true, // Area fill
      // pointRadius: 0, // Hide points
        fill: {
          target: 'origin',
          above: 'rgb(255, 0, 0)',   // Area will be red above the origin
          below: 'rgb(0, 0, 255)'    // And blue below the origin
        }
    },
  ],
};

const options:any = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: { grid: { drawTicks: false } },
    y: { grid: { drawTicks: false } },
  },
  plugins: {
    legend: { display: false, position: "top" as const },

  },
};

const BubbleAreaChart3 :React.FC= () => (
    <Bubble data={data} options={options} />
);

export default BubbleAreaChart3;
