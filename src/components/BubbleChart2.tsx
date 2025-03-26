import { Bubble } from "react-chartjs-2";
import { Chart as ChartJS, LinearScale, PointElement, Tooltip } from "chart.js";

ChartJS.register(LinearScale, PointElement, Tooltip);

const data = {
  labels: ["Primary", "Secondary", "Tertiary", "Quaternary", "Central"],
  datasets: [
    {
      data: [
        { x: 1, y: 5, r: 10 },
        { x: 4, y: 7, r: 10 },
        { x: 1, y: 3, r: 10 },
        { x: 4, y: 2, r: 10 },
        { x: 2.5, y: 5, r: 10 },
      ],
      backgroundColor: "rgba(105, 73, 140, 0.7)", // Purple bubbles
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins:{
    legend: { display: false, position: "top" as const },

  },
  scales: {
    x: {
      min: 0,
      max: 5,
      ticks: { display: false }, // Hide numbers on x-axis
      grid: { drawTicks: false },
    },
    y: {
      min: 0,
      max: 8,
      ticks: { display: false }, // Hide numbers on y-axis
      grid: { drawTicks: false },
    },
  },

};

const BubbleChart2 = () => (
    <Bubble data={data} options={options} />
);

export default BubbleChart2;
